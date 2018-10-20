import React from 'react'
import injectSheet from 'react-jss'
import {  menus as menuStrings } from 'strings'
import isLandscape from 'tools/isLandscape'
import isPortrait  from 'tools/isPortrait'
import { getTheme } from 'app-root/themeFactory'
import SectionLink from './SectionLink'

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
        left     : ({ viewportWidth, viewportHeight} ) => (
            isPortrait(viewportWidth, viewportHeight) ? 
            '-48px' : '0px'
        )
    },
    sectionLink : {
        position : 'relative',
        display : ({ viewportWidth, viewportHeight }) => (
            !isLandscape(viewportWidth, viewportHeight) ? 
                'block' : 'inline-block'
        ),
        padding : '8px !important',
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
    linkDivider : {
        display : 'inline-block',
        color   : ({ theme }) => getTheme(theme).rc3.text
    },
    '@media (orientation:landscape)': {
        avatar : {
            margin : '16px 16px 8px !important',
            marginLeft  : '16px',
            marginRight : '16px'
        },
        mainContainer : {
            padding       : '16px',
            flexDirection : 'row !important',
            boxSizing     : 'border-box'
        }
    },
    // make certain things larger on non-mobile devices
    '@media (min-width:901px)' : {
        sectionList : {
            paddingLeft : '64px'
        }
    }
};

function SectionLinks ({ classes, viewportWidth, viewportHeight, theme }) {
    
    const sectionLinkProps = {
        theme,
        viewportWidth,
        viewportHeight,
        containerClass : classes.sectionLink
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