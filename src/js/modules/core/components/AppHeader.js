import React, { PureComponent }     from 'react'
import pure                         from 'recompose/pure'
import injectSheet                  from 'react-jss'
import Typography                   from '@material-ui/core/Typography'
import AppBar                       from '@material-ui/core/AppBar'
import Toolbar                      from '@material-ui/core/Toolbar'
import { menus }                    from 'strings'
import styleSheet                   from './style/AppHeaderStyle'
import LanguageMenu                 from './LanguageMenu'
import { connect }                  from 'react-redux'
import appHistory                   from 'tools/appHistory'
import HeaderSectionButton          from './HeaderSectionButton'
import SectionHighlighter           from './SectionHighlighter'
import AppSections                  from 'constants/AppSections'
import { refreshWindowDimensions }  from './../actions'

let { SectionIndexes, Sections } = AppSections;

const goToHeaderLink = (url)=> (appHistory.goTo(url) );

// determine what to do when sections are clicked
const SectionClickEvents = Sections.map((section, i)=> {
   return ()=>{ goToHeaderLink(section.basePath); };
});

class AppHeader extends PureComponent {
    constructor(props) {
        super(props);

        const pathIndex = this.getVisitedPathIndex(props.pathname);

        this.state = { 
            pathIndex,
            lastMatchedIndex : (pathIndex != -1) ? 
                                    pathIndex : SectionIndexes.PROJECTS
        };

        // stores our references
        this.R = {
            toolbarRef : undefined, 
            buttonDivRefs : [] 
        };
    }

    componentWillUpdate(nextProps, nextState) {
        // can be optimized, but due to time constraint
        // we will always update the visited path index

        let pathIndex = this.getVisitedPathIndex(nextProps.pathname);
        this.setState({ pathIndex, lastMatchedIndex : pathIndex != -1 ? pathIndex : nextState.lastMatchedIndex });
    }

    componentDidMount () {
        // needed to initially trigger re-grab of coordinates for dynamic header tabs
        this.updateButtonXPositions();
        
        // since the AppHeader is the only globally available component
        // down to within the context of redux, use it as an opportunity
        // to hook for update dimensions here
        window.addEventListener('resize', this.onWindowResize);
    }

    componentWillUnmount () {
        // and to unhook here
        window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowResize = ()=> {
        this.props.refreshWindowDimensions();
    };

    componentDidUpdate(prevProps, prevState) {
        // if the path index or viewport width changed, use it as the opportunity
        // to re-grab coordinates of buttons for the section highlighter
        if((prevState.pathIndex != this.state.pathIndex) || (this.props.viewportWidth != prevProps.viewportWidth)) {
            this.updateButtonXPositions();
        }
    }

    updateButtonXPositions = ()=> {
        setTimeout(()=> {
            const leftmostButton = this.R.buttonDivRefs[0];
            const buttonWidth = leftmostButton && leftmostButton.offsetWidth;
            const appBar = document.querySelector("div[class^=MuiToolbar]");            
            const appBarHeight = appBar && appBar.clientHeight;

            // supported in all browsers IE9+
            const leftPadding = window.getComputedStyle(appBar, null)
                                    .getPropertyValue('padding-left');

            this.setState({ 
                buttonXPositions : this.R.buttonDivRefs.map( 
                    b =>( b.offsetLeft + buttonWidth/2 )
                ),
                buttonWidth,
                appBarHeight,
                leftPadding,
            });

        }, 0);  // need a timeout to get around functional component refs; a bit of hack
                // but this is all to get around temp JSS glitch with media queries
    };

    /**
     * returns an index corresponding
     * to the last known path which
     * matches one of the navigation
     * buttons' positions
     * 
     * TODO : NORMALIZE THIS WITH APP SECTION HEADER DATA
     */
    getVisitedPathIndex = (pathname)=> {
        let match = true;
        switch(pathname) {
            case Sections[0].basePath:  return SectionIndexes.WELCOME;
            case Sections[1].basePath:  return SectionIndexes.PROJECTS;
            case Sections[2].basePath:  return SectionIndexes.MISC;
            case Sections[3].basePath:  return SectionIndexes.CV;
            default :  
                match = false; 
                return -1;
        }
    
        return this.lastVisitedPathIndex;
    };

    render () {
        const { 
            classes, 
            viewportWidth 
        } = this.props;

        const { 
            pathIndex, 
            lastMatchedIndex,
            appBarHeight,
            buttonWidth,
            leftPadding,
            buttonXPositions
        } = this.state;

        return (
            <AppBar className={ classes.appBar }>
                <SectionHighlighter 
                        lastKnownIndex={lastMatchedIndex} 
                        index={pathIndex} 
                        viewportWidth={viewportWidth}
                        buttonXPositions={buttonXPositions}
                        leftPadding={leftPadding}
                        buttonWidth={buttonWidth}
                        appBarHeight={appBarHeight} // needed for browser issues
                />
                <Toolbar className={ classes.toolbar } ref={ c => this.R.toolbarRef = c }>
                    <div className={ classes.leftIconsWrapper }>
                        { Sections.map((s, i)=>
                        (
                            <HeaderSectionButton
                                key={ `headerSectionButton${s.name}` }
                                name={ s.name }
                                disabled={ /*pathIndex == i*/ false } // TODO: contribute a fix to 
                                iconClass={ s.iconClass }            // material-ui lib to allow disabling
                                tooltipText={ s.getTooltipText() }   // without ruining click anim
                                onClick={ SectionClickEvents[i] }
                                buttonDivRef={ el => this.R.buttonDivRefs[i]=el } // for the purpose of
                            />                                               // guided tabs
                        ))}
                    </div>
                    <div className={ classes.centerPadder } />
                    <div className={ classes.rightContainer }>
                        <Typography className={`md-maximum ${classes.myNameText}`}>
                            Robert Concepción III
                        </Typography>
                        <LanguageMenu />
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default pure(connect(
    (state,ownProps)=>({ 
        language      : state.core.language,
        pathname      : state.router.location.pathname,
        viewportWidth : state.core.viewportWidth
    }),
    ({ refreshWindowDimensions })
)(injectSheet(styleSheet)(AppHeader)))