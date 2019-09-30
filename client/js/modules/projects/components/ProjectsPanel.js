import React, { PureComponent } from 'react';
import { useSelector } from 'react-redux';
import useViewportSizes from 'use-viewport-sizes';
import { projects } from 'strings';
import { makeStyles } from '@material-ui/styles';
import { appHistory, wait } from 'utils';
import projectsData from 'app-root/data/projectsData';
import ProjectCard from './ProjectCard';
import ProjectDetails from './ProjectDetails';
import { projectIdOfUrl as projectIdSelector } from '../selectors';
import {
    VIEW_ALL,
    PROJECT_FADE_TO,
    OFFSET_CALCULATION,
    AFTER_FADE_POSITIONING,
    PROJECT_SCROLL_UP,
    PROJECT_VIEW
} from '../constants/DisplayStates';

const useStyles = makeStyles(()=> ({
    container : {
        display : 'block',
        position : 'relative',
        flexGrow : 1,
        maxWidth : '1100px',
        margin : '0 auto',
        top : '0px',
        overflowX : 'hidden'
    },
    content : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : 'row',
        flexWrap : 'wrap',
        position : 'relative',
        marginTop : '16px'
    },
    '@media (min-width: 600px)': {
        mainContainer : {
            padding : '32px',
        },
    },
    '@media (max-height: 480px)': {
        mainContainer : {
            paddingTop : '0px'
        }
    },
    emptyCard : {
        display : 'block',
        width : '300px',
        height : '1px',
        padding : '0px 32px'
    }
}), { name : 'ProjectsPanel' });


// TODO : gradually convert the ProjectsPanel class itself 
// to new hooks conventions vs wrapping in a 
// container (started in ProjectsPanel2.js -- don't typically
// do this but short on time and things work as-is)

class ProjectsPanel extends PureComponent {
    constructor(props) {
        super(props);
        const { projectIdOfUrl } = props;

        this.state = {
            displayState : !projectIdOfUrl ? VIEW_ALL : PROJECT_VIEW,
            wasSelectionViaUI : false
        };
    }
    componentDidUpdate (prevProps) {
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
                        this.setState({ displayState : AFTER_FADE_POSITIONING });
                    });
                    break;
                
                case AFTER_FADE_POSITIONING : 
                    wait(200).then(()=>{
                        window.scrollTo(0,0); 
                        this.setState({ displayState : PROJECT_SCROLL_UP });
                    });
                    break;

                case PROJECT_SCROLL_UP :
                    wait(50).then(()=>{ 
                    this.setState({ displayState : PROJECT_VIEW });                    
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
            vpW, location, match 
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
            <div className={ classes.container }>
                <div className={ classes.content }>
                    { projects.projectData.map( p => (
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
                            wasSelectionViaUI={ wasSelectionViaUI }
                            vpW={ vpW }
                        />
                    )) }
                    { typeof projectIdOfUrl != 'undefined' && 
                    (
                        <ProjectDetails 
                            projectId={ projectIdOfUrl } 
                            fadeInDelay={ 1000 }
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default function ProjectsPanelContainer({ match }) {
    const [vpW, vpH] = useViewportSizes();
    const projectIdOfUrl = useSelector(projectIdSelector); 
    const location = useSelector( state => state.router.location );
    const classes = useStyles();   

    return (
        <ProjectsPanel 
            vpW={ vpW } 
            projectIdOfUrl={ projectIdOfUrl }
            classes={ classes }
            location={ location }
            match={ match }
        />
    );
}