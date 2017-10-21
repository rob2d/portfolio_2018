import React, { PureComponent } from 'react'
import pure                     from 'recompose/pure'
import injectSheet              from 'react-jss'
import Typography               from 'material-ui/Typography'
import AppBar                   from 'material-ui/AppBar'
import Toolbar                  from 'material-ui/Toolbar'
import {menus}                  from 'strings'
import styleSheet               from './style/AppHeaderStyle'
import LanguageSelectionMenu    from './LanguageSelectionMenu'
import { connect }              from 'react-redux'
import appHistory               from 'tools/appHistory'
import HeaderSectionButton      from './HeaderSectionButton'
import SectionHighlighter       from './SectionHighlighter'
import { refreshWindowDimensions } from './../actions'

// TODO : normalize/centralize pathname lookup

const goToHeaderLink = (url)=> (appHistory.goTo(url) );
const Sections =
[
    {
        name        : 'about',
        iconClass   : 'mdi mdi-human-greeting',
        tooltipText : menus.main.about,
        onClick     : ()=>( goToHeaderLink('/') ),
        basePath     : '/about'
    },
    {
        name        : 'projects',
        iconClass   : 'mdi mdi-briefcase',
        tooltipText : menus.main.projects,
        onClick     : ()=>( goToHeaderLink('/projects') ),
        basePath     : '/projects'
    },
    {
        name         : 'cv',
        iconClass    : 'mdi mdi-file-document-box',
        tooltipText  : menus.main.cv,
        onClick      : ()=>( goToHeaderLink('/cv') ),
        basePath     : '/cv'
    }
];

class AppHeader extends PureComponent {
    constructor(props) {
        super(props);

        const pathIndex = this.getVisitedPathIndex(props.pathname);

        this.state = { 
            pathIndex,
            lastMatchedIndex : pathIndex != -1 ? pathIndex : 0
        };

        // stores our references
        this.R = {
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
        console.log('refreshing window dimensions');
        console.log('this.props ->', this.props);
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
            const sampleButton = this.R.buttonDivRefs[0];
            const buttonWidth = sampleButton && sampleButton.offsetWidth;
            const buttonTopOffset = sampleButton && sampleButton.offsetTop;
            this.setState({ 
                buttonXPositions : this.R.buttonDivRefs.map((b)=>(b.offsetLeft + buttonWidth/2)),
                buttonWidth,
                buttonTopOffset 
            });
        }, 0);  // need a timeout to get around functional component refs; a bit of hack
                // but this is all to get around temp JSS glitch with media queries
    };

    /**
     * returns an index corresponding
     * to the last known path which
     * matches one of the navigation
     * buttons' positions
     */
    getVisitedPathIndex = (pathname)=> {
        let match = true;
        switch(pathname) {
            case '/':
                return 0;
            case '/projects':
                return 1;
            case '/cv':
                return 2;
            default : 
                match = false;
                return -1;
        }
    
        return this.lastVisitedPathIndex;
    };

    render () {
        const { classes, viewportWidth } = this.props;
        const { pathIndex, lastMatchedIndex } = this.state;

        return (
            <AppBar className={ classes.appBar }>
                <Toolbar className={ classes.toolbar }>
                    <div className={ classes.leftIconsWrapper }>
                        { Sections.map((s, i)=>
                        (
                            <HeaderSectionButton
                                key={ `headerSectionButton${s.name}` }
                                name={ s.name }
                                disabled={ /*pathIndex == i*/ false } // TODO: contribute a fix to 
                                iconClass={ s.iconClass }       // material-ui lib to allow disabling
                                tooltipText={ s.tooltipText }   // without ruining click anim
                                onClick={ s.onClick }
                                buttonDivRef={ el => this.R.buttonDivRefs[i]=el } // for the purpose of
                            />                                               // guided tabs
                        ))}
                        <SectionHighlighter 
                            lastKnownIndex={lastMatchedIndex} 
                            index={pathIndex} 
                            viewportWidth={viewportWidth}
                            buttonXPositions={this.state.buttonXPositions}
                            buttonWidth={this.state.buttonWidth}
                            buttonTopOffset={this.state.buttonTopOffset} // needed for browser issues
                        />
                    </div>
                    <div className={ classes.centerPadder } />
                    <div className={ classes.rightContainer }>
                        <Typography className={`md-maximum ${classes.myNameText}`}>
                            Robert Concepción III
                        </Typography>
                        <LanguageSelectionMenu />
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default pure(connect(
    (state,ownProps)=>({ 
        language : state.core.language,
        pathname : state.router.location.pathname,
        viewportWidth : state.core.viewportWidth
    }),
    ({ refreshWindowDimensions })
)(injectSheet(styleSheet)(AppHeader)))