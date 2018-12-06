import React, { PureComponent } from 'react'
import pure from 'recompose/pure'
import { connect } from 'react-redux'
import appHistory from 'utils/appHistory'
import wait from 'utils/wait'
import strings from 'strings'
import projectsData from 'app-root/data/projectsData'
import styleSheet from './style/ProjectsPanelStyle'
import injectSheet from 'react-jss'
import ProjectCard from './ProjectCard'
import ProjectDetails from './ProjectDetails'
import {
    VIEW_ALL,
    PROJECT_FADE_TO,
    OFFSET_CALCULATION,
    AFTER_FADE_POSITIONING,
    PROJECT_SCROLL_UP,
    PROJECT_VIEW
} from './../constants/DisplayStates'

const SECTION_ROOT = '/projects';

/**
 * retrieve the project id given a specific
 * location passed by Redux Router to Component.
 * If root section, returns undefined
 * @param loc
 */
const getProjectIdAt = (location)=>(
    !(location.pathname == SECTION_ROOT || location.pathname == '/') ?
        location.pathname.substr(SECTION_ROOT.length+1) : undefined
);

class ProjectsPanel extends PureComponent {
    constructor(props) {
        super(props);

        const isAtProjectURL = (typeof getProjectIdAt(props.location) != 'undefined');

        this.state = {
            displayState    : (!isAtProjectURL ? VIEW_ALL : PROJECT_VIEW),
            selectedProjectId : getProjectIdAt(props.location),
            // if a user bookmarks a page and visits a project via that method,
            // this variable will help us figure out whether to transition or not
            wasSelectionViaUI  : false,
            visitedViaRootPath : !isAtProjectURL
        };

        this.R = { projects : [] };
    }
    componentDidUpdate (prevProps, prevState) {
        const prevSelectedProjectId =  getProjectIdAt(prevProps.location);
        const selectedProjectId = getProjectIdAt(this.props.location);
        const { visitedViaRootPath } = this.state;

        if(selectedProjectId != this.state.selectedProjectId) {
            const stateUpdates = {
                selectedProjectId, 
                displayState : PROJECT_FADE_TO
            };
            if(selectedProjectId && !prevProps.isAtProjectURL) {
                stateUpdates.wasSelectionViaUI = true;
            }

            this.setState(stateUpdates);
        }

        // update state to reflect project selected when detected
        if(!prevSelectedProjectId && selectedProjectId) {
            wait(50).then(()=> { // wait for half sec and then jump to next phase
                this.setState({ displayState : OFFSET_CALCULATION });
            });
        }
        else if(prevSelectedProjectId && !selectedProjectId) {
            const stateUpdates = {};
            stateUpdates.displayState = VIEW_ALL;
            stateUpdates.wasSelectionViaUI = true;
            this.setState(stateUpdates);
        }
        else { // project selection has not changed

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
            language,
            theme, 
            classes, 
            viewportWidth,
            location, 
            match 
        } = this.props;

        const { 
            selectedProjectId, 
            displayState, 
            wasSelectionViaUI 
        } = this.state;

        this.R.projects = [];   //reset projects currently in references

        const areAllProjectsOnScreen = (
            (typeof selectedProjectId != 'undefined' &&             // selection made &&
                wasSelectionViaUI && displayState != PROJECT_VIEW) // not via UI & projectSelected
        ) || (typeof selectedProjectId == 'undefined');

        return (
            <div className={classes.container}>
                <div className={classes.content}>
                    { strings.projects.projectData.map((p)=>
                    {
                        const isSelected = (p.id == selectedProjectId);
                        const onScreen = areAllProjectsOnScreen || isSelected;

                        return (
                            <ProjectCard
                                ref={ (c) => this.R.projects[p.id] = c }
                                key={ `ProjectCard${p.id}` }
                                data={ p }
                                pData={ projectsData[p.id] }
                                language={ language }
                                onClick={ ()=> appHistory.goTo(`/projects/${p.id}`) }
                                isShown={ (!selectedProjectId) || (selectedProjectId == p.id) }
                                onScreen={ onScreen }
                                displayState={ displayState }
                                isSelected={ isSelected }
                                theme={ theme } 
                                wasSelectionViaUI={ this.state.wasSelectionViaUI }
                                viewportWidth={viewportWidth}
                            />
                        )
                    })}
                    { typeof selectedProjectId != 'undefined' && 
                    (
                        <ProjectDetails projectId={selectedProjectId} fadeInDelay={1000} />
                    )}
                </div>
            </div>
        );
    }
}

export default pure(injectSheet(styleSheet)(connect(
    ({ core })=> ({ 
        theme         : core.theme,
        viewportWidth : core.viewportWidth 
    })
)(ProjectsPanel)));