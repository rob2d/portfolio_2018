import React from 'react'
import ButtonLink from 'tools/components/ButtonLink'
import injectSheet from 'react-jss'
import { menus as menuStrings } from 'strings'
import isLandscape from 'tools/isLandscape'
import isPortrait from 'tools/isPortrait'
import { getTheme } from 'app-root/themeFactory'

const styleSheet = {
    sectionList : {
        paddingLeft : ({ viewportWidth, viewportHeight }) => (
            !isPortrait(viewportWidth, viewportHeight) ? '16px' : '0px'
        ),
        paddingRight : ({ viewportWidth, viewportHeight }) => (
            !isPortrait(viewportWidth, viewportHeight) ? '16px' : '0px'
        ),
        paddingTop    : '8px',
        paddingBottom : '0px',
        textAlign     : 'left',
        paddingInlineStart : ({ viewportWidth, viewportHeight }) => {
            if(isPortrait(viewportWidth, viewportHeight)) {
                return '0px';
            } 
            else if(isLandscape(viewportWidth, viewportHeight)) {
                return '16px';
            } else {
                return '40px';
            }
        },
        position : 'relative',
        left : ({ viewportWidth, viewportHeight} ) => {
            if(isPortrait(viewportWidth, viewportHeight)) {
                return (viewportWidth < 400) ? '-24px' : '-48px'
            } else {
                return '0px';
            }
        }
    },
    sectionLink : {
        position : 'relative',
        display : ({ viewportWidth, viewportHeight }) => (
            !isLandscape(viewportWidth, viewportHeight) ? 
                'block' : 'inline-block'
        ),
        padding : '8px',
        '&:hover $listItem' : {
            color : '#ff4081'
        },
        '&:active $listItem' : {
            color : '#00b8d4'
        },
        '&:nth-of-type(odd)': {
            left : ({ viewportWidth, viewportHeight }) => (
                isPortrait(viewportWidth, viewportHeight) ? 
                    '-12px' : '0px'
            )
        }
    },

     listItem : {
        listStyleType : 'none',
        cursor        : 'pointer',
        color         : '#c51162',
        fontFamily    : 'roboto_bold',
        fontSize      : '11pt',
        minWidth      : ({ viewportWidth, viewportHeight })=>(
            (!isPortrait(viewportWidth, viewportHeight) && 
            !isLandscape(viewportWidth,viewportHeight)) ? 
                '148px' : '1px'
        ),
        textAlign     : 'left',
        transition    : 'color 0.21s'
    },

    linkDivider : {
        display : 'inline-block',
        color   : ({ theme }) => getTheme(theme).rc3.text
    },
    '@media (orientation:landscape)': {
        avatar : {
            margin : '16px 16px 8px'
        },
        mainContainer : {
            padding       : '16px',
            flexDirection : 'row',
            boxSizing     : 'border-box'
        }
    },

    icon : {
        marginRight : ({ viewportWidth, viewportHeight }) => (
            !isLandscape ? '16px' : '6px'
        ),
        fontSize    : '13pt',
        color       : ({ theme }) => getTheme(theme).rc3.text
    },

    // make certain things larger on non-mobile devices
    '@media (min-width:901px)' : {
        sectionList : {
            paddingLeft : '64px'
        }
    }
};

function SectionLink ({ url, name, theme, mdiClass, classes }) {
    const iconClass = `mdi mdi-${mdiClass} ${classes.icon}`;

    return (
        <ButtonLink 
            url={url}
            containerClass={classes.sectionLink}
        >   <li className={classes.listItem}> 
                <i className={iconClass} />&nbsp;{name}
            </li>
        </ButtonLink>
    );
};

function SectionLinks ({ classes, viewportWidth, viewportHeight, theme }) {
    
    const sectionLinkProps = {
        theme,
        viewportWidth,
        viewportHeight,
        classes
    };

    const linkDividerClass = `mdi mdi-circle-small ${classes.linkDivider}`;
    const isInLandscape = isLandscape(viewportWidth, viewportHeight);
    const isInPortrait = isPortrait(viewportWidth, viewportHeight);
    const isSmallDevice = isInLandscape || isInPortrait;
    
    return (
        <ul className={classes.sectionList}>
            <SectionLink 
                name={menuStrings.main.projects} 
                mdiClass={'briefcase'} 
                url={'/projects'} 
                { ...sectionLinkProps }
            />
            { isInLandscape  && <i className={linkDividerClass} /> }
            <SectionLink 
                name={ isInLandscape ? 'Misc' : 'Miscellaneous' } 
                mdiClass={'dice-multiple'} 
                url={'/misc'} 
                { ...sectionLinkProps }
            /> 

            { isInLandscape  && <i className={linkDividerClass} /> }
            <SectionLink
                name={menuStrings.main.cv}
                mdiClass={'file-document-box'}
                url={'/cv'}
                { ...sectionLinkProps }
            />
        </ul>
    );
}

export default injectSheet(styleSheet)(SectionLinks)