import React, { Component } from 'react'
import * as THREE from 'three'
import { textAlign, SpriteText2D } from 'three-text2d'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { about as strings} from 'strings'

const { triangulateShape } = THREE.ShapeUtils;

// TODOs

// (1) destroy instance and free up some
// RAM when component unmounts

const OUTER_RADIUS      = 200,
      INNER_RADIUS      = 40,
      RADIUS_DIFFERENCE = OUTER_RADIUS - INNER_RADIUS;

function getSkillSphereDiameter(value) {
    return (40 * value)-6;
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
            depthWrite  : false,
            antialias   : true
        })
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
            antialias   : true
        })
    },

    skillText : {
        type : 'text2d',
        unmapped : true,
        generateParams : ({ value }) => ({
            align     : textAlign.center, 
            font      : `${6+Math.round(34*value)}px roboto_bold`, 
            fillStyle : '#333333',
            side      : THREE.DoubleSide,
            depthTest : false,
            antialias : true
        })
    },
    skillPoint : {
        type : 'sphere',
        unmapped : true,
        generateParams : ({ value }) => ({
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
                opacity      : 0.1,
                depthWrite   : false,
                antialias    : true
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
        pointerEvents  : 'none'
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
    }

    componentDidMount() {
        this.instantiateScene();
        this.lastAnimated = performance.now();
    }

    componentWillUnmount() {
        this.freeResources();
    }

    componentDidUpdate(prevProps, prevState) {
        // if language has changed, we should also change the 
        // content of the sphere text

            if(prevProps.language != this.props.language) {
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
        // so be sure to re-style with flexible definitions
        let canvas = window.document.querySelector('#canvas3d canvas');
        if(canvas) {
            canvas.style.width="80%";
            canvas.style.height="auto";
        }
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
    };

    instantiateScene = ()=> {

        if(this.renderer) {
            this.freeResources();
        } else { 
            // instantiate renderer, scene, camera
            this.scene    = new THREE.Scene();
            this.camera   = new THREE.PerspectiveCamera(60, 1, 0.5, 2000);
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
    
    // TODO : remove previous instance
    createOrbit = ()=> {
        let skillStrings = strings.skills;

        // base object which will rotate
        this.O.rotationOrigin = new THREE.Object3D();

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
        this.camera.position.set(0, 0, 550);

        this.O.textSprites = [];
        this.O.skillPoints = [];
        
        skillPoints.forEach( ({ namespace, value }, i, arr) => {

            let projectionAngle = (i/arr.length) * 1.0 * Math.PI*2;

            let textSprite = new SpriteText2D(
                skillStrings[namespace], sources.skillText.generateParams({ value })
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
                sources.skillPoint.generateParams({ value })
            );

            skillPointObj.position.set(x, y, z);
            
            this.O.skillPoints.push(skillPointObj);
            this.O.rotationOrigin.add(skillPointObj);

            // offset text by 2.5% rotation so that
            // it stays in view

            let textVertex = [ textX, textY, textZ ] = createSkillVertex({
                radianAngle : projectionAngle-(Math.PI*2*0.025),
                value
            });

            textSprite.position.set(textX, textY, textZ);
        });

        this.O.rotationOrigin.add(this.O.skillShape);

        this.scene.add(this.O.rotationOrigin);
    };

    animate = (timestamp)=> {
        let timeDelta = !this.lastAnimated ? 0 : timestamp - this.lastAnimated;
        console.log('deltaTime ->', timeDelta);
        
        this.lastAnimated = timestamp;

        if(this.O.rotationOrigin) {
            this.O.rotationOrigin.rotation.x += (0.0003125 * timeDelta);
            this.O.rotationOrigin.rotation.y += (0.000140625 * timeDelta);    
        }

        requestAnimationFrame( this.animate );
        this.renderer.render( this.scene, this.camera );
    };

    render () {
        const { classes } = this.props;

        return (
            <div 
                id="canvas3d" 
                className={classes.canvas3d}
            ></div>
        );
    }
}

export default injectSheet(styleSheet)(connect(
    (state,ownProps)=> ({ 
        viewportWidth  : state.core.viewportWidth,
        viewportHeight : state.core.viewportHeight,
        language       : state.core.language
    }),
    null
)(SkillsOrbit));