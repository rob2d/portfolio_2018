import React from 'react';
import clsx from 'clsx';
import C from 'color';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

// TODO : convert to makeStyles now that MUI supports it;
// cuts down on file size and redundant issues which
// we solve with BEM convention here


const defaultStarXform = 'scaleX(1.0) scaleY(1.0) translateX(0%) translateY(0%) rotateZ(0deg)';

const useStyles = makeStyles(({ palette : { common } }) => {

    // use RGBA computation for transitions
    const a0 = `${C(common.white).alpha(0).rgb()}`;
    const a255 = `${C(common.white).alpha(1).rgb()}`;

    return {
        container : {
            cursor : 'pointer',
            fontSize : '18pt',
            height : '48px',
            '& svg ' : {
                width : '26px',
                height : '26px'
            },
            '&,& *': {
                color : common.white,
                fill : common.white,
            }
        },
        star : {
            transformOrigin : '50% 50%',
            stroke : a0,
            strokeWidth : '2px',
            transition: p => `transform 0.35s ease-in ${p.type=='dark'?0:0.125}s`
        },

        'moon' : {
            stroke : `${a255} !important`,
            fill : 'none !important',
            transformOrigin : '50% 52%',
            opacity : p => p.dark ? 1 : 0,
            transform : p => `scale(${p.dark?'1':'0.475'})`,
            transition : p => `opacity 0.5s ease ${p.dark?'0.25':'0'}s, ` +
                `transform 0.25s linear ${p.dark?'0.20':'0.0'}s`,
        },

        sun : {
            opacity : p => p.dark ? 0 : 1,
            transition : p => `opacity 0.75s ease ${p.dark?0.1:0.25}s`,
            stroke : a255,
            fill : 'none'
        },

        starA1 : {
            transform : p => !p.dark ?
                'scaleX(0.5) scaleY(0.6) translateX(29%) translateY(-50%) rotateZ(-108deg)' :
                defaultStarXform
        },

        starA2 : {
            transform : p => !p.dark ?
                'scaleX(0.5) scaleY(0.6) translateX(-75%) translateY(-25%) rotateZ(-290deg)' :
                defaultStarXform
        },

        starA3 : {
            transform : p => !p.dark ?
                'scaleX(0.5) scaleY(0.6) translateX(-75%) translateY(40%) rotateZ(50deg)' :
                defaultStarXform
        },

        starB1 : {
            transform : p => !p.dark ?
                'scaleX(0.7) scaleY(0.8) translateX(25%) translateY(3%) rotateZ(-65deg)' :
                defaultStarXform
        },

        starB2 : {
            transform : p => !p.dark ?
                'scaleX(0.7) scaleY(0.8) translateX(30%) translateY(40%) rotateZ(-60deg)' :
                defaultStarXform
        },

        starB3 : {
            transform : p => !p.dark ?
                'scaleX(0.7) scaleY(0.8) translateX(-5%) translateY(66%) rotateZ(-73.5deg)' :
                defaultStarXform
        }
    };
}, { name : 'DayNightSVGIcon' });

export default function DayNightSVGIcon({ selection }) {
    const classes = useStyles({ dark : selection == 'dark' });

    return (
        <svg viewBox={ "0 0 24 24" } className={ clsx(classes.star, classes.container) }>
            <path
                className={ classes.moon }
                d={
                    `m 6.5749254,5.0329515 c -1.8797866,1.3703526 -3.565085,` +
                    `4.4634953 -3.565085,6.9395615 0,4.952133 3.9685845,8.989569 ` +
                    `8.9197406,9.087886 2.440816,0.04847 5.438033,-1.289025 7.136252,` +
                    `-3.792089 0.192696,-0.284022 -2.75836,0.457934 -6.510631,-1.729759 ` +
                    `C 4.7532209,10.09574 8.216223,3.812665 6.5749254,5.0329515 Z`
                }
            />
            <ellipse
                className={ classes.sun }
                ry={ '4' }
                rx={ '4' }
                cy={ '12.370112' }
                cx={ '12.079329' }
            />
            <path
                className={ clsx(classes.starA1, classes.star) }
                d={ 'M 15.22,6.03 10.87,9.09 13.5,0.99999995 Z' } />
            <path
                className={ clsx(classes.starA2, classes.star) }
                d={ 'm 13.5,1 -1.72,5.03 4.35,3.06 z' }
            />
            <path
                className={ clsx(classes.starA3, classes.star) }
                d={ 'M 9.25,4.09 13.5,7.28 17.75,4.09 Z' }
            />
            <path
                className={ clsx(classes.starB1, classes.star) }
                d={ 'M 19.613881,12.251779 16.812097,14.23 18.506049,9 Z' }
            />
            <path
                className={ clsx(classes.starB2, classes.star) }
                d={ 'm 15.768674,10.997614 2.737375,2.062262 2.737374,-2.062262 z' }
            />
            <path
                className={ clsx(classes.starB3, classes.star) }
                d={ 'M 18.506049,9 17.398217,12.251779 20.2,14.23 Z' }
            />
        </svg>
    );
}
