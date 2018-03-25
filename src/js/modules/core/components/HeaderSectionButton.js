import React          from 'react'
import pure           from 'recompose/pure'
import Button         from 'material-ui/Button'
import injectSheet    from 'react-jss'
import Tooltip   from 'material-ui/Tooltip'
import shouldShowHoverContent from 'tools/shouldShowHoverContent'

const BUTTON_WIDTH_PX = 60;

const styleSheet = 
{
    container : {
        display : 'block'
    },
    button : {
        display    : 'block',
        color      : '#FFFFFF',
        height     : 'auto',
        lineHeight : '24px',
        padding    : '8px',
        minWidth   : '60px'
    },
    buttonIconWrapper : {
        display : 'block'
    },
    buttonIcon : {
        fontSize : '18pt',
        position : 'relative',
        top      : '2px'
    },
    // TODO : use constant to make
    //        tooltip style DRY
    tooltip : {
        fontSize : '11pt',
        padding  : '4px 8px',
        minHeight: '20px',
        lineHeight: '20px'
    },
    '@media (max-width: 400px)': {
        button : { minWidth : '68px' }
    }
};

const HeaderSectionButton = pure(injectSheet(styleSheet)(({ 
    onClick, domId, name, 
    iconClass, tooltipText, 
    classes, buttonDivRef, disabled
})=>(
        <div ref={buttonDivRef} className={classes.container}>
            <Tooltip
                enterDelay={400}
                place="bottom"
                title={tooltipText}
                disableTriggerFocus={!shouldShowHoverContent}
                disableTriggerHover={!shouldShowHoverContent}
                disableTriggerTouch={!shouldShowHoverContent}
                classes={{ tooltip : classes.tooltip }}
                >
                <Button className={ classes.button }
                    disabled={ disabled }
                    data-tip data-for={ `header-menu-${name}-tooltip` }
                    id={ domId }
                    onClick={ onClick }
                >
                    <div className={ classes.buttonIconWrapper }>
                        <i className={`${iconClass} ${
                            classes.buttonIcon
                        }`}/>
                    </div>
                </Button>
            </Tooltip>
        </div>
    )
));
HeaderSectionButton.displayName='HeaderSectionButton';
export default HeaderSectionButton;