import React, { useMemo, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { isLandscape, isPortrait } from 'utils';
import { ButtonLink } from 'utils/components';
import { Icon } from '@mdi/react';
import { 
    mdiBriefcase,
    mdiDiceMultiple,
    mdiFileDocumentBox
} from '@mdi/js';

const useStyles = makeStyles(({ palette : { secondary, text, common } }) => ({
    sectionList : {
        paddingLeft : p => !isPortrait(p.vpW, p.vpH)?'16px':'0px',
        paddingRight : p => !isPortrait(p.vpW, p.vpH)?'16px':'0px',
        paddingTop : '8px',
        paddingBottom : '0px',
        textAlign : 'left',
        paddingInlineStart : p => {
            if(isPortrait(p.vpW, p.vpH)) { return '0px' } 
            else return `${isLandscape(p.vpW, p.vpH)? 6:40}px`
        },
        position : 'relative',
        left : p => {
            if(isPortrait(p.vpW, p.vpH)) {
                return (p.vpW < 400) ? '-24px' : '-48px'
            } else {
                return '0px';
            }
        }
    },
    sectionLink : {
        position : 'relative',
        display : p => `${isLandscape(p.vpW,p.vpH)?'inline-':''}block`,
        padding : '8px',
        '&:hover $listItem' : {
            color : secondary.main
        },
        '&:active $listItem' : {
            color : common.active
        },
        '&:nth-of-type(odd)': {
            left : p => `${isPortrait(p.vpW,p.vpH)?-12:0}px`
        }
    },
    listItem : {
        display : 'flex',
        listStyleType : 'none',
        cursor : 'pointer',
        color : secondary.dark,
        fontWeight : 700,
        fontSize : '11pt',
        minWidth : p => (
            (!isPortrait(p.vpW, p.vpH) && 
            !isLandscape(p.vpW,p.vpH)) ? 
                '148px' : '1px'
        ),
        textAlign : 'left',
        transition : 'color 0.21s',
        '& > *' : {
            marginRight : p => !isLandscape(p.vpW,p.vpH)?'16px':'6px'
        },
        '& svg' : {
            fontSize : '13pt',
            color : text.primary,
            fill : text.primary
        }
    },
    linkDivider : {
        display : 'inline-block',
        color : text.primary
    },

    // make certain things larger on non-mobile devices
    '@media (min-width:901px)' : {
        sectionList : {
            paddingLeft : '64px'
        }
    }
}), 'SectionLinks');

export default function SectionLinks ({ vpW, vpH }) {
    const classes = useStyles({ vpW, vpH })

    const isInLandscape = isLandscape(vpW, vpH);

    const SectionLink = useCallback(({ url, name, iconPath })=> (
            <ButtonLink 
                url={ url }
                containerClass={ classes.sectionLink }
            >   <li className={ classes.listItem }> 
                    <Icon 
                        path={ iconPath } 
                        size={ 0.75 }    
                    />&nbsp;{ name }
                </li>
            </ButtonLink>
    ), [classes]);

    return (
        <ul className={ classes.sectionList }>
            <SectionLink 
                name={ 'Projects' } 
                iconPath={ mdiBriefcase } 
                url={ '/projects' } 
            />
            <SectionLink 
                name={ isInLandscape ? 'Misc' : 'Miscellaneous' } 
                iconPath={ mdiDiceMultiple } 
                url={ '/misc' } 
            /> 
            <SectionLink
                name={ 'CV' }
                iconPath={ mdiFileDocumentBox }
                url={ '/cv' }
            />
        </ul>
    );
};