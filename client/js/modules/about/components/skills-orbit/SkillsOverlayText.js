import React, { Fragment } from 'react'
import injectSheet         from 'react-jss'
import { about as strings} from 'strings'
import skillPoints         from 'constants/skillPoints'
import Themes              from 'constants/Themes'
import { getTheme }        from 'app-root/themeFactory'

const ValueBar = injectSheet({
    container : { 
        width : '100%',
        transition : 'border-color 0.5s',
        height : '4px'
    },
    bar : {
        display : 'block',
        width   : ({ isVisible, value }) => (
            (isVisible ? (value * 100)  : '0') + '%'
        ),
        height : '100%',
        backgroundColor : '#c51162',
        transition : ({ index }) => {
            const attribs = `0.30s linear ${Number(((index+1)*0.1).toFixed(2))+'s'}`;
            return `width ${attribs}`;
        }
    }
})(({ classes, isVisible, index, value }) => (
    <div className={classes.container}>
        <div className={classes.bar}>
        </div>
    </div>
));

const styleSheet = {
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
        color          : ({ theme }) => getTheme(theme).rc3.text
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
};

const SkillsOverlayText = injectSheet(styleSheet)(
    function SkillsOverlayText({ classes, isVisible }) {
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
);

export default SkillsOverlayText