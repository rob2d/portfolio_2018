import React, { Fragment } from 'react'
import injectSheet from 'react-jss'
import Technologies from 'constants/Technologies'
import ButtonLink from 'tools/components/ButtonLink'

const styleSheet = {
    techContainer : {
        margin   : '0px 8px',
        
        '&:hover $techText' : {
            color : '#ff4081'
        },
        '&:active $techText' : {
            color : '#00b8d4'
        },
        '&:nth-of-type(1)' : {
            marginLeft : '0px !important'
        },
        '&:last-of-type' : {
            marginRight : '0px !important'
        },

        '@media(max-width:800px)' : {
            margin : '0px 4px'
        },
        '@media(max-width:400px)' : {
            margin : '0px 0px !important'
        }
    },
    techText : {
        fontSize   : '12pt',
        fontFamily : 'roboto_bold'
    },
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
                    <span className={classes.techText}>{ displayName }</span>
                </ButtonLink>
                {(i < arr.length-1) && <span><i className={bulletPointClass} /></span> }
            </Fragment>
        );
    });
}

export default injectSheet(styleSheet)(ProjectTechnologies)