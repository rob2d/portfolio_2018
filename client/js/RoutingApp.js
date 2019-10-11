import React, { useMemo } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { useLazyComponent } from 'utils/hooks';
import LoadingComponent from 'utils/components/LoadingComponent';
import { makeStyles } from '@material-ui/styles';
import { ConnectedRouter } from 'connected-react-router';
import appHistory from 'utils/appHistory';
import store from './store';
import { AppHeader, AppFooter } from './modules/core';
import ThemeContextProvider from './ThemeContextProvider';

const ANIM_DURATION_S = '0.32';

const useStyles = makeStyles(({ palette : { common } }) => ({
    '@global' : {
        'html,body' : {
            fontFamily: `'Roboto', sans-serif`,
            fontWeight : 300,
            backgroundColor : common.background1,
            transition : `background-color ${ANIM_DURATION_S}s ease`,
            padding : 0
        }
    },
    appWrapper : {
        minHeight : '100%',
        margin : '0px auto',
        display : 'flex',
        flexDirection : 'row',
        textAlign : 'center',
        backgroundColor : common.background1,
        transition : `background-color ${ANIM_DURATION_S}s`,
        boxSizing : 'border-box'
    },
    routeViewWrapper : {
        display       : 'flex',
        width         : '100%',
        flexDirection : 'column'
    },
    mainContent : {
        flexGrow : 1,
        display : 'flex',
        flexDirection : 'column'
    }
}));

function AppContent() {
    const classes = useStyles();

    const About = useLazyComponent(
        () => import( /* webpackChunkName: "about" */'./modules/about')
            .then( m => ({ default : m.default.About }) ),
        <LoadingComponent />
    );

    const ProjectsPanel = useLazyComponent(
        () => import( /* webpackChunkName: "projects" */'./modules/projects')
            .then( m => ({ default : m.default.ProjectsPanel }) ),
        <LoadingComponent />
    );

    const Miscellaneous = useLazyComponent(
        () => import( /* webpackChunkName: "misc" */'./modules/misc')
            .then( m => ({ default : m.default.Miscellaneous }) ),
        <LoadingComponent />
    );

    const CV = useLazyComponent(
        () => import( /* webpackChunkName: "cv" */'./modules/cv')
            .then( m => ({ default : m.default.CV }) ),
        <LoadingComponent />
    );

    const sectionContent = useMemo(() => (
        <Switch>
            <Route exact path={ '(/about|/)' } component={ About } />
            <Route exact path={ '/cv' } component={ CV } />
            <Route path={ '/projects(/:projectId)?' } component={ ProjectsPanel } />
            <Route path={ '/misc' } component={ Miscellaneous } />
        </Switch>
    ), [About, CV, ProjectsPanel, Miscellaneous]);

    return (
        <div className={ classes.appWrapper }>
            <div className={ classes.routeViewWrapper }>
                <AppHeader />
                { sectionContent }
                <AppFooter />
            </div>
        </div>
    );
}

function RoutingApp() {
    return (
        <Provider store={ store }>
            <ThemeContextProvider>
                <ConnectedRouter history={ appHistory }>
                    <AppContent />
                </ConnectedRouter>
            </ThemeContextProvider>
        </Provider>
    );
}

export default hot(RoutingApp);
