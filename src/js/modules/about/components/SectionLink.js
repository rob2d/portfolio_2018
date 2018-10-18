import React from 'react'
import pure from 'recompose/pure'
import injectSheet from 'react-jss'
import { getTheme } from 'app-root/themeFactory'
import ButtonLink from 'tools/components/ButtonLink'
import isLandscape from 'tools/isLandscape'

const styles = {
    listItem : {
        listStyleType : 'none',
        cursor        : 'pointer',
        color         : '#c51162',
        fontFamily    : 'roboto_bold',
        fontSize      : '11pt',
        minWidth      : ({ viewportWidth, viewportHeight })=>(
            !isLandscape(viewportWidth,viewportHeight) ? '148px' : '1px'
        ),
        textAlign     : 'left',
        transition    : 'color 0.21s'
    },
    icon : {
        marginRight : ({ viewportWidth, viewportHeight }) => (
            !isLandscape ? '16px' : '6px'
        ),
        fontSize    : '13pt',
        color       : ({ theme }) => getTheme(theme).rc3.text
    }
};


let SectionLink = pure(injectSheet(styles)(
    function SectionLink ({ url, name, theme, mdiClass, containerClass, classes }) {
        const iconClass = `mdi mdi-${mdiClass} ${classes.icon}`;

        return (
            <ButtonLink 
                url={url}
                containerClass={containerClass}
            >   <li className={classes.listItem}> 
                    <i className={iconClass} />&nbsp;{name}
                </li>
            </ButtonLink>
        );
}));

export default SectionLink