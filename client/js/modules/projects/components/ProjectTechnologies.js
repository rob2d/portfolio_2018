import React, { memo } from 'react'
import { makeStyles } from '@material-ui/styles'
import Technologies from 'constants/Technologies'
import ButtonLink from 'utils/components/ButtonLink'
import SVG from 'react-inlinesvg'

const useStyles = makeStyles( theme =>({
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
        transition: 'fill 0.35s ease',
        '&:hover' : {
            fill : '#ff4081'
        },

        '&:active' : {
            fill : '#00b8d4'
        },
        
        '@media(max-width:800px)' : {
            width : '48px',
            height : '48px'
        },
    }
}), { name : 'ProjectTechnologies' });

function ProjectTechnologies({ technologySet }) { 
    const classes = useStyles({ technologySet });

    return Array.from(technologySet).map((tKey,i,arr) => {
        const { 
            displayName, 
            referenceUrl 
        } = Technologies[tKey];

        return (
            <ButtonLink 
                url={ referenceUrl } 
                containerClass={ classes.techContainer }
                title={ displayName }
            >   <SVG 
                    className={classes.techIcon}
                    src={`/img/techs/${tKey}.svg`}
                />
            </ButtonLink>
        );
    });
}

export default memo(ProjectTechnologies)