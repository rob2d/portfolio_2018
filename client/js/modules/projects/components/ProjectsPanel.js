import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { projects } from 'strings'
import appHistory from 'utils/appHistory'
import wait from 'utils/wait'
import projectsData from 'app-root/data/projectsData'
import styleSheet from './style/ProjectsPanelStyle'
import ProjectCard from './ProjectCard'
import ProjectDetails from './ProjectDetails'
import { projectIdOfUrl } from './../selectors'
import {
    VIEW_ALL,
    PROJECT_FADE_TO,
    OFFSET_CALCULATION,
    AFTER_FADE_POSITIONING,
    PROJECT_SCROLL_UP,
    PROJECT_VIEW
} from './../constants/DisplayStates'

const SECTION_ROOT = '/projects';

class ProjectsPanel extends PureComponent {
    constructor(props) {
        super(props);
        const { projectIdOfUrl } = props;

        this.state = {
            displayState : !projectIdOfUrl ? VIEW_ALL : PROJECT_VIEW,
            wasSelectionViaUI : false
        };
    }
    componentDidUpdate (prevProps, prevState) {
        const { projectIdOfUrl } = this.props;
        const prevProjectIdOfUrl =  prevProps.projectIdOfUrl;

        let stateUpdates = {};

        if(projectIdOfUrl && prevProjectIdOfUrl != projectIdOfUrl) {
            stateUpdates.displayState = PROJECT_FADE_TO;

            if(projectIdOfUrl && !prevProjectIdOfUrl) {
                stateUpdates.wasSelectionViaUI = true;
            }
        }

        // update state to reflect project selected when detected
        if(!prevProjectIdOfUrl && projectIdOfUrl) {
            wait(50).then(()=> { // wait for half sec and then jump to next phase
                this.setState({ displayState : OFFSET_CALCULATION });
            });
        }

        // project was unselected (user went back or navigated to base route)
        else if(prevProjectIdOfUrl && !projectIdOfUrl) {
            stateUpdates.displayState = VIEW_ALL;
            stateUpdates.wasSelectionViaUI = true;
        }
        
        // project selection has not changed
        else {     

            switch(this.state.displayState) {
                case OFFSET_CALCULATION : 
                    wait(200).then(()=>{
                        this.setState({
                            displayState : AFTER_FADE_POSITIONING
                        });
                    });
                    break;
                
                case AFTER_FADE_POSITIONING : 
                    wait(200).then(()=>{
                        window.scrollTo(0,0); 
                        this.setState({
                            displayState : PROJECT_SCROLL_UP
                        });
                    });
                    break;

                case PROJECT_SCROLL_UP :
                    wait(50).then(()=>{ 
                    this.setState({ 
                            displayState : PROJECT_VIEW 
                        });                    
                    });
                    break;
            }
        }

        if(Object.keys(stateUpdates).length) {
            this.setState(stateUpdates);
        }
    }
    render () {
        const { 
            projectIdOfUrl, language, theme, classes, 
            viewportWidth, location, match 
        } = this.props;

        const { 
            displayState, 
            wasSelectionViaUI 
        } = this.state;

        const areAllShown = (
            projectIdOfUrl && wasSelectionViaUI && 
            displayState != PROJECT_VIEW
        ) || !projectIdOfUrl;

        return (
            <div className={classes.container}>
                <div className={classes.content}>
                    { projects.projectData.map( p => 
                    (
                        <ProjectCard
                            key={ `ProjectCard${p.id}` }
                            data={ p }
                            pData={ projectsData[p.id] }
                            language={ language }
                            onClick={ e => appHistory.goTo(`/projects/${p.id}`, e) }
                            isShown={ (!projectIdOfUrl) || (projectIdOfUrl == p.id) }
                            onScreen={ areAllShown || (p.id == projectIdOfUrl) }
                            displayState={ displayState }
                            isSelected={ (p.id == projectIdOfUrl) }
                            theme={ theme } 
                            wasSelectionViaUI={ this.state.wasSelectionViaUI }
                            viewportWidth={viewportWidth}
                        />
                    ))}
                    {/* if we have a large viewport, fill in the space so
                        that we don't get oddly centered cards on the bottom
                    */}
                    {!projectIdOfUrl && (viewportWidth > 1108) && (
                        <div className={classes.emptyCard} />
                    )}
                    { typeof projectIdOfUrl != 'undefined' && 
                    (
                        <ProjectDetails projectId={projectIdOfUrl} fadeInDelay={1000} />
                    )}
                </div>
            </div>
        );
    }
}

export default injectSheet(styleSheet)(connect(
    (state, props) => ({ 
        theme          : state.core.theme,
        viewportWidth  : state.viewport.viewportWidth,
        projectIdOfUrl : projectIdOfUrl(state,props) 
    })
)(ProjectsPanel));