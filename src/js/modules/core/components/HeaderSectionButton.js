import React          from 'react'
import pure           from 'recompose/pure'
import Button         from 'material-ui/Button'
import injectSheet    from 'react-jss'
import Tooltip   from 'react-tooltip'
import shouldShowHoverContent from 'tools/shouldShowHoverContent'

const styleSheet = 
{
    button :
    {
        display    : 'block',
        color      : '#FFFFFF',
        height     : 'auto',
        lineHeight : '24px',
        padding    : '8px',
    },
    buttonIconWrapper :
    {
        display : 'block'
    },
    buttonIcon :
    {
        fontSize : '18pt',
        position : 'relative',
        top      : '2px'
    },
    '@media (max-width: 400px)':
    {
        button : { minWidth : '68px' }
    }
};

const HeaderSectionButton = pure(injectSheet(styleSheet)(({ 
    onClick, domId, name, 
    iconClass, tooltipText, 
    classes, buttonDivRef, disabled 
})=>(
        <div ref={buttonDivRef}>
            {shouldShowHoverContent &&
            (
                <Tooltip
                    id={`header-menu-${name}-tooltip`}
                    delayShow={700}
                    place="bottom"
                    ><span>{tooltipText}</span>
                </Tooltip>
            )}
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
        </div>
    )
));
HeaderSectionButton.displayName='HeaderSectionButton';
export default HeaderSectionButton;