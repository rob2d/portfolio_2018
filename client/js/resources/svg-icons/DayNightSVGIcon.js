import React from 'react'
import classNames from 'classnames'

export default ({ className })=> (
  <svg
   viewBox="0 0 24 24"
   version="1.1"
   className={ classNames('themeicon__star', className) }
  >
    <path
        className="themeicon__moon"
        d={
            `m 6.5749254,5.0329515 c -1.8797866,1.3703526 -3.565085,` + 
            `4.4634953 -3.565085,6.9395615 0,4.952133 3.9685845,8.989569 ` + 
            `8.9197406,9.087886 2.440816,0.04847 5.438033,-1.289025 7.136252,` + 
            `-3.792089 0.192696,-0.284022 -2.75836,0.457934 -6.510631,-1.729759 ` + 
            `C 4.7532209,10.09574 8.216223,3.812665 6.5749254,5.0329515 Z`
        }
    />
    <ellipse
        className="themeicon__sun"
        ry="4"
        rx="4"
        cy="12.370112"
        cx="12.079329"
        id="path1640"
    />
    <path
        className="themeicon__stara1 themeicon__star"
        d="M 15.22,6.03 10.87,9.09 13.5,0.99999995 Z"
    />
    <path
        className="themeicon__stara2 themeicon__star"
        d="m 13.5,1 -1.72,5.03 4.35,3.06 z"
    />
    <path
        className="themeicon__stara3 themeicon__star"
        d="M 9.25,4.09 13.5,7.28 17.75,4.09 Z"
    />
    <path
        className="themeicon__starb1 themeicon__star"
        d="M 19.613881,12.251779 16.812097,14.23 18.506049,9 Z"
    />
    <path
        className="themeicon__starb2 themeicon__star"
        d="m 15.768674,10.997614 2.737375,2.062262 2.737374,-2.062262 z"
    />
    <path
        className="themeicon__starb3 themeicon__star"
        d="M 18.506049,9 17.398217,12.251779 20.2,14.23 Z"
    />
    </svg>
);