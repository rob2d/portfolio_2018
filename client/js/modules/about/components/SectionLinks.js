import React, { memo } from 'react'
import { makeStyles } from '@material-ui/styles'
import ButtonLink from 'utils/components/ButtonLink'
import { menus as menuStrings } from 'strings'
import isLandscape from 'utils/isLandscape'
import isPortrait from 'utils/isPortrait'

const useStyles = makeStyles( theme => ({
    sectionList : {
        paddingLeft : ({ vpW, vpH }) => (
            !isPortrait(vpW, vpH) ? '16px' : '0px'
        ),
        paddingRight : ({ vpW, vpH }) => (
            !isPortrait(vpW, vpH) ? '16px' : '0px'
        ),
        paddingTop    : '8px',
        paddingBottom : '0px',
        textAlign     : 'left',
        paddingInlineStart : ({ vpW, vpH }) => {
            if(isPortrait(vpW, vpH)) {
                return '0px';
            } 
            else if(isLandscape(vpW, vpH)) {
                return '16px';
            } else {
                return '40px';
            }
        },
        position : 'relative',
        left : ({ vpW, vpH} ) => {
            if(isPortrait(vpW, vpH)) {
                return (vpW < 400) ? '-24px' : '-48px'
            } else {
                return '0px';
            }
        }
    },
    sectionLink : {
        position : 'relative',
        display : ({ vpW, vpH }) => (
            !isLandscape(vpW, vpH) ? 
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
            left : ({ vpW, vpH }) => (
                isPortrait(vpW, vpH) ? 
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
        minWidth      : ({ vpW, vpH })=>(
            (!isPortrait(vpW, vpH) && 
            !isLandscape(vpW,vpH)) ? 
                '148px' : '1px'
        ),
        textAlign     : 'left',
        transition    : 'color 0.21s'
    },

    linkDivider : {
        display : 'inline-block',
        color   : theme.rc3.text
    },
    '@media (orientation:landscape)': {
        avatar : {
            margin : '16px 16px 8px'
        },
        mainContainer : {
            padding : '16px',
            flexDirection : 'row',
            boxSizing : 'border-box'
        }
    },

    icon : {
        marginRight : ({ vpW, vpH }) => (
            !isLandscape(vpW,vpH) ? '16px' : '6px'
        ),
        fontSize : '13pt',
        color : theme.rc3.text
    },

    // make certain things larger on non-mobile devices
    '@media (min-width:901px)' : {
        sectionList : {
            paddingLeft : '64px'
        }
    }
}), 'SectionLinks');

const SectionLink = memo(function SectionLink ({ url, name, mdiClass, classes }) {
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
});

function SectionLinks ({ vpW, vpH }) {
    const classes = useStyles({ vpW, vpH })
    const sectionLinkProps = {
        vpW,
        vpH,
        classes
    };

    const linkDividerClass = `mdi mdi-circle-small ${classes.linkDivider}`;
    const isInLandscape = isLandscape(vpW, vpH);
    const isInPortrait = isPortrait(vpW, vpH);
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

export default memo(SectionLinks)