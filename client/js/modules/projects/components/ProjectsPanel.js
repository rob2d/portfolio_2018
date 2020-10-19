import React, { useMemo, useEffect, useReducer } from 'react';
import clsx from 'clsx';
import useViewportSizes from 'use-viewport-sizes';
import { makeStyles } from '@material-ui/core/styles';
import { appHistory, wait } from 'utils';
import { useAutoFaderClass, useDocumentTitle, usePrevious } from 'utils/hooks';
import * as projects from 'app-root/data/projects';
import projectOrder from 'constants/projectOrder';
import ProjectCard from './ProjectCard';
import ProjectDetails from './ProjectDetails';
import {
    VIEW_ALL,
    PROJECT_FADE_TO,
    OFFSET_CALC,
    AFTER_FADE_POSITIONING,
    PROJECT_SCROLL_UP,
    PROJECT_VIEW
} from '../constants/DisplayStates';
import useProjectIdOfUrl from '../hooks/useProjectIdOfUrl';

const orderedProjects = projectOrder.map( id => projects[id] );

const useStyles = makeStyles(() => ({
    container: {
        display: 'block',
        position: 'relative',
        flexGrow: 1,
        maxWidth: '1100px',
        margin: '0 auto',
        top: '0px',
        overflowX: 'hidden'
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'relative',
        marginTop: '16px'
    },
    '@media (min-width: 600px)': {
        mainContainer: {
            padding: '32px',
        },
    },
    '@media (max-height: 480px)': {
        mainContainer: {
            paddingTop: '0px'
        }
    },
    emptyCard: {
        display: 'block',
        width: '300px',
        height: '1px',
        padding: '0px 32px'
    }
}), { name: 'ProjectsPanel' });

const nextStateDict = {
    [VIEW_ALL]: OFFSET_CALC,
    [OFFSET_CALC]: AFTER_FADE_POSITIONING,
    [AFTER_FADE_POSITIONING]: PROJECT_SCROLL_UP,
    [PROJECT_SCROLL_UP]: PROJECT_VIEW
};

const transitionTimes = {
    [VIEW_ALL]: 50,
    [OFFSET_CALC]: 25,
    [AFTER_FADE_POSITIONING]: 0,
    [PROJECT_SCROLL_UP]: 100
};

const projectsReducer = (state, { type, payload }) => {
    switch (type) {
        case 'selectProjectViaUI':
            return {
                ...state,
                wasSelectionViaUI: true,
                // begins transitions
                displayState: nextStateDict[state.displayState] || state.displayState
            };
        case 'advanceDisplayState': {
            return {
                ...state,
                displayState: nextStateDict[state.displayState]
            };
        }
        case 'viewAllProjects': {
            return {
                ...state,
                displayState: VIEW_ALL,
                wasSelectionViaUI: false
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default function ProjectsPanel() {
    const [projectId, location, match] = useProjectIdOfUrl();
    const prevProjectId = usePrevious(projectId);
    useDocumentTitle({ title: !projectId && `${SITE_NAME} -- Projects` });

    const [vpW, vpH] = useViewportSizes();
    const classes = useStyles();
    const fadeContainerClass = useAutoFaderClass();

    const initialState = useMemo(() => ({
        displayState: !projectId ? VIEW_ALL: PROJECT_VIEW,
        wasSelectionViaUI: false
    }), []);

    const [state, dispatch] = useReducer(projectsReducer, initialState);
    const { wasSelectionViaUI, displayState } = state;

    const areAllShown = (
        projectId && wasSelectionViaUI && (displayState != PROJECT_VIEW)
    ) || !projectId;

    const projectSelectionCbs = useMemo(() => Object.fromEntries(
        projectOrder.map( id =>
            [id, e => {
                appHistory.goTo(`/projects/${id}`, e);
                dispatch({ type: 'selectProjectViaUI', payload: id });
            }]
        )),
    []);

    useEffect(() => {
        if(!prevProjectId && projectId && !wasSelectionViaUI) {
            dispatch({ type: 'selectProjectViaUI' });
        }
        else if(!projectId) {
            dispatch({ type: 'viewAllProjects' });
        }

        if(projectId) {
            setTimeout(() => (
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            ), 250);
        }
    }, [projectId]);

    useEffect(() => {
        switch (displayState) {
            case VIEW_ALL:
                break;
            default: {
                wait(transitionTimes[displayState] || 200).then(() => {
                    if(displayState != PROJECT_VIEW) {
                        dispatch({ type: 'advanceDisplayState' });
                    }
                });
                break;
            }
        }
    }, [displayState]);

    return (
        <div className={ clsx(classes.container, fadeContainerClass) }>
            <div className={ classes.content }>
                { orderedProjects.map( p => (
                    <ProjectCard
                        key={ `ProjectCard_${p.id}` }
                        data={ p }
                        pData={ projects[p.id] }
                        onClick={ projectSelectionCbs[p.id] }
                        isShown={ (!projectId) || (projectId == p.id) }
                        onScreen={ areAllShown || (p.id == projectId) }
                        displayState={ displayState }
                        isSelected={ (p.id == projectId) }
                        wasSelectionViaUI={ wasSelectionViaUI }
                        vpW={ vpW }
                    />
                )) }
                { typeof projectId != 'undefined' && (
                    <ProjectDetails projectId={ projectId } />
                ) }
            </div>
        </div>
    );
}
