import React, { useMemo, useEffect, useLayoutEffect, useRef, PureComponent } from 'react'
import { 
    Object3D, Vector3, Mesh, 
    SphereGeometry, MeshBasicMaterial,
    DoubleSide, Scene, PerspectiveCamera, 
    WebGLRenderer
} from 'three'
import { makeStyles, useTheme } from '@material-ui/styles'
import { textAlign, SpriteText2D } from 'three-text2d'
import useViewportSizes from 'use-viewport-sizes'
import { about as strings } from 'strings'
import skillPoints from 'constants/skillPoints'
import ShiftingValueMap from 'utils/data-structs/ShiftingValueMap'
import SkillsOverlayText from './skills-orbit/SkillsOverlayText'
import FadingOrbitContainer from './skills-orbit/FadingOrbitContainer'
const ShiftingValueEntry = ShiftingValueMap.ValueEntry;
const { skills } = strings;

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
            align     : textAlign.center, 
            font      : `${6+Math.round(34*value)}px roboto_bold`, 
            fillStyle : (theme == 'light') ? '#333333' : '#FFFFFF',
            side      : DoubleSide,
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

function SkillsOrbitContainer () {
    const [vpW, vpH] = useViewportSizes();
    const classes = useStyles({ vpW, vpH });
    const theme = useTheme();
    const canvas = useRef();
    /**
     * reference for collection of objects
     * to center around central mesh
     */
    const oRef = useRef(undefined);
    const [scene, setScene] = useState(()=>{});
    const [renderer, setRender] = useState(()=>{});

    const shiftingValuesMap = useMemo(()=> new ShiftingValuesMap(), []);
    const lastAnimated = useRef(performance.now());
    const tiltTimeProcessed = useRef(performance.now());

    
    /**
     * Adjusts renderer size according
     * to current window dimensions
     */
    const refreshRendererSize = useMemo(()=> ()=> {
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
        canvasRef.current = window.document.querySelector('#canvas3d canvas');

        // add event listener to newly created references
        containerRef.current.addEventListener('mouseenter', onMouseEnter);
        containerRef.current.addEventListener('mouseleave', onMouseLeave);  
    }, []);

    const onMouseMove = useMemo(()=> e => {
        const [isHighlighted, setHighlighted] = useState(false);
        const timeDelta = performance.now() - tiltTimeProcessed.current;
        const valueMap = shiftingValuesMap;

        // shift tilt rotation speed 
        // based on new mouse position

        if(timeDelta > 64 && canvas.current) {
            tiltTimeProcessed.current = performance.now();

            const mouseRelX = clientX / vpW;
            const mouseRelY = clientY / vpH;

            if(valueMap.has('rotYSpeed')) {
                const valueEntry = valueMap.get('rotYSpeed');
                valueEntry.target = (mouseRelX - 0.5) * 0.6;
            }

            if(valueMap.has('rotXSpeed')) {
                const valueEntry = valueMap.get('rotXSpeed');
                valueEntry.target = (mouseRelY - 0.5) * 0.6;
            }
        }
    }, []);

    const createOrbit = useMemo(()=> ()=>{
        oRef.current = oRef.current || {};
        const objs = oRef.current;
        objs.rotationOrigin = new Object3D();
        /**
         * needed for Three.JS' "World Position" API
         * as reference to inject/update
         */
        objs.wpTargetVector = new Vector3();

        // sphere creation/assignment

        for(let [key, params] of Object.entries(sources)) {
            if(!params.nonMapped) {
                switch(params.type) {
                    case 'sphere': 
                        objs[key] = createMesh(params);
                        objs.rotationOrigin.add(objs[key]);
                        break;
                }
            }
        }

        objs.outerSphere.rotation.y = Math.PI/2;

        objs.textSprites = [];
        objs.skillPoints = [];
        
        // ============================= //
        // IMPLEMENTATION NOTE : 
        //
        // for angles, it is much more efficient to
        // track angle differences
        // vs polar coordinates 
        // for transparency effect with
        // distance
        // ============================= //
        
        objs.skillAngles = []; 

        skillPoints.forEach(({ namespace, value }, i, arr ) => {
            let projectionAngle = (i/arr.length) * Math.PI*2.0;
            objs.skillAngles.push(projectionAngle);

            let textSprite = new SpriteText2D(
                skillStrings[namespace],
                sources.skillText.generateParams({ value, theme })
            );

            objs.textSprites.push(textSprite);
            objs.rotationOrigin.push(textSprite);
        
            // difference between outer and inner circle radius

            let skillsVertex = createSkillVertex({
                radianAngle : projectionAngle,
                value 
            });

            let [ x, y, z ] = skillsVertex;

            let skillPointObj = createMesh(
                sources.skillPoint.generateParams({ value, theme })
            );

            skillPointObj.position.set(x, y, z)

            objs.skillPoints.push(skillPointObj);
            objs.rotationOrigin.add(skillPointObj);


            // offset by 2.5% rotation so that it stays
            // within view
            
            let [ textX, textY, textZ ] = createSkillVertex({
                radianAngle : projectionAngle - (Math.PI*2*0.025),
                value
            });

            textSprite.position.set(textX, textY, textZ);
        });

        scene.add(objs.rotationOrigin);
        
        shiftingValuesMap.set('rotationX', new ShiftingValueEntry({
            value : 0,
            target : 0,
            rate : (Math.PI * 2)/4,
            onChange : rX => {
                if(objs.rotationOrigin) {
                    objs.rotationOrigin.rotation.x = rX;
                }
            }
        }));

        shiftingValuesMap.set('rotationY', new ShiftingValueEntry({
            value : 0,
            target : 0,
            rate : (Math.PI * 2)/4,
            onChange : rY => {
                if(objs.rotationOrigin) {
                    objs.rotationOrigin.rotation.y = rY;
                }
            }
        }));

        shiftingValuesMap.set('rotXSpeed', new ShiftingValueEntry({
            value : 0,
            target : 0.175,
            rate : 0.25,
            onChange : rXSpeed => {}
        }));

        shiftingValuesMap.set('rotYSpeed', new ShiftingValueEntry({
            value : 0,
            target : 0.325,
            rate : 0.25,
            onChange : rYSpeed => {}
        }));
    }, []);

    const onMouseEnter = useMemo(()=> e => (
        !isHighlighted && setHighlighted(true) 
    ), [isHighlighted]);

    const onMouseLeave = useMemo(()=> e => (
        isHighlighted && setHighlighted(false)
    ));

    const instantiateScene = useMemo(()=> {
        if(renderer) {
            freeResources();
        } else {

            // instantiate renderer, scene and camera

            setScene(new Scene());
            setCamera(new PerspectiveCamera(60,1,0.5,2000));
        
            // attach callback to camera position

            shiftingValuesMap.set('camPosZ', new ShiftingValueEntry({
                value : 720,
                target : 520,
                rate : 500,
                onChange : camPosZ => {
                    const { position : { x, y } } = camera;
                    camera && camera.position.set(x,y,camPosZ);
                }
            }));

            // instantiaite new renderer
            setRenderer(new WebGLRenderer({
                alpha : true,
                antialias : true
            }));
        }
    }, []);

    const animate = useMemo(()=> timestamp => {
        let deltaTime = lastAnimated.current ? 
                            0 : timestamp - lastAnimated.current;
        
        shiftingValuesMap.tick(deltaTime);
        lastAnimated.current = timestamp;

        if(oRef.current.rotationOrigin) {
            if(shiftingValuesMap.has('rotXSpeed')) {
                let rX = valueMap.get('rotationX');
                rX.target = rX.value + shiftingValuesMap.get('rotXSpeed');
            }

            if(shiftingValuesMap.has('rotYSpeed')) {
                let rY = valueMap.get('rotationY');
                rY.target = rY.value + shiftingValuesMap.get('rotYSpeed');
            }
        }
    }, []);

    useEffect(()=> { instantiateScene() }, [theme]);

    useEffect(()=> { refreshRendererSize() }, [vpW, vpH]);

    useEffect(()=> {
        if(shiftingValuesMap) {
            lastFocusEvent.current = performance.now();
            
            if(shiftingValuesMap.has('camPosZ')) {
                let camPosZ = shiftingValuesMap.get('camPosZ');
                if(isHighlighted) {
                    camPosZ.target = 700;
                } else {
                    setTimeout(()=>( camPosZ.target = 550 ), 1000);
                }
            }
        }
    }, [isHighlighted])


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