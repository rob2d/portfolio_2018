import React, { Fragment } from 'react'
import injectSheet from 'react-jss'
import Technologies from 'constants/Technologies'
import ButtonLink from 'utils/components/ButtonLink'
import SVG from 'react-inlinesvg'

const styleSheet = {
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
        
        '@media(max-width:800px)' : {
            width : '48px',
            height : '48px'
        },
    }
};

function ProjectTechnologies({ technologySet, classes }) { 
    
    return Array.from(technologySet).map( (tKey,i,arr) => {
        const { 
            displayName, 
            referenceUrl 
        } = Technologies[tKey];

        const bulletPointClass = `${classes.techText} ${
                                    classes.bulletPoint
                                    } mdi mdi-circle-small`;

        return (
            <Fragment>
                <ButtonLink url={ referenceUrl } containerClass={classes.techContainer}>
                    <SVG 
                        className={classes.techIcon}
                        src={`/img/techs/${tKey}.svg`}
                    />
                </ButtonLink>
                {(i < arr.length-1)}
            </Fragment>
        );
    });
}

export default injectSheet(styleSheet)(ProjectTechnologies)