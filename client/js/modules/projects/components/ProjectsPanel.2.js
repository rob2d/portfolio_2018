import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/styles'
import wait from 'utils/wait'
import appHistory from 'utils/appHistory'
import projectsData from 'app-root/data/projectsData'
import { projects } from 'strings'
import ProjectCard from './ProjectCard'
import ProjectDetails from './ProjectDetails'
import { projectIdOfUrl } from '../selectors'
import {
    VIEW_ALL,
    PROJECT_FADE_TO,
    OFFSET_CALCULATION,
    AFTER_FADE_POSITIONING,
    PROJECT_SCROLL_UP,
    PROJECT_VIEW
} from '../constants/DisplayStates'
import usePrevious from 'utils/hooks/usePrevious'
import useViewportSizes from 'use-viewport-sizes'

const useStyles = makeStyles( theme => ({
    container : {
        display        : 'block',
        position       : 'relative',
        flexGrow       : 1,
        maxWidth       : '1100px',
        margin         : '0 auto',
        top            : '0px',
        overflowX      : 'hidden'
    },
    content : {
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center',
        flexDirection  : 'row',
        flexWrap       : 'wrap',
        position       : 'relative',
        marginTop      : '16px'
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
        width   : '300px',
        height  : '1px',
        padding : '0px 32px'
    }
}), { name : 'ProjectsPanel' });

function ProjectsPanel ({ projectIdOfUrl }) {
    const [vpW, vpH] = useViewportSizes();
    const classes = useStyles();
    const theme = useTheme();
    const prevProjectIdOfUrl = usePrevious(projectIdOfUrl);
    const [ state, setState ] = useState(()=>({
        displayState :  !projectIdOfUrl ? VIEW_ALL : PROJECT_VIEW,
        wasSelectionViaUI : false
    }));

    useEffect(()=> {
        const updates = {};
        if(projectIdOfUrl && projectIdOfUrl != prevProjectIdOfUrl) {
            updates.displayState = PROJECT_FADE_TO;
            if(!prevProjectIdOfUrl) {
                updates.wasSelectionViaUI = true;
            }
        }
        
        // update state to reflect project selected when detected
        if(projectIdOfUrl && !prevProjectIdOfUrl) {
            wait(50).then(()=> {
                setState({ ...state, displayState : OFFSET_CALCULATION });
            });
        }

        else if(!projectIdOfUrl && prevProjectIdOfUrl) {
            updates.displayState = VIEW_ALL;
            updates.wasSelectionViaUI = true;
        }

        // project selection has not changed
        else {
            switch(state.displayState) {
                case OFFSET_CALCULATION : 
                    wait(200).then(()=> 
                        setState({ displayState : AFTER_FADE_POSITIONING })
                    );
                    break;
                case AFTER_FADE_POSITIONING : 
                    wait(200).then(()=>{
                        window.scrollTo(0,0); 
                        setState({ displayState : PROJECT_SCROLL_UP });
                    });
                    break;
                case PROJECT_SCROLL_UP :
                    wait(50).then(()=>{ 
                        setState({ displayState : PROJECT_VIEW });                    
                    });
                    break;
            }
        }

        if(Object.keys(updates).length){ 
            setState(updates); 
        }
    }, [projectIdOfUrl, state])

    const { 
        displayState, 
        wasSelectionViaUI 
    } = state;

    const areAllShown = (
        projectIdOfUrl && wasSelectionViaUI && 
        displayState != PROJECT_VIEW
    ) || !projectIdOfUrl;

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                { projects.projectData.map( p => 
                ( <ProjectCard
                        key={ `ProjectCard${p.id}` }
                        data={ p }
                        pData={ projectsData[p.id] }
                        onClick={ e => appHistory.goTo(`/projects/${p.id}`, e) }
                        isShown={ (!projectIdOfUrl) || (projectIdOfUrl == p.id) }
                        onScreen={ areAllShown || (p.id == projectIdOfUrl) }
                        displayState={ displayState }
                        isSelected={ (p.id == projectIdOfUrl) }
                        wasSelectionViaUI={ state.wasSelectionViaUI }
                        vpW={vpW}
                  />)
                )}
                {/* if we have a large viewport, fill in the space so
                    that we don't get oddly centered cards on the bottom
                */}
                {!projectIdOfUrl && (vpW > 1108) && (
                    <div className={classes.emptyCard} />
                )}
                { typeof projectIdOfUrl != 'undefined' && (
                    <ProjectDetails 
                        projectId={projectIdOfUrl} 
                        fadeInDelay={1000} 
                    />
                )}
            </div>
        </div>
    );
}

export default connect((state, props) => ({ 
    projectIdOfUrl : projectIdOfUrl(state, props) 
}))(ProjectsPanel);