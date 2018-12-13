import React from 'react'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import injectSheet from 'react-jss'
import { 
    about as strings, 
    menus as menuStrings 
} from 'strings'
import isPortrait  from 'utils/isPortrait'
import Avatar from '@material-ui/core/Avatar'
import ButtonLink from 'utils/components/ButtonLink'
import SectionLinks from './SectionLinks'
import SkillsOrbit from './SkillsOrbit'
import styleSheet from './style/AboutStyle'

function Tech ({ children, containerClass, url }) {
    return (
        <ButtonLink 
            containerClass={ containerClass } 
            url={ url }
        >{ children }
        </ButtonLink>
    );
}

function About ({ classes, viewportWidth, viewportHeight, theme }) {

    // check renderpixels on viewport for (general)
    // coverage of landscape; covers iPhone6-X
    // and most android devices

    const coreProps = { viewportWidth, viewportHeight, theme };
    const techProps = { containerClass : classes.tech, theme };
    const isInPortrait = isPortrait(viewportWidth, viewportHeight);

    return (
        <div className={classes.mainContainer}>
            <div className={classes.topContent}>
                <Avatar 
                    alt={'Rob'} 
                    src="img/about/me.jpg" 
                    className={classes.avatar}
                />
                { isInPortrait && <SectionLinks {...coreProps} /> }
            </div>

            <div className={classes.centerContent}>
                <p className={classes.pText}> 
                    {strings.thisSiteWas}
                    <Tech url={'https://reactjs.com'} { ...techProps }>React</Tech>,&nbsp;
                    <Tech url={'https://redux.js.org'} { ...techProps }>Redux</Tech>,&nbsp;
                    <Tech url={'https://threejs.org'} { ...techProps }>THREE.js</Tech>,&nbsp; 
                    <Tech url={'https://nodejs.org'} { ...techProps }>Node</Tech>,&nbsp; 
                    <Tech url={'https://webpack.js.org/'} { ...techProps }>Webpack</Tech>,&nbsp;
                    {strings.andDeployedUsing}
                    <Tech url={'http://nginx.org'} { ...techProps }>NginX</Tech> and&nbsp; 
                    <Tech url={'http://pm2.keymetrics.io/'} { ...techProps }>PM2</Tech>.
                </p>
                { !isInPortrait && <SectionLinks {...coreProps} /> }
            </div>
            
            <div className={classes.skillsOrbit}>
                <SkillsOrbit />
            </div>
        </div>
    );
};

export default pure(connect(
    ({ core }, ownProps)=> ({ 
        theme          : core.theme,
        viewportWidth  : core.viewportWidth,
        viewportHeight : core.viewportHeight
     })
)(injectSheet(styleSheet)(About)));