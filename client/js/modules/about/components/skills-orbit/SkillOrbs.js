import {
    Object3D, Vector3, Mesh,
    SphereGeometry, MeshBasicMaterial,
    DoubleSide, Scene, PerspectiveCamera,
    WebGLRenderer
} from 'three';
import { textAlign, SpriteText2D } from 'three-text2d';
import skillPoints from 'constants/skillPoints';
import ShiftingValueMap from 'utils/data-structs/ShiftingValueMap';

const skills = {
    frontend: 'Front End',
    devops: 'Dev-Ops',
    backend: 'Back End',
    uiUxDesign: 'UI/UX Design',
    architecture: 'Architecture',
    graphics: 'Graphics'
};

const OUTER_RADIUS = 200;
const INNER_RADIUS = 40;
const RADIUS_DIFFERENCE = OUTER_RADIUS - INNER_RADIUS;

function getSkillSphereDiameter(value) { return (40 * value) - 6 }

function createSkillVertex({ radianAngle, value=1 }) {
    const vRadius = getSkillSphereDiameter(value) / 2;
    const xWidth = Math.cos(radianAngle) * value * (RADIUS_DIFFERENCE - vRadius);
    const yWidth = Math.sin(radianAngle) * value * (RADIUS_DIFFERENCE - vRadius);

    return [
        Math.cos(radianAngle) * INNER_RADIUS + xWidth,
        Math.sin(radianAngle) * INNER_RADIUS + yWidth,
        0
    ];
}

const sources = {
    outerSphere: {
        type: 'sphere',
        geometry: new SphereGeometry(OUTER_RADIUS, 12, 12),
        material: new MeshBasicMaterial({
            color: 0xBCBCBC,
            wireframe: true,
            wireframeLinewidth: 10,
            side: DoubleSide,
            opacity: 0.75,
            transparent: true,
            depthWrite: true
        }),
        cursor: 'pointer'
    },

    innerSphere: {
        type: 'sphere',
        geometry: new SphereGeometry( INNER_RADIUS, 7, 7 ),
        material: new MeshBasicMaterial({
            color: 0xCC288D,
            wireframe: true,
            side: DoubleSide,
            opacity: 0.25,
            transparent: true,
        })
    },

    skillText: {
        type: 'text2d',
        unmapped: true,
        generateParams: ({ value, theme }) => ({
            align: textAlign.center,
            fontSize: `${6+Math.round(34*value)}px`,
            fontWeight: 700,
            fillStyle: (theme.palette.type == 'light') ? '#333333' : '#FFFFFF',
            side: DoubleSide,
            depthTest: false
        })
    },
    skillPoint: {
        type: 'sphere',
        unmapped: true,
        generateParams: ({ value, theme }) => ({
            geometry: new SphereGeometry(
                getSkillSphereDiameter(value),
                6+Math.round(1.7*value),
                6+Math.round(1.7*value)
            ),
            material: new MeshBasicMaterial({
                color: 0xC51162,
                wireframe: true,
                wireframeLinewidth: 5,
                side: DoubleSide,
                transparent: true,
                opacity: theme.palette.type == 'light' ? 0.1 : 0.2,
                depthWrite: false
            })
        })
    }
};

/**
 * cache distance to opacity mappings
 * as they are calculated as this
 * greatly speeds things up here
 */
const distanceOpacityMap = new Map();

export default class SkillOrbs {
    constructor(theme) {
        this.O = {};
        this.isRunning = false;
        this.lastFocusEvent = performance.now();
        this.tiltTimeProcessed = performance.now();
        this.shiftingValuesMap = new ShiftingValueMap();
        this.lastAnimated = undefined;
        this.parentElem = undefined;
        this.theme = theme;
    }

    setParentElem = elem => {
        this.parentElem = elem;
    };

    setHighlighted = highlighted => {
        this.isHighlighted = highlighted;
    };

    setTheme = theme => {
        this.theme = theme;

        if(this.isRunning) {
            this.instantiate();
        }
    };

    freeResources = () => {
        this.scene.remove(this.O.rotationOrigin);
        this.O.rotationOrigin = undefined;
        this.O.textSprites.length = 0;
        this.O.skillPoints.length = 0;
        this.O.outerSphere = undefined;
        this.O.innerSphere = undefined;
    };

    instantiate = () => {
        if(this.renderer) {
            this.freeResources();
        }
        else {
            this.scene = new Scene();
            this.camera = new PerspectiveCamera(60, 1, 0.5, 2000);

            this.shiftingValuesMap.set('camPosZ', new ShiftingValueMap.ValueEntry({
                value: 600,
                target: 400,
                rate: 500,
                onChange: camPosZ => {
                    const { position } = this.camera;
                    const { x, y } = position;

                    this.camera && (this.camera.position.set(x, y, camPosZ));
                }
            }));

            this.renderer = new WebGLRenderer({ alpha: true, antialias: true });
            this.renderer.setSize(500, 500);
        }

        this.createOrbit();
        this.parentElem.appendChild(this.renderer.domElement);

        // TODO
        this.renderer.domElement.style.width = '100%';
        this.renderer.domElement.style.height = '100%';
        if(!this.isRunning) {
            this.isRunning = true;
            window.requestAnimationFrame(this.animate);
        }
    };

    onMount = parentElem => {
        this.isMounted = true;
        this.parentElem = parentElem;
        this.instantiate();
        window.addEventListener('mousemove', this.onMouseMove);
    };

    onUnmount = () => {
        this.isMounted = false;
        this.freeResources();
        window.removeEventListener('mousemove', this.onMouseMove);
    };

    animate = timestamp => {
        const valueMap = this.shiftingValuesMap; // quick ref

        // calculate time since last call
        const deltaTime = !this.lastAnimated ? 0 : timestamp - this.lastAnimated;

        valueMap.tick(deltaTime);
        this.lastAnimated = timestamp;

        if(this.O.rotationOrigin) {
            if(valueMap.has('rotXSpeed')) {
                const rotationX = valueMap.get('rotationX');
                rotationX.target = (
                    rotationX.value +
                    valueMap.get('rotXSpeed').value / deltaTime
                );
            }

            if(valueMap.has('rotYSpeed')) {
                const rotationY = valueMap.get('rotationY');
                rotationY.target = (
                    rotationY.value +
                    valueMap.get('rotYSpeed').value / deltaTime
                );
            }
        }

        // only process sprite alpha updates once per 100 ms max as
        // this is pretty intense on CPU

        if(!this.lastSpriteUpdate || (
            performance.now() - this.lastSpriteUpdate > 200)
        ) {
            this.lastSpriteUpdate = performance.now();

            const cameraPosition = this.camera.position;

            this.O.textSprites.forEach( sprite => {
                const distance = Math.round(cameraPosition.distanceTo(
                    sprite.getWorldPosition(this.wpTargetVector)
                ));

                let opacity;

                if(distanceOpacityMap.has(distance)) {
                    opacity = distanceOpacityMap.get(distance);
                }
                else {
                    opacity = Math.min(0.85, Math.max(0.15, (700-distance)/200));
                    distanceOpacityMap.set(distance, opacity);
                }

                sprite.material.opacity = opacity;
            });
        }

        this.renderer.render(this.scene, this.camera);

        if(this.isMounted) {
            requestAnimationFrame(this.animate);
        }
    };

    createOrbit = () => {
        const { theme } = this;
        // base object which will rotate
        this.O.rotationOrigin = new Object3D();

        // needed for new THREE.js API; must provide target vector,
        // or we get warnings. Luckily, we can just create
        // one re-useable vector to satisfy the beast's needs

        this.wpTargetVector = new Vector3();

        // sphere creation/assignment

        for(const [key, params] of Object.entries(sources)) {
            if(!params.nonMapped) {
                switch (params.type) {
                    case 'sphere': {
                        this.O[key] = new Mesh(params.geometry, params.material);
                        this.O.rotationOrigin.add(this.O[key]);
                        break;
                    }
                }
            }
        }

        this.O.outerSphere.rotation.y = Math.PI/2;

        this.O.textSprites = [];
        this.O.skillPoints = [];
        this.skillAngles = [];

        skillPoints.forEach(({ namespace, value }, i, a) => {
            const radianAngle = (i/a.length) * Math.PI * 2.0;
            this.skillAngles.push(radianAngle);

            const input = { value, theme };

            const textSprite = new SpriteText2D(
                skills[namespace],
                sources.skillText.generateParams(input)
            );

            this.O.textSprites.push(textSprite);
            this.O.rotationOrigin.add(textSprite);

            // difference between outer and inner circle radius

            const skillsVertex = createSkillVertex({ radianAngle, value });

            const [x, y, z] = skillsVertex;
            const { geometry, material } = sources.skillPoint.generateParams(input);

            const skillPointObj = new Mesh(geometry, material);
            skillPointObj.position.set(x, y, z);

            this.O.skillPoints.push(skillPointObj);
            this.O.rotationOrigin.add(skillPointObj);

            // offset text by 2.5% rotation so that it is viewable

            const [textX, textY, textZ] = createSkillVertex({
                radianAngle: radianAngle - (Math.PI * 2 * 0.025),
                value
            });

            textSprite.position.set(textX, textY, textZ);
        });

        this.scene.add(this.O.rotationOrigin);

        this.shiftingValuesMap.set('rotationX', new ShiftingValueMap.ValueEntry({
            value: 0,
            target: 0,
            rate: (Math.PI * 2)/4,
            onChange: rotationX => {
                if(this.O.rotationOrigin) {
                    this.O.rotationOrigin.rotation.x = rotationX;
                }
            }
        }));

        this.shiftingValuesMap.set('rotationY', new ShiftingValueMap.ValueEntry({
            value: 0,
            target: 0,
            rate: (Math.PI * 2)/4,
            onChange: rotationY => {
                if(this.O.rotationOrigin) {
                    this.O.rotationOrigin.rotation.y = rotationY;
                }
            }
        }));

        this.shiftingValuesMap.set('rotXSpeed', new ShiftingValueMap.ValueEntry({
            value: 0,
            target: 0.175,
            rate: 0.25,
            onChange: rotXSpeed => {}
        }));

        this.shiftingValuesMap.set('rotYSpeed', new ShiftingValueMap.ValueEntry({
            value: 0,
            target: 0.325,
            rate: 0.25,
            onChange: rotSpeedY => {}
        }));
    };

    onMouseMove = e => {
        const { clientX, clientY } = e;
        const timeDelta = performance.now() - this.tiltTimeProcessed;
        const valueMap = this.shiftingValuesMap;

        if(timeDelta > 64) {
            this.tiltTimeProcessed = performance.now();

            const mouseRelX = clientX / window.innerWidth;
            const mouseRelY = clientY / window.innerHeight;

            if(valueMap.has('rotYSpeed')) {
                const valueEntry = valueMap.get('rotYSpeed');
                valueEntry.target = (mouseRelX - 0.5) * 0.6;
            }

            if(valueMap.has('rotXSpeed')) {
                const valueEntry = valueMap.get('rotXSpeed');
                valueEntry.target = (mouseRelY - 0.5) * 0.6;
            }
        }
    };
}
