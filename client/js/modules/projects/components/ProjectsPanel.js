import React, { PureComponent } from 'react'
import pure from 'recompose/pure'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import strings from 'strings'
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

        this.R = { projects : [] };
    }
    componentDidUpdate (prevProps, prevState) {
        const { projectIdOfUrl } = this.props;
        const prevProjectIdOfUrl =  prevProps.projectIdOfUrl;

        if(prevProjectIdOfUrl != projectIdOfUrl) {
            const stateUpdates = {
                displayState : PROJECT_FADE_TO
            };
            if(projectIdOfUrl && !prevProjectIdOfUrl) {
                stateUpdates.wasSelectionViaUI = true;
            }

            this.setState(stateUpdates);
        }

        // update state to reflect project selected when detected
        if(!prevProjectIdOfUrl && projectIdOfUrl) {
            wait(50).then(()=> { // wait for half sec and then jump to next phase
                this.setState({ displayState : OFFSET_CALCULATION });
            });
        }

        // project was unselected (user went back or navigated to base route)
        else if(prevProjectIdOfUrl && !projectIdOfUrl) {
            const stateUpdates = {};
            stateUpdates.displayState = VIEW_ALL;
            stateUpdates.wasSelectionViaUI = true;
            this.setState(stateUpdates);
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

        const areAllProjectsOnScreen = (
            projectIdOfUrl && wasSelectionViaUI && 
            displayState != PROJECT_VIEW
        ) || !projectIdOfUrl;

        return (
            <div className={classes.container}>
                <div className={classes.content}>
                    { strings.projects.projectData.map((p)=>
                    {
                        const isSelected = (p.id == projectIdOfUrl);
                        const onScreen = areAllProjectsOnScreen || isSelected;

                        return (
                            <ProjectCard
                                key={ `ProjectCard${p.id}` }
                                data={ p }
                                pData={ projectsData[p.id] }
                                language={ language }
                                onClick={ ()=> appHistory.goTo(`/projects/${p.id}`) }
                                isShown={ (!projectIdOfUrl) || (projectIdOfUrl == p.id) }
                                onScreen={ onScreen }
                                displayState={ displayState }
                                isSelected={ isSelected }
                                theme={ theme } 
                                wasSelectionViaUI={ this.state.wasSelectionViaUI }
                                viewportWidth={viewportWidth}
                            />
                        )
                    })}
                    { typeof projectIdOfUrl != 'undefined' && 
                    (
                        <ProjectDetails projectId={projectIdOfUrl} fadeInDelay={1000} />
                    )}
                </div>
            </div>
        );
    }
}

export default pure(injectSheet(styleSheet)(connect(
    (state, props) => ({ 
        theme          : state.core.theme,
        viewportWidth  : state.core.viewportWidth,
        projectIdOfUrl : projectIdOfUrl(state,props) 
    })
)(ProjectsPanel)));