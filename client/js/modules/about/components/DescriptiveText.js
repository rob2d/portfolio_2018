import React from 'react'
import { about as strings, } from 'strings'
import ButtonLink from 'utils/components/ButtonLink'
import withFadeTransitions from 'utils/withFadeTransitions'

function Tech ({ children, containerClass, url }) {
    return (
        <ButtonLink containerClass={ containerClass } url={ url }>
            { children }
        </ButtonLink>
    );
}

function DescriptiveText ({ pClass, techProps }) {
    return (
        <p className={ pClass }> 
            {strings.thisSiteWas}
            <Tech 
                url={'https://reactjs.com'} 
                { ...techProps }
            >React
            </Tech>,&nbsp;
            <Tech
                 url={'https://redux.js.org'} 
                 { ...techProps }
            >Redux
            </Tech>,&nbsp;
            <Tech 
                url={'https://threejs.org'} 
                { ...techProps }
            >THREE.js
            </Tech>,&nbsp; 
            <Tech 
                url={'https://nodejs.org'} 
                { ...techProps }
            >Node
            </Tech>,&nbsp; 
            <Tech 
                url={'https://webpack.js.org/'} 
                { ...techProps }
            >Webpack
            </Tech>,&nbsp;
            { strings.andDeployedUsing }
            <Tech 
                url={'http://nginx.org'} 
                { ...techProps }
            >NginX
            </Tech> and&nbsp; 
            <Tech 
                url={'http://pm2.keymetrics.io/'} 
                { ...techProps }
            >PM2
            </Tech>.
        </p>
    );
}

export default withFadeTransitions(DescriptiveText)