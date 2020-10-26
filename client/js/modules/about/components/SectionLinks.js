import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { isLandscape, isPortrait } from 'utils';
import { ButtonLink } from 'utils/components';
import { Icon } from '@mdi/react';
import { Sections } from 'constants/AppSections';

const [_, ...AppSections] = Sections;

const useStyles = makeStyles(({ palette : { secondary, common } }) => ({
    sectionList : {
        position : 'relative',
        paddingLeft : p => !p.isPortrait ? '16px':'0px',
        paddingRight : p => !p.isPortrait ? '16px':'0px',
        paddingTop : '8px',
        paddingBottom : '0px',
        textAlign : 'left',
        paddingInlineStart : p => `${
            (p.isPortrait ? 0 : `${(p.isLandscape ? 6 : 40)}`)
        }px`,
        left : p => (p.isPortrait ?
            `${(p.vpW < 400) ? -24 : -48}px` :
            `0px`
        ),
        '& > button' : {
            position : 'relative',
            display : p => `${p.isLandscape?'inline-':''}block`,
            padding : '8px',
            '&:hover > li' : { color : secondary.main },
            '&:active > li' : { color : common.activ },
            '&:nth-of-type(odd)': { left : p => `${p.isPortrait ? -12 : 0}px` }
        },
        '& > button > li' : {
            display : 'flex',
            listStyleType : 'none',
            cursor : 'pointer',
            color : secondary.dark,
            fontWeight : 700,
            fontSize : '11pt',
            minWidth : p => (!p.isPortrait && !p.isLandscape) ? '148px' : '1px',
            textAlign : 'left',
            transition : 'color 0.21s',
        },
        '& > button > li > *': {
            marginRight : p => !p.isLandscape ? '16px' : '6px'
        }
    },

    // make certain things larger on non-mobile devices

    '@media (min-width:901px)': {
        sectionList : {
            paddingLeft : '64px',
            height: '100%'
        }
    }
}), 'SectionLinks');

export default function SectionLinks({ vpW, vpH }) {
    const isInPortrait = isPortrait(vpW, vpH);
    const isInLandscape = isLandscape(vpW, vpH);
    const classes = useStyles({
        isPortrait : isInPortrait,
        isLandscape : isInLandscape
    });

    return (
        <ul className={ classes.sectionList }>
            { AppSections.map(({ name, nameUnabbrev, iconPath, basePath }) => (
                <ButtonLink
                    url={ basePath }
                    name={ isInLandscape ? name : nameUnabbrev }
                >
                    <li>
                        <Icon path={ iconPath } size={ 0.75 } />&nbsp;
                        { isInLandscape ? name : nameUnabbrev }
                    </li>
                </ButtonLink>
            )) }
        </ul>
    );
}
