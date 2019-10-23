import React, { PureComponent } from 'react'
import {
    Object3D, Vector3, Mesh,
    SphereGeometry, MeshBasicMaterial,
    DoubleSide, Scene, PerspectiveCamera,
    WebGLRenderer
} from 'three'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { textAlign, SpriteText2D } from 'three-text2d'
import useViewportSizes from 'use-viewport-sizes'
import skillPoints from 'constants/skillPoints'
import ShiftingValueMap from 'utils/data-structs/ShiftingValueMap'
import SkillsOverlayText from './skills-orbit/SkillsOverlayText'
import FadingOrbitContainer from './skills-orbit/FadingOrbitContainer'

const OUTER_RADIUS = 200,
      INNER_RADIUS = 40,
      RADIUS_DIFFERENCE = OUTER_RADIUS - INNER_RADIUS;

function getSkillSphereDiameter(value) { return (40 * value) - 6; }

function createSkillVertex({ radianAngle, value=1 }) {
    let vRadius = getSkillSphereDiameter(value)/2,
        xWidth = Math.cos(radianAngle) * value * (RADIUS_DIFFERENCE-vRadius),
        yWidth = Math.sin(radianAngle) * value * (RADIUS_DIFFERENCE-vRadius);

    return [
        Math.cos(radianAngle) * INNER_RADIUS + xWidth,
        Math.sin(radianAngle) * INNER_RADIUS + yWidth,
        0
    ];
}

function createMesh (sources) {
    const { geometry, material } = sources;
    return new Mesh(geometry, material);
}

/**
 * cache distance->opacity mappings
 * as they are calculated as this
 * greatly speeds things up here
 */
let distanceOpacityMap = new Map();

const sources = {
    outerSphere : {
        type     : 'sphere',
        geometry : new SphereGeometry( OUTER_RADIUS, 17, 17 ),
        material : new MeshBasicMaterial({
            color       : 0xDCDCDC,
            wireframe   : true,
            side        : DoubleSide,
            opacity     : 0.4,
            transparent : true,
            depthWrite  : false
        }),
        cursor : 'pointer'
    },

    innerSphere : {
        type     : 'sphere',
        geometry : new SphereGeometry( INNER_RADIUS, 7, 7 ),
        material : new MeshBasicMaterial({
            color       : 0xCC288D,
            wireframe   : true,
            side        : DoubleSide,
            opacity     : 0.2,
            transparent : true,
        })
    },

    skillText : {
        type : 'text2d',
        unmapped : true,
        generateParams : ({ value, theme }) => ({
            align : textAlign.center,
            fontSize : `${6+Math.round(34*value)}px`,
            fontWeight : 700,
            fillStyle : (theme == 'light') ? '#333333' : '#FFFFFF',
            side : DoubleSide,
            depthTest : false
        })
    },
    skillPoint : {
        type : 'sphere',
        unmapped : true,
        generateParams : ({ value, theme }) => ({
            geometry   : new SphereGeometry(
                getSkillSphereDiameter(value),
                6+Math.round(1.7*value),
                6+Math.round(1.7*value)
            ),
            material   : new MeshBasicMaterial({
                color        : 0xC51162,
                wireframe    : true,
                side         : DoubleSide,
                transparent  : true,
                opacity      : theme == 'light' ? 0.1 : 0.2,
                depthWrite   : false
            })
        })
    }
};

const useStyles = makeStyles( theme => ({
    container : {
        position       : 'relative',
        display        : 'flex',
        flexDirection  : 'column',
        overflow       : 'hidden',
        justifyContent : 'center',
        alignItems     : 'center',
        pointerEvents  : 'all',
        cursor         : 'pointer'
    },
    meta3d : {
        maxWidth  : '200px',
        maxHeight : '200px',
        overflow  : 'auto'
    },
    hintIcons : {
        position : 'absolute',
        margin   : '0px',
        bottom   : '0px',
        color    : theme.palette.text.primary
    },
    arrow : {
        '&:before': {
            transition : 'transform ease 0.5s'
        }
    },
    arrowRotated : {
        '&:before': {
            transform : 'rotateZ(180deg)'
        }
    }
}), { name : 'SkillsOrbit' });

class SkillsOrbit extends PureComponent {
    constructor (props, context) {
        super(props, context);

        /**
         *  namespace for Three.JS objects
         **/
        this.O = {};
        this._hasInstantiated = false;
        this.lastFocusEvent    = performance.now();
        this.tiltTimeProcessed = performance.now();
        this.shiftingValuesMap = new ShiftingValueMap();

        this.R = {
            canvas    : undefined,
            container : undefined,
            debugText : undefined
        };

        this._isMounted = false;
        this.state = { isHighlighted : false };
    }

    componentDidMount () {
        this._isMounted = true;
        this.instantiateScene();
        this.lastAnimated = performance.now();
        window.addEventListener('mousemove', this.onMouseMove);
    }

    componentWillUnmount () {
        window.removeEventListener('mousemove', this.onMouseMove);
        this.freeResources();
        this._isMounted = false;
    }

    onMouseMove = (e) => {
        const { clientX, clientY } = e;
        const timeDelta = performance.now() - this.tiltTimeProcessed;
        const valueMap = this.shiftingValuesMap;

        if(timeDelta > 64 && this.R.canvas) {
            this.tiltTimeProcessed = performance.now();

            let mouseRelX = clientX / window.innerWidth,
                mouseRelY = clientY / window.innerHeight;

            if(valueMap.has('rotYSpeed')) {
                let valueEntry = valueMap.get('rotYSpeed');
                valueEntry.target = (mouseRelX - 0.5) * 0.6;
            }

            if(valueMap.has('rotXSpeed')) {
                let valueEntry = valueMap.get('rotXSpeed');
                valueEntry.target = (mouseRelY - 0.5) * 0.6;
            }
        }
    };

    onMouseEnter = e => {
        if(!this.state.isHighlighted) {
            this.setState({ isHighlighted : true });
        }
    };

    onMouseLeave = e => {
        if(this.state.isHighlighted) {
            this.setState({ isHighlighted : false });
        }
    };

    /**
     * TODO : re-organize to use new
     *        "deriveStateFromProps" lifecycle event
     *
     * @param {*} prevProps
     * @param {*} prevState
     */
    componentDidUpdate(prevProps, prevState) {

        if(prevProps.theme != this.props.theme) {
            this.instantiateScene();
        } else {

            // upon resize of window, recalculate the width of the renderer

            let maxDimension = Math.max(
                    this.props.vpW,
                    this.props.vpH
                ),
                prevMaxDimension = Math.max(
                    prevProps.vpW,
                    prevProps.vpH
                );

            if(maxDimension != prevMaxDimension) {
                this.refreshRendererSize();
            }
        }

        if(this.state.isHighlighted != prevState.isHighlighted && this.shiftingValuesMap) {
            this.lastFocusEvent = performance.now();
            const map =this.shiftingValuesMap;

            if(map.has('camPosZ')) {
                let camPosZ = map.get('camPosZ');
                if(this.state.isHighlighted) {
                    camPosZ.target = 700;
                } else {
                    setTimeout(()=>( camPosZ.target = 550 ), 1000);
                }
            }
        }
    }

    /**
     * Adjusts renderer size according
     * to current window dimensions
     */
    refreshRendererSize = ()=> {
        let maxDimension = Math.max(window.innerWidth,window.innerHeight);

        let SIZE = (()=>{
            if(maxDimension <= 800) { return 180; }
            if(maxDimension <= 960) { return 200; }
            return 240;
        })();

        this.renderer.setSize(SIZE*3, SIZE*3);

        // THREE.js tends to re-assign sizes for the canvas element,
        // (as well as is a bit funky with destroying/instantiating that),
        // so be sure to re-style with flexible definitions with guaranteed
        // new reference

        let canvas = window.document.querySelector('#canvas3d canvas');
        if(canvas) {
            canvas.style.width="80%";
            canvas.style.height="auto";
        }

        // re-assign as Three.JS is a bit funny
        this.R.canvas = window.document.querySelector('#canvas3d canvas');

        // add event listener to newly created references
        this.R.container.addEventListener('mouseenter', this.onMouseEnter);
        this.R.container.addEventListener('mouseleave', this.onMouseLeave);
    };

    freeResources = () => {
        this.scene.remove(this.O.rotationOrigin);
        this.O.rotationOrigin = undefined;
        this.O.textSprites.length = 0;
        this.O.skillPoints.length = 0;
        this.O.outerSphere = undefined;
        this.O.innerSphere = undefined;

        this.R.container.removeEventListener('mouseenter', this.onMouseEnter);
        this.R.container.removeEventListener('mouseleave', this.onMouseLeave);
        this.R.canvas = undefined;
    };

    instantiateScene = () => {

        if(this.renderer) {
            this.freeResources();
        } else {

            // instantiate renderer, scene, camera

            this.scene = new Scene();
            this.camera = new PerspectiveCamera(60, 1, 0.5, 2000);

            this.shiftingValuesMap.set('camPosZ', new ShiftingValueMap.ValueEntry({
                value : 720,
                target : 550,
                rate : 500,
                onChange : camPosZ => {
                    const { position } = this.camera;
                    const { x, y } = position;

                    this.camera && (this.camera.position.set(x,y,camPosZ));
                }
            }));

            this.renderer = new WebGLRenderer({
                alpha : true,
                antialias : true
            });
        }

        this.createOrbit();

        document.getElementById('canvas3d')
                    .appendChild( this.renderer.domElement );

        this.refreshRendererSize();

        if(!this._hasInstantiated) {
            this._hasInstantiated = true;
            window.requestAnimationFrame( this.animate );
        }
    };

    createOrbit = () => {
        const { theme } = this.props;
        let skillStrings = strings.skills;

        // base object which will rotate
        this.O.rotationOrigin = new Object3D();

        // needed for new API; must provide target vector,
        // or we get warnings. Luckily, we can just create
        // one re-useable vector to satisfy the beast's needs

        this.wpTargetVector = new Vector3();

        // sphere creation/assignment

        for(let [key, params] of Object.entries(sources)) {
            if(!params.nonMapped) {
                switch(params.type) {
                    case 'sphere':
                        this.O[key] = createMesh(params);
                        this.O.rotationOrigin.add(this.O[key]);
                        break;
                }
            }
        }

        this.O.outerSphere.rotation.y = Math.PI/2;

        this.O.textSprites = [];
        this.O.skillPoints = [];
        this.skillAngles   = []; // much more efficient to
                                 // track angle differences
                                 // vs polar coordinates
                                 // for transparency effect with
                                 // distance

        skillPoints.forEach( ({ namespace, value }, i, arr) => {

            let projectionAngle = (i/arr.length) * 1.0 * Math.PI*2;
            this.skillAngles.push(projectionAngle);

            let textSprite = new SpriteText2D(
                skillStrings[namespace],
                sources.skillText.generateParams({ value, theme })
            );

            this.O.textSprites.push(textSprite);
            this.O.rotationOrigin.add(textSprite);

            // difference between outer and inner
            // circle radius

            let skillsVertex = createSkillVertex({
                radianAngle : projectionAngle,
                value
            });

            let [ x, y, z ] = skillsVertex;

            let skillPointObj = createMesh(
                sources.skillPoint.generateParams({ value, theme })
            );

            skillPointObj.position.set(x, y, z);

            this.O.skillPoints.push(skillPointObj);
            this.O.rotationOrigin.add(skillPointObj);

            // offset text by 2.5% rotation so that
            // it stays in view

            let [ textX, textY, textZ ] = createSkillVertex({
                radianAngle : projectionAngle - (Math.PI*2*0.025),
                value
            });

            textSprite.position.set(textX, textY, textZ);
        });

        this.scene.add(this.O.rotationOrigin);

        this.shiftingValuesMap.set('rotationX', new ShiftingValueMap.ValueEntry({
            value : 0,
            target : 0,
            rate : (Math.PI * 2)/4,
            onChange : rotationX => {
                if(this.O.rotationOrigin) {
                    this.O.rotationOrigin.rotation.x = rotationX;
                }
            }
        }));


        this.shiftingValuesMap.set('rotationY', new ShiftingValueMap.ValueEntry({
            value : 0,
            target : 0,
            rate : (Math.PI * 2)/4,
            onChange : rotationY => {
                if(this.O.rotationOrigin) {
                    this.O.rotationOrigin.rotation.y = rotationY;
                }
            }
        }));

        this.shiftingValuesMap.set('rotXSpeed', new ShiftingValueMap.ValueEntry({
            value : 0,
            target : 0.175,
            rate : 0.25,
            onChange : rotXSpeed => {}
        }));

        this.shiftingValuesMap.set('rotYSpeed', new ShiftingValueMap.ValueEntry({
            value    : 0,
            target   : 0.325,
            rate     : 0.25,
            onChange : rotSpeedY => {}
        }));
    };

    animate = (timestamp)=> {
        const valueMap = this.shiftingValuesMap; //quick ref

        // calculate time since last call
        let deltaTime = !this.lastAnimated ?
                            0 : timestamp - this.lastAnimated;

        valueMap.tick(deltaTime);

        this.lastAnimated = timestamp;

        if(this.O.rotationOrigin) {
            if(valueMap.has('rotXSpeed')) {
                let rotationX = valueMap.get('rotationX');
                rotationX.target = rotationX.value + valueMap.get('rotXSpeed').value / deltaTime;
            }

            if(valueMap.has('rotYSpeed')) {
                let rotationY = valueMap.get('rotationY');
                rotationY.target = rotationY.value + valueMap.get('rotYSpeed').value / deltaTime;
            }
        }

        // only process sprite alpha updates once per 100 ms max as
        // this is pretty intense on CPU

        if(!this.lastSpriteUpdate || (performance.now() - this.lastSpriteUpdate > 200)) {
            this.lastSpriteUpdate = performance.now();

            let cameraPosition = this.camera.position;

            this.O.textSprites.forEach( sprite => {
                let distance = Math.round(cameraPosition.distanceTo(
                    sprite.getWorldPosition(this.wpTargetVector)
                ));

                let opacity;

                if(distanceOpacityMap.has(distance)) {
                    opacity = distanceOpacityMap.get(distance);
                } else {
                    opacity = Math.min(0.85, Math.max(0.15, (700-distance)/200));
                    distanceOpacityMap.set(distance, opacity);
                }

                // darker theme requires less transparency

                sprite.material.opacity = opacity;
            });
        }

        this.renderer.render( this.scene, this.camera );

        if(this._isMounted) {
            requestAnimationFrame( this.animate );
        }
    };

    onClick = ()=> {
        let eventTime = performance.now();
        let eventTimeDelta = eventTime - this.lastFocusEvent;

        // allow updating max every .35s from
        // another mouse event

        if(eventTimeDelta > 350) {
            this.setState({ isHighlighted : !this.state.isHighlighted });
        }
    };

    render () {
        const { classes, theme } = this.props;
        const { isHighlighted } = this.state;

        const leftIconClass = `mdi mdi-${!isHighlighted ? 'cursor-pointer' : 'human'}`;
        const arrowClass = `mdi mdi-arrow-right ${
                classes.arrow} ${
                isHighlighted ? classes.arrowRotated : ''
        }`;

        return (
            <div
                className={classes.container}
                ref={ c => this.R.container = c }
                onClick={this.onClick}
            >
                <FadingOrbitContainer isHighlighted={ isHighlighted } />
                <SkillsOverlayText theme={ theme } isVisible={ isHighlighted } />
                <p className={ classes.hintIcons }>
                {
                    <span>
                        <i className={ leftIconClass } />&nbsp;&nbsp;
                        <i className={ arrowClass } />&nbsp;&nbsp;
                        <i className="mdi mdi-information" />
                    </span>
                }
                </p>
            </div>
        );
    }
}

function SkillsOrbitContainer () {
    const [vpW, vpH] = useViewportSizes();
    const classes = useStyles({ vpW, vpH });
    const theme = useTheme();

    return (
        <SkillsOrbit
            vpW={ vpW }
            vpH={ vpH }
            classes={ classes }
            theme={ theme.palette.type }
        />
    );
}


export default SkillsOrbitContainer