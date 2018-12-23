import React, { PureComponent } from 'react'
import pure                     from 'recompose/pure'
import injectSheet              from 'react-jss'
import Typography               from '@material-ui/core/Typography'
import AppBar                   from '@material-ui/core/AppBar'
import Toolbar                  from '@material-ui/core/Toolbar'
import styleSheet               from './style/AppHeaderStyle'
import ThemeButton              from './ThemeButton'
import { connect }              from 'react-redux'
import appHistory               from 'utils/appHistory'
import HeaderSectionButton      from './HeaderSectionButton'
import SectionHighlighter       from './SectionHighlighter'
import AppSections              from 'constants/AppSections'
import withFadeTransitions      from 'utils/withFadeTransitions'

let { SectionIndexes, Sections } = AppSections;

// determine what to do when sections are clicked

const SectionClickEvents = Sections.map( section => {
   return  e => appHistory.goTo(section.basePath, e);
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
            toolbar : undefined, 
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
        
        // needed to initially trigger re-grab of 
        // coordinates for dynamic header tabs
        
        this.updateButtonXPositions();
    }

    componentDidUpdate(prevProps, prevState) {
        
        // if the path index changed, re-grab coordinates 
        // of buttons for the section highlighter
        
        if((prevState.pathIndex != this.state.pathIndex) || 
            (this.props.viewportWidth != prevProps.viewportWidth)
        ) {
            this.updateButtonXPositions();
        }
    }

    updateButtonXPositions = ()=> {
        let that = this;
        // (using function syntax for debuggability)
        setTimeout(function updateButtonXPositions() {
            const leftmostButton = that.R.buttonDivRefs[0];
            const buttonWidth = leftmostButton && leftmostButton.offsetWidth;
            const appBar = leftmostButton.parentNode.parentNode;
            const appBarHeight = appBar && appBar.clientHeight;

            // supported in all browsers IE9+
            const leftPadding = window.getComputedStyle(appBar, null)
                                    .getPropertyValue('padding-left');

            that.setState({ 
                buttonXPositions : that.R.buttonDivRefs.map( 
                    b =>( b.offsetLeft + buttonWidth/2 )
                ),
                buttonWidth,
                appBarHeight,
                leftPadding,
            });
        }, 0);  // need a timeout to get around functional 
                //component refs; a bit of hack but this is 
                // all to get around temp JSS glitch with 
                // media queries
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
        switch(pathname) {
            case Sections[0].basePath:  return SectionIndexes.WELCOME;
            case Sections[1].basePath:  return SectionIndexes.PROJECTS;
            case Sections[2].basePath:  return SectionIndexes.MISC;
            case Sections[3].basePath:  return SectionIndexes.CV;
            default :  
                return -1;
        }
    };

    render () {
        const { classes, viewportWidth } = this.props;

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
                <Toolbar className={ classes.toolbar } ref={ c => this.R.toolbar = c }>
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
                        <ThemeButton />
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withFadeTransitions(connect(({ router, viewport }, ownProps) => ({ 
    pathname : router.location.pathname,
    viewportWidth : viewport.viewportWidth
}))(injectSheet(styleSheet)(AppHeader)))