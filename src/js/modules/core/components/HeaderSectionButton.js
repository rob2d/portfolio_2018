import React          from 'react'
import pure           from 'recompose/pure'
import Button         from '@material-ui/core/Button'
import injectSheet    from 'react-jss'
import Tooltip   from '@material-ui/core/Tooltip'
import shouldShowHoverContent from 'tools/shouldShowHoverContent'
import styleSheet from './style/HeaderSectionButtonStyle'

const HeaderSectionButton = pure(injectSheet(styleSheet)(function HeaderSectionButton({ 
    onClick, domId, name, 
    iconClass, tooltipText, 
    classes, buttonDivRef, disabled
}){ 
    return (
        <div ref={buttonDivRef} className={classes.container}>
            <Tooltip
                enterDelay={400}
                title={tooltipText}
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
}));
HeaderSectionButton.displayName='HeaderSectionButton';
export default HeaderSectionButton;