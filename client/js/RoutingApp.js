import { useState, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { useLazyComponent, useDocumentTitle } from 'utils/hooks';
import LoadingComponent from 'utils/components/LoadingComponent';
import { makeStyles } from '@mui/styles';
import appHistory from 'utils/appHistory';
import { AppHeader, AppFooter } from './modules/core';
import ThemeContextProvider from './ThemeContextProvider';

const ANIM_DURATION_S = '0.32';

const useStyles = makeStyles(({ palette: { common, text } }) => ({
    '@global': {
        'html,body': {
            color: text.primary,
            fill: text.primary,
            backgroundColor: common.background1,
            transition: `background-color ${ANIM_DURATION_S}s ease`,
            padding: 0
        },
        '#loader': {
            opacity: p => p.isLoaderShowing ? 1: 0
        }
    },
    appWrapper: {
        minHeight: '100%',
        margin: '0px auto',
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        backgroundColor: common.background1,
        transition: `background-color ${ANIM_DURATION_S}s`,
        boxSizing: 'border-box',
    },
    routeViewWrapper: {
        display: 'flex',
        width: '100%',
        height: '100vh',
        flexDirection: 'column'
    },
    mainContent: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
    }
}), { name: 'RoutingApp' });

function AppContent() {
    const [isLoaderShowing, setLoaderShowing] = useState(() => true);
    const classes = useStyles({ isLoaderShowing });

    useEffect(() => {
        setLoaderShowing(false);
        setTimeout(() => {
            const loaderElem = document.getElementById('loader');
            loaderElem?.parentNode && loaderElem.parentNode.removeChild(loaderElem);
        }, 1000);
    }, []);

    const About = useLazyComponent(
        () => import( /* webpackChunkName: "about" */'./modules/about')
            .then( m => ({ default: m.default.About }) ),
        <LoadingComponent />
    );

    const ProjectsPanel = useLazyComponent(
        () => import( /* webpackChunkName: "projects" */'./modules/projects')
            .then( m => ({ default: m.default.ProjectsPanel }) ),
        <LoadingComponent />
    );

    const Miscellaneous = useLazyComponent(
        () => import( /* webpackChunkName: "misc" */'./modules/misc')
            .then( m => ({ default: m.default.Miscellaneous }) ),
        <LoadingComponent />
    );

    const CV = useLazyComponent(
        () => import( /* webpackChunkName: "cv" */'./modules/cv')
            .then( m => ({ default: m.default.CV }) ),
        <LoadingComponent />
    );

    return (
        <div className={ classes.appWrapper }>
            <div className={ classes.routeViewWrapper } data-id={ 'page-content' }>
                <AppHeader />
                <Switch>
                    <Route
                        exact
                        path={ '(/about|/)' }
                        render={ () => <About /> }
                    />
                    <Route
                        exact
                        path={ '/cv' }
                        render={ () => <CV /> }
                    />
                    <Route
                        path={ '/projects/:projectId?' }
                        render={ () => <ProjectsPanel /> }
                    />
                    <Route
                        exact
                        path={ '/misc' }
                        render={ () => <Miscellaneous /> }
                    />
                </Switch>
                <AppFooter />
            </div>
        </div>
    );
}

function RoutingApp() {
    useDocumentTitle({ title: SITE_NAME });

    return (
        <ThemeContextProvider>
            <Router history={ appHistory }>
                <AppContent />
            </Router>
        </ThemeContextProvider>
    );
}

export default RoutingApp;
