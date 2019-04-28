import React, { useRef, useLayoutEffect, useMemo, useState, memo } from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ThemeButton from './ThemeButton'
import { connect } from 'react-redux'
import appHistory from 'utils/appHistory'
import HeaderSectionButton from './HeaderSectionButton'
import SectionHighlighter from './SectionHighlighter'
import AppSections from 'constants/AppSections'
import withFadeTransitions from 'utils/withFadeTransitions'
import { visitedPathIndex } from 'app-root/selectors'
const { SectionIndexes, Sections } = AppSections;

const SECTION_COUNT   = Sections.length,
      BUTTON_WIDTH_PX = 60;

const useStyles = makeStyles( theme => ({
    appBar : {
        position : 'relative',
        minHeight : '56px' // needed to prevent gutters 
    },                     // from resizing
    rightContainer : {
        textAlign : 'right',
        height : '100%',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'flex-end',
        position : 'relative'
    },
    leftIconsWrapper : {
        position : 'relative',
        width : `${SECTION_COUNT * BUTTON_WIDTH_PX}px`,
        height : '100%',
        color : '#FFFFFF',
        justifyContent : 'center',
        alignItems : 'center',
        display : 'flex',
        flexDirection : 'row',
    },
    rightIconsWrapper : {
        textAlign : 'right',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : 'row',
        height : '100%',
        color : '#FFFFFF'
    },
    centerPadder : {
        flex : 1,
        display : 'flex'
    },
    myNameText : {
        textAlign : 'right !important',
        marginRight : '16px !important',
        fontSize : '16pt !important',
        lineHeight : '17pt !important',
        display : 'block',
        color : '#FFF'
    }
}), { name : 'Appheader' });

// determine what to do when sections are clicked

const SectionClickEvents = Sections.map( section => {
   return  e => appHistory.goTo(section.basePath, e);
});

function AppHeader ({ vpW, pathIndex }) {
    const [hasInitialized, setInitialized] = useState(undefined);

    // create a re-render before first paint to consume refs
    // animate section highlighter

    useLayoutEffect(()=> { setInitialized(1) },[]);
    
    const classes = useStyles();
    const buttonRefs = useRef(
        Array(Sections.length).fill(undefined)
    );

    const visualState = useMemo(()=> {
        if(buttonRefs.current && buttonRefs.current[0]) {
            const buttons = buttonRefs.current;
            const buttonWidth = buttons[0] && buttons[0].offsetWidth;
            const appBar = buttons[0].parentNode.parentNode;
            const appBarHeight = appBar && appBar.clientHeight;
            const leftPadding = window.getComputedStyle(appBar, null)
                                    .getPropertyValue('padding-left');
            const xPositions = buttons.map( b => ( 
                b.offsetLeft + buttonWidth / 2 
            ));
    
            return {
                appBarHeight,
                leftPadding,
                xPositions,
                buttonWidth
            };
        } else return {
        }
    }, [vpW, pathIndex, buttonRefs.current && buttonRefs.current[0]]);

    // set of callbacks to set individual refs
    // (to prevent 2x renders in SectionButtons)
    
    const refRetrievers = useMemo(()=> {
        return buttonRefs.current.map((_,i) => 
        el => buttonRefs.current[i]=el, [])
    }, []);

    const { 
        appBarHeight,
        buttonWidth,
        xPositions,
        leftPadding
    } = visualState;

    return (
        <AppBar className={ classes.appBar }>
            <SectionHighlighter 
                sectionIndex={ (pathIndex != -1) ? pathIndex : 1 } 
                isSubsection={ pathIndex == -1 }
                vpW={ vpW }
                buttonXPositions={ xPositions }
                leftPadding={ leftPadding }
                buttonWidth={ buttonWidth }
                appBarHeight={ appBarHeight } // needed for browser issues
            />
            <Toolbar className={ classes.toolbar }>
                <div className={ classes.leftIconsWrapper }>
                    { Sections.map((s, i)=>
                    (
                        <HeaderSectionButton
                            key={ `headerSectionButton${s.name}` }
                            name={ s.name }
                            disabled={ false }  
                            iconClass={ s.iconClass }           
                            tooltipText={ s.getTooltipText() }
                            onClick={ SectionClickEvents[i] }
                            buttonDivRef={ refRetrievers[i] } 
                        /> 
                    ))}
                </div>
                <div className={ classes.centerPadder } />
                <div className={ classes.rightContainer }>
                    <Typography className={ `md-maximum ${classes.myNameText}` }>
                        Robert Concepción III
                    </Typography>
                    <ThemeButton />
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default withFadeTransitions(connect(({ router }) => ({ 
    pathname : router.location.pathname,
    pathIndex : visitedPathIndex({ router })
}))(AppHeader))