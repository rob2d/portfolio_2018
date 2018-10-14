import React, { Fragment, Component } from 'react'
import * as THREE from 'three'
import { 
    textAlign, 
    SpriteText2D 
} from 'three-text2d'
import injectSheet         from 'react-jss'
import { connect }         from 'react-redux'
import { about as strings} from 'strings'
import Themes              from 'constants/Themes'
import DEBUG_3D            from 'constants/env/DEBUG_3D'

const { triangulateShape } = THREE.ShapeUtils;

// (1) destroy instance and free up some
// RAM when component unmounts

const OUTER_RADIUS      = 200,
      INNER_RADIUS      = 40,
      RADIUS_DIFFERENCE = OUTER_RADIUS - INNER_RADIUS;

function getSkillSphereDiameter(value) {
    return (40 * value) - 6;
}

function createSkillVertex({ radianAngle, value=1 }) {
    let vRadius  = getSkillSphereDiameter(value)/2,
        xWidth   = Math.cos(radianAngle) * value * (RADIUS_DIFFERENCE-vRadius),
        yWidth   = Math.sin(radianAngle) * value * (RADIUS_DIFFERENCE-vRadius);
    
    return [x, y, z] = [
        Math.cos(radianAngle) * INNER_RADIUS + xWidth, 
        Math.sin(radianAngle) * INNER_RADIUS + yWidth, 
        0
    ];
}

function createMesh (sources) {
    const { geometry, material } = sources;
    return new THREE.Mesh(geometry, material);
}


let skillPoints = [
    { namespace : 'frontend',     value : 1.00 },  
    { namespace : 'devops',       value : 0.55 },  
    { namespace : 'backend',      value : 0.92 }, 
    { namespace : 'uiUxDesign',   value : 0.70 }, 
    { namespace : 'architecture', value : 0.95 },
    { namespace : 'graphics',     value : 0.60 }
];

/**
 * cache distance->opacity mappings
 * as they are calculated as this
 * greatly speeds things up here
 */
let distanceOpacityMap = new Map();

const sources = {
    outerSphere : {
        type     : 'sphere',
        geometry : new THREE.SphereGeometry( OUTER_RADIUS, 17, 17 ),
        material : new THREE.MeshBasicMaterial({ 
            color       : 0xDCDCDC, 
            wireframe   : true,
            side        : THREE.DoubleSide,
            opacity     : 0.4,
            transparent : true,
            depthWrite  : false
        }),
        cursor : 'pointer'
    },

    innerSphere : {
        type     : 'sphere',
        geometry : new THREE.SphereGeometry( INNER_RADIUS, 7, 7 ),
        material : new THREE.MeshBasicMaterial({ 
            color       : 0xCC288D, 
            wireframe   : true,
            side        : THREE.DoubleSide,
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
            fillStyle : (theme == Themes.LIGHT) ? '#333333' : '#FFFFFF',
            side      : THREE.DoubleSide,
            depthTest : false
        })
    },
    skillPoint : {
        type : 'sphere',
        unmapped : true,
        generateParams : ({ value, theme }) => ({
            geometry   : new THREE.SphereGeometry( 
                getSkillSphereDiameter(value), 
                6+Math.round(1.7*value), 
                6+Math.round(1.7*value) 
            ),
            material   : new THREE.MeshBasicMaterial({ 
                color        : 0xC51162,
                wireframe    : true,
                side         : THREE.DoubleSide,
                transparent  : true,
                opacity      : theme == Themes.LIGHT ? 0.1 : 0.2,
                depthWrite   : false
            })
        })
    }
};

const styleSheet = {
    canvas3d : {
        position       : 'relative',
        display        : 'flex',
        overflow       : 'hidden',
        justifyContent : 'center',
        alignItems     : 'center',
        flexAlign      : 'center',
        pointerEvents  : 'all'
    },
    meta3d : {
        maxWidth  : '200px',
        maxheight : '200px',
        overflow  : 'auto'
    }
};

class SkillsOrbit extends Component {
    constructor (props, context) {
        super(props, context);

        /**
         *  namespace for Three.JS objects
         **/
        this.O = {};
        this._hasInstantiated = false;

        /**
         * 
         * variables related to rotation
         * via device; on Desktop, this
         * would be via mouse and on
         * touch-oriented devices, it would
         * be via gyroscope
         * 
         */
        this.tilt = {
            x : 0.08, 
            y : 0.12,
            timeProcessed : performance.now()
        };

        this.rotationSpeed = {
            x : 0,
            y : 0,
            z : 0
        };

        this.targetRotation = {
            x : Math.PI/60,
            y : Math.PI/60,
            z : 0
        };

        this.targetZCam = 2000;

        this.R = { 
            canvas    : undefined,
            container : undefined,
            debugText : undefined
        };

        this._isMounted = false;
        this.state = { isMouseOver : false };
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
        if(DEBUG_3D) {
            this.R.debugText = undefined;
        }
        this._isMounted = false;
    }

    onMouseMove = (e) => {
        const { clientX, clientY } = e;
        const timeDelta = performance.now() - this.tilt.timeProcessed; 

        if(timeDelta > 64 && this.R.canvas) {
            this.tilt.timeProcessed = performance.now();
            let { canvas } = this.R;
            let rect    = canvas.getBoundingClientRect(),
                centerX = rect.left + (rect.width/2),
                centerY = rect.top  + (rect.height/2);

            let relX = centerX/window.innerWidth,
                relY = centerY/window.innerHeight;

            let mouseRelX = clientX / window.innerWidth,
                mouseRelY = clientY / window.innerHeight;

            this.tilt.y = (mouseRelX-0.5)*2;
            this.tilt.x = (mouseRelY-0.5)*2;
        }
    };

    onMouseEnter = e => {
        if(!this.state.isMouseOver) {
            this.setState({ isMouseOver : true });
        }
    };

    onMouseLeave = e => {
        if(this.state.isMouseOver) {
            this.setState({ isMouseOver : false });
        }
    };

    componentDidUpdate(prevProps, prevState) {
        // if language has changed, we should also change the 
        // content of the sphere text

        if(prevProps.theme != this.props.theme) {
            this.instantiateScene();
        } else {

            // upon resize of window, recalculate the width of the renderer    

            let maxDimension = Math.max(
                    this.props.viewportWidth,
                    this.props.viewportHeight
                ),
                prevMaxDimension = Math.max(
                    prevProps.viewportWidth, 
                    prevProps.viewportHeight
                );
                
            if(maxDimension != prevMaxDimension) {
                this.refreshRendererSize();
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
            if(maxDimension <= 800) {
               return 180;
            } else if(maxDimension <= 960) {
                return 200;
            } else {
                return 240;
            }
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
        this.R.container = window.document.querySelector('#canvas3d');
        this.R.canvas = window.document.querySelector('#canvas3d canvas');

        // add event listener to newly created references
        this.R.container.addEventListener('mouseenter', this.onMouseEnter);
        this.R.container.addEventListener('mouseleave', this.onMouseLeave);  
    };

    freeResources = () => {
        
        // TODO : look into whether this properly
        // frees up memory

        this.scene.remove(this.O.rotationOrigin);
        this.O.rotationOrigin = undefined;
        this.O.textSprites.length = 0;
        this.O.skillPoints.length = 0;
        this.O.outerSphere = undefined;
        this.O.innerSphere = undefined;

        this.R.container.removeEventListener('mouseenter', this.onMouseEnter);        
        this.R.container.removeEventListener('mouseleave', this.onMouseLeave);

        this.R.container = undefined;
        this.R.canvas = undefined;
    };

    instantiateScene = () => {

        if(this.renderer) {
            this.freeResources();
        } else { 
            // instantiate renderer, scene, camera
            this.scene    = new THREE.Scene();
            this.camera   = new THREE.PerspectiveCamera(60, 1, 0.5, 2000);
            this.camera.position.set(0, 0, 550);

            this.renderer = new THREE.WebGLRenderer({ alpha : true, antialias : true });
        }

        this.createOrbit();

        document.getElementById('canvas3d')
                    .appendChild( this.renderer.domElement );
        
        this.refreshRendererSize();

        if(!this._hasInstantiated) {
            this._hasInstantiated = true;
            window.requestAnimationFrame(this.animate);
        }
    };
    
    createOrbit = ()=> {
        const { theme } = this.props;
        let skillStrings = strings.skills;

        // base object which will rotate
        this.O.rotationOrigin = new THREE.Object3D();

        // needed for new API; must provide target vector,
        // or we get warnings. Luckily, we can just create 
        // one re-useable vector to satisfy the beast's needs

        this.wpTargetVector = new THREE.Vector3();

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

            let skillVertex = [ x, y, z ] = createSkillVertex({ 
                radianAngle : projectionAngle, 
                value 
            });

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

        this.O.rotationOrigin.add(this.O.skillShape);

        this.scene.add(this.O.rotationOrigin);
    };

    animate = (timestamp)=> {
        let timeDelta = !this.lastAnimated ? 
                            0 : timestamp - this.lastAnimated;
        
        this.lastAnimated = timestamp;

        if(this.O.rotationOrigin) {

            if(this.rotationSpeed.x < this.tilt.x) {
                this.rotationSpeed.x += 0.0075;
            }

            if(this.rotationSpeed.x > this.tilt.x) {
                this.rotationSpeed.x -= 0.0075;
            }

            if(this.rotationSpeed.y < this.tilt.y) {
                this.rotationSpeed.y += 0.0075;
            }

            
            if(this.rotationSpeed.y > this.tilt.y) {
                this.rotationSpeed.y -= 0.0075;
            }

            this.O.rotationOrigin.rotation.x += this.rotationSpeed.x / 60;

            while(this.O.rotationOrigin.rotation.x < 0) {
                this.O.rotationOrigin.rotation.x += Math.PI * 2;
            }

            this.O.rotationOrigin.rotation.x %= Math.PI * 2;

            this.O.rotationOrigin.rotation.y += this.rotationSpeed.y / 60;
            
            while(this.O.rotationOrigin.rotation.y < 0) {
                this.O.rotationOrigin.rotation.y += Math.PI * 2;
            }

            this.O.rotationOrigin.rotation.y %= Math.PI * 2;     

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

        if(DEBUG_3D && this.R.debugText) {
            let { 
                x:xR, 
                y:yR, 
                z:zR 
            } = this.O.rotationOrigin.rotation;

            this.R.debugText.innerHTML = `${
                Math.round(xR*100)
            }, <br/>${Math.round(yR*100)} <br/>${zR}`;
        }

        this.renderer.render( this.scene, this.camera );

        if(this._isMounted) {
            requestAnimationFrame( this.animate );
        }
    };

    render () {
        const { classes } = this.props;
        return (
            <Fragment>
                { DEBUG_3D && <pre 
                    id="meta3d" 
                    className={ classes.meta3d }
                    ref={ c => this.R.debugText = c }>[debug vars]</pre> 
                }
                <div 
                    id="canvas3d" 
                    className={ classes.canvas3d }
                    ref={ c => this.R.container = c }
                >
                </div>
            </Fragment>
            );
    }
}

export default injectSheet(styleSheet)(connect(
    (state,ownProps)=> ({ 
        viewportWidth  : state.core.viewportWidth,
        viewportHeight : state.core.viewportHeight,
        theme          : state.core.theme
    }),
    null
)(SkillsOrbit));