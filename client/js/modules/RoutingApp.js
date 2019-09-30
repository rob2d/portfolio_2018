import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { getTheme } from 'app-root/themeFactory';
import appHistory from 'utils/appHistory';
import store from '../store';
import { AppHeader, AppFooter } from './core';
import { hot } from 'react-hot-loader/root';
import { useLazyComponent } from 'utils/hooks';
import LoadingComponent from 'utils/components/LoadingComponent';

const ANIM_DURATION_S = '0.32';

const useStyles = makeStyles(({ rc3 }) => ({
    appWrapper : {
        minHeight : '100%',
        margin : '0px auto',
        display : 'flex',
        flexDirection : 'row',
        textAlign : 'center',
        backgroundColor : rc3.background,
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

function AppContent () {
    const classes = useStyles();

    const About = useLazyComponent(
        ()=> import( /* webpackChunkName: "about" */'./about')
        .then( m => ({ default : m.default.About }) ),
        <LoadingComponent />
    );

    const ProjectsPanel = useLazyComponent(
        ()=> import( /* webpackChunkName: "projects" */'./projects')
        .then( m => ({ default : m.default.ProjectsPanel }) ),
        <LoadingComponent />
    );

    const Miscellaneous = useLazyComponent(
        ()=> import( /* webpackChunkName: "misc" */'./misc')
        .then( m => ({ default : m.default.Miscellaneous }) ),
        <LoadingComponent />
    );

    const CV = useLazyComponent(
        ()=> import( /* webpackChunkName: "cv" */'./cv')
        .then( m => ({ default : m.default.CV }) ),
        <LoadingComponent />
    );

    return (  
        <div className={ classes.appWrapper }>
            <div className={ classes.routeViewWrapper }>
                <AppHeader />
                    <Switch>
                        <Route 
                            exact path='(/about|/)' 
                            component={ About } 
                        />
                        <Route 
                            exact path='/cv' 
                            component={ CV } 
                        />
                        <Route 
                            path='/projects(/:projectId)?' 
                            component={ ProjectsPanel } 
                        />
                        <Route 
                            path='/misc' 
                            component={ Miscellaneous } 
                        />
                    </Switch>
                <AppFooter />
            </div>
        </div>
    );
}


function ThemedApp() {
    const theme = useSelector( state => state.core.theme );
    const themeApplied = getTheme(theme); 

    return (
        <ThemeProvider theme={ themeApplied }>
            <ConnectedRouter history={ appHistory }>
                <AppContent />
            </ConnectedRouter>
        </ThemeProvider>
    );
}


function RoutingApp(){ 
    return (
        <Provider store={ store }>
            <ThemedApp />
        </Provider>
    );
}

export default hot(RoutingApp);