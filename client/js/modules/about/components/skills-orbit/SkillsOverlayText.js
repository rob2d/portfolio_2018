import React, { memo, Fragment } from 'react'
import { makeStyles } from '@material-ui/styles'
import { about as strings} from 'strings'
import skillPoints from 'constants/skillPoints'
import Themes from 'constants/Themes'
import { getTheme } from 'app-root/themeFactory'
import ValueBar from './ValueBar'

const useStyles = makeStyles( theme => ({
    container : {
        position       : 'absolute',
        bottom         : '0',
        width          : '180px',
        height         : '100%',
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center',
        pointerEvents  : 'none',
        flexDirection  : 'column',
        opacity        : ({ isVisible }) => (isVisible ? 1.0 : 0.0),
        transition     : ({ isVisible }) => `opacity 0.5s ease ${ !isVisible ? 1: 0 }s`,
        overflowX      : 'hidden',
        overflowY      : 'visible',
        color          : theme.rc3.text
    },
    textItem : {
        boxSizing      : 'border-box',
        display        : 'flex',
        width          : '100%',
        justifyContent : 'flex-end',
        alignItems     : 'center',
        height         : (Math.round(100/skillPoints.length) * 0.62) + '%'
    },
    namespace : {
        display        : 'flex',
        flexDirection  : 'row',
        width          : '75%',
        justifyContent : 'flex-start',
        fontFamily     : 'roboto_light',
        fontSize       : '11pt'
    },
    value : {
        display        : 'flex',
        flexDirection  : 'row',
        width          : '25%',
        justifyContent : 'flex-end',
        fontFamily     : 'roboto_regular',
        fontSize       : '11pt'
    }
}));

function SkillsOverlayText({ isVisible }) {
    const classes = useStyles({ isVisible });
    let skillStrings = strings.skills;

    return (
        <div className={classes.container}>
            { skillPoints.sort((sp1, sp2)=> (
                sp2.value-sp1.value
                )).map(({ namespace, value }, index) => (
                <Fragment key={`skillText_${namespace}_${index}`}>
                    <div className={classes.textItem}>
                        <p className={classes.namespace}>
                            { skillStrings[namespace] } 
                        </p> 
                        <p className={classes.value}>
                            { parseFloat(value).toFixed(2) }
                        </p>
                    </div>
                    <ValueBar 
                        isVisible={isVisible}
                        value={value} 
                        index={index} 
                    />
                </Fragment>
            )) }
        </div>
    );
}

export default memo(SkillsOverlayText)