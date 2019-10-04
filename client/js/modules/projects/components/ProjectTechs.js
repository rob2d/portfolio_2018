import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Technologies from 'constants/Technologies';
import ButtonLink from 'utils/components/ButtonLink';
import SVG from 'react-inlinesvg';
import C from 'color';

const useStyles = makeStyles(({ palette : { secondary, text, common } }) => ({
    techContainer : {
        margin : '4px',
        '& *' : {
            fill : `${text.primary} !important`,
            stroke : `${text.primary} !important`,
            transition: 'background-color 0.35s ease'  
        },
        '&:hover *' : {
            fill : `${common.white} !important`,
            stroke : `${common.white} !important`
        },
        '&:hover $techIcon' : {
            backgroundColor : secondary.main,
        },
        '&:active $techIcon' : {
            backgroundColor : common.active
        }
    },
    techIcon : {
        width : '64px',
        height : '64px',
        borderRadius : '4px',
        backgroundColor : C(common.contrast).alpha(0).rgb()+'',
        '@media(max-width:800px)' : {
            width : '48px',
            height : '48px'
        }
    }
}), { name : 'ProjectTechs' });

export default function ProjectTechs({ techSet }) { 
    const classes = useStyles({ techSet });

    return Array.from(techSet).map((tKey,i,arr) => {
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