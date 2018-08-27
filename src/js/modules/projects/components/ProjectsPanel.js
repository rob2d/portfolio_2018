import React, { PureComponent } from 'react'
import pure from 'recompose/pure'
import { connect } from 'react-redux'
import appHistory    from 'tools/appHistory'
import strings from 'strings'
import projectsData from 'app-root/data/projectsData'
import styleSheet from './style/ProjectsPanelStyle'
import { withStyles } from '@material-ui/core/styles'
import ProjectCard from './ProjectCard'
import ProjectDetails from './ProjectDetails'

export const DisplayStates =
{
    VIEW_ALL_PROJECTS          : 'DisplayStates.VIEW_ALL_PROJECTS',
    PROJECT_FADE_TO            : 'DisplayStates.PROJECT_FADE_TO',
    PROJECT_OFFSET_CALCULATION : 'DisplayStates.PROJECT_OFFSET_CALCULATION',
    AFTER_FADE_POSITIONING     : 'DisplayStates.AFTER_FADE_POSITIONING',
    PROJECT_SCROLL_TO_TOP      : 'DisplayStates.PROJECT_SCROLL_TO_TOP',
    PROJECT_VIEW               : 'DisplayStates.PROJECT_VIEW'
};

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

const wait = (time)=>
{
    return new Promise((resolve,reject)=> {
        setTimeout(()=>resolve(), time);
    });
};

class ProjectsPanel extends PureComponent {
    constructor(props) {
        super(props);

        const isAtProjectURL = (typeof getProjectIdAt(props.location) != 'undefined');
        const { VIEW_ALL_PROJECTS, PROJECT_VIEW } = DisplayStates;

        this.state = {
            displayState    : (!isAtProjectURL ? VIEW_ALL_PROJECTS : PROJECT_VIEW),
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
                displayState : DisplayStates.PROJECT_FADE_TO
            };
            if(selectedProjectId && !prevProps.isAtProjectURL) {
                stateUpdates.wasSelectionViaUI = true;
            }

            this.setState(stateUpdates);
        }

        // update state to reflect project selected when detected
        if(!prevSelectedProjectId && selectedProjectId) {
            wait(50).then(()=> { // wait for half sec and then jump to next phase
                this.setState({ displayState : DisplayStates.PROJECT_OFFSET_CALCULATION });
            });
        }else if(prevSelectedProjectId && !selectedProjectId) {
            this.setState({ displayState : DisplayStates.VIEW_ALL_PROJECTS });
        }else { // project selection has not changed

            if(this.state.displayState == DisplayStates.PROJECT_OFFSET_CALCULATION) {
                wait(200).then(()=>this.setState({
                    displayState : DisplayStates.AFTER_FADE_POSITIONING
                }))
            }
            if(this.state.displayState == DisplayStates.AFTER_FADE_POSITIONING) {
                wait(200).then(()=>{
                    window.scrollTo(0,0); 
                    this.setState({
                        displayState : DisplayStates.PROJECT_SCROLL_TO_TOP
                    })
                });
            }

            if(this.state.displayState == DisplayStates.PROJECT_SCROLL_TO_TOP) {
                wait(50).then(()=>{ 
                    this.setState({ displayState : DisplayStates.PROJECT_VIEW })                    
                });
            }
        }
    }
    render () {
        const { language, classes, location, match } = this.props;
        const { selectedProjectId, displayState, wasSelectionViaUI } = this.state;
        const  { PROJECT_VIEW } = DisplayStates;

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
                                wasSelectionViaUI={ this.state.wasSelectionViaUI }
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

const VisibleProjectsPanel = pure(withStyles(styleSheet)(connect(
    (state,ownProps)=> ({ language : state.core.language }), null
)(ProjectsPanel)));

export default VisibleProjectsPanel