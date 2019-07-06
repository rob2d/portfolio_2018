import React, { memo } from 'react'
import { makeStyles } from '@material-ui/styles'
import Technologies from 'constants/Technologies'
import ButtonLink from 'utils/components/ButtonLink'
import SVG from 'react-inlinesvg'

const useStyles = makeStyles(({ palette, rc3 }) =>({
    techContainer : {
        margin : '4px',
        
        '&:hover $techText' : {
            color : '#ff4081'
        },
        '&:active $techText' : {
            color : '#00b8d4'
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
        backgroundColor : 'rgba(255,255,255,0)',
        '&:hover' : {
            backgroundColor : '#ff4081'
        },

        '&:active' : {
            backgroundColor : '#00b8d4'
        },
        
        '@media(max-width:800px)' : {
            width : '48px',
            height : '48px'
        },

        '& polygon, & circle, & path' : {
            fill : `${rc3.text} !important`,
            transition: 'fill 0.35s ease'
        },

        '&:hover path, &:hover circle, &:hover polygon' : {
            fill : '#fff !important'
        }
    }
}), { name : 'ProjectTechnologies' });

function ProjectTechnologies({ technologySet }) { 
    const classes = useStyles({ technologySet });

    return Array.from(technologySet).map( (tKey,i,arr) => {
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

export default memo(ProjectTechnologies)