import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Technologies from 'constants/Technologies';
import ButtonLink from 'utils/components/ButtonLink';
import SVG from 'react-inlinesvg';
import C from 'color';

const useStyles = makeStyles(({ palette : { secondary, text, common } }) => ({
    techContainer : {
        margin : '4px',
        '&:hover $techText' : {
            color : secondary.main
        },
        '&:active $techText' : {
            color : common.active
        }
    },
    techText : {
        fontSize : '12pt',
        fontFamily : 'roboto_bold'
    },
    techIcon : {
        width : '64px',
        height : '64px',
        transition: 'background-color 0.35s ease',
        backgroundColor : C(common.contrast).alpha(0).rgba+'',
        borderRadius : '4px',
        '&:hover' : {
            backgroundColor : secondary.main
        },

        '&:active' : {
            backgroundColor : common.active
        },
        
        '@media(max-width:800px)' : {
            width : '48px',
            height : '48px'
        },

        '& polygon, & circle, & path' : {
            fill : `${text.primary} !important`,
            transition: 'fill 0.35s ease'
        },

        '&:hover path, &:hover circle, &:hover polygon' : {
            fill : `${common.white} !important`
        }
    }
}), { name : 'ProjectTechs' });

export default function ProjectTechs({ techSet }) { 
    const classes = useStyles({ techSet });

    return Array.from(techSet).map( (tKey,i,arr) => {
        const { 
            displayName, 
            referenceUrl 
        } = Technologies[tKey];

        return (
            <ButtonLink 
                url={ referenceUrl } 
                containerClass={ classes.techContainer }
                title={ displayName }
                key={ `${displayName}_buttonLinkContainer`}
            >   <SVG 
                    className={ classes.techIcon }
                    src={`/img/techs/${tKey}.svg`}
                />
            </ButtonLink>
        );
    });
}