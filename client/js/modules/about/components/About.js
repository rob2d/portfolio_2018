import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import isPortrait  from 'utils/isPortrait';
import DescriptiveText from './DescriptiveText';
import SectionLinks from './SectionLinks';
//import SkillsOrbit from './SkillsOrbit.1';
import useViewportSizes from 'use-viewport-sizes';


const useStyles = makeStyles( theme => ({
    mainContainer : {
        marginLeft : 'auto',
        marginRight : 'auto',
        maxWidth : '700px',
        flexGrow : 1,
        display : 'flex',
        flexDirection  : 'column',
        justifyContent : 'center',
        padding : ({ vpW, vpH }) => (
            !isPortrait(vpW, vpH) ? '0px 16px' : '16px'
        ),
        alignItems : 'center',
        boxSizing : 'border-box' // for padding in landscape
    },

    firstContainer : {
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-evenly',
        width : '100%'
    },

    topContent : {
        width : ({ vpW })=> (vpW<=420) ? '100%' : '100%',
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        justifyContent : 'space-between'
    },

    pText : {
        paddingLeft : '16px',
        paddingRight : '16px',
        paddingTop : '0px',
        paddingBottom : '0px',
        textAlign : 'left',
        fontSize : '12pt',
        fontFamily : 'roboto_light',
        lineHeight : '1.3rem',
        letterSpacing : '0.01rem',
        color : theme.rc3.text
    },
    avatar : {
        width  : '128px',
        height : '128px',
        margin : '32px'
    },
    skillsOrbit : {
        display : 'none',
        position : 'relative',
        width : '30vh',
        height : '30vh'
    },
    // don't want the avatar to dominate the mobile screen:   
    ['@media (max-width: 700px) and (min-width : 341px) ' + 
    'and (orientation:portrait)']: {        
        avatar : {
            margin : '24px auto 16px',
            width : '116px',
            height : '116px'
        }
    },       
    // accomodations for micro phones like iP5    
    '@media (max-width: 340px) and (orientation:portrait)': {
        avatar : {
            margin : '16px auto 8px',
            width : '80px',
            height : '80px'
        }
    },
    '@media (orientation:landscape)': {
        avatar : {
            margin : '16px 16px 8px'
        },
        mainContainer : {
            padding : '16px',
            boxSizing : 'border-box'
        }
    },
    // for general mobile devices in landscape
    '@media (orientation:landscape) and (max-width:900px)': {
        avatar : {
            margin : '24px 8px',
            width : '80px',
            height : '80px',
        },
        pText : {
            fontSize : '11pt'
        }
    },
    // again, for iPhone5
    '@media (orientation:landscape) and (max-height:320px)': {
        pText : {
            marginTop : '8px',
            marginBottom : '8px'
        }
    },
    // make certain things larger on non-mobile devices
    '@media (min-width:901px)' : {
        avatar : {
            width : '120px',
            height : '120px'
        },
        mainContainer : {
            justifyContent : 'space-evenly',
            maxWidth : '1280px'
        },
        pText : {
            paddingLeft  : '32px',
            paddingRight : '32px',
            fontSize : '14pt',
            fontFamily : 'roboto_light'
        },
        centerContent : {
            display : 'flex',
            flexDirection : 'column', 
            overflowY : 'auto',
            zIndex : 5000
        },
        skillsOrbit : {
            display : 'none',
            flexDirection : 'column',
            overflowY : 'auto',
            flexGrow : 0,
            width : '30vh',
            height : '30vh'
        }
    },
    tech : {
        display : 'inline-block',
        fontFamily : 'roboto_regular',
        color : theme.rc3.text,
        verticalAlign : 'top',
        fontSize : '12pt',
        '@media (min-width:901px)' : {
            fontSize : '14pt'
        },
        // for general mobile devices in landscape
        '@media (orientation:landscape) and (max-width:900px)' : {
            fontSize : '11pt'
        }
    }
}), { name : 'About' });

export default function About ({ theme }) {
    const [ vpW, vpH ] = useViewportSizes();


    // check renderpixels on viewport for (general)
    // coverage of landscape; covers iPhone6-X
    // and most android devices

    const linkProps = useMemo(()=>({ vpW, vpH }), [vpW, vpH]);

    const inPortrait = useMemo(()=>
        isPortrait(vpW, vpH), 
        [vpW, vpH]
    );

    const classes = useStyles({ vpW, vpH, theme, inPortrait });
    const techProps = useMemo(()=>(
        { containerClass : classes.tech }
    ), [ classes.tech ]);

    return (
        <div className={ classes.mainContainer }>
            <div className={ classes.firstContainer } >
                <div className={ classes.topContent }>
                    <Avatar 
                        alt={ 'Rob' } 
                        src="img/about/me.jpg" 
                        className={ classes.avatar } 
                    />
                    <SectionLinks { ...linkProps } />
                </div>
            </div>

            <div className={ classes.centerContent }>
                <DescriptiveText 
                    techProps={ techProps } 
                    pClass={ classes.pText } 
                />
            </div>
        </div>
    );
};