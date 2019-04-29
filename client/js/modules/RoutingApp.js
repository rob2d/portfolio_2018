import { Provider, connect } from 'react-redux'
import React from 'react'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { makeStyles } from '@material-ui/styles'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import { getTheme } from 'app-root/themeFactory'
import appHistory from 'utils/appHistory'
import { ConnectedRouter } from 'connected-react-router'
import store from '../store'
import lazyLoadComponent from 'utils/lazyLoadComponent'
import { AppHeader, AppFooter } from './core'
import { hot } from 'react-hot-loader/root'
import useViewportSizes from 'use-viewport-sizes'

const useStyles = makeStyles(({ rc3 }) => ({
    appWrapper : {
        minHeight       : '100%',
        margin          : '0px auto',
        display         : 'flex',
        flexDirection   : 'row',
        textAlign       : 'center',
        backgroundColor : rc3.background,
        transition      : 'all 0.32s'
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

const ProjectsPanel = lazyLoadComponent({
    loader : ()=> import( /* webpackChunkName: "projects" */
        './projects'
    ),
    resolver : m => m.ProjectsPanel
});

const About = lazyLoadComponent({
    loader : ()=> import( /* webpackChunkName: "about" */
        './about'
    ),
    resolver : m => m.About
});

const Miscellaneous = lazyLoadComponent({
    loader : ()=> import( /* webpackChunkName: "misc" */
        './misc'
    ),
    resolver : m => m.Miscellaneous
});

const CV = lazyLoadComponent({
    loader : ()=> import( /* webpackChunkName: "cv" */
        './cv'
    ),
    resolver : m => m.CV
});

function AppContent () {
    const classes = useStyles();

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
                            path='(/projects|/projects/:projectId)' 
                            component={ ProjectsPanel } 
                        />
                        <Route 
                            path='(/misc)' 
                            component={ Miscellaneous } 
                        />
                    </Switch>
                <AppFooter />
            </div>
        </div>
    );
}


const ThemedApp = connect(({ core : { theme } })=> ({ theme }))(
    function ThemedApp({ theme }) {
        const themeApplied = getTheme(theme); 

        return (
            <ThemeProvider theme={ themeApplied }>
                <ConnectedRouter history={ appHistory }>
                    <AppContent />
                </ConnectedRouter>
            </ThemeProvider>
        )
});


function RoutingApp(){ 
    return (
        <Provider store={ store }>
            <ThemedApp />
        </Provider>
    );
}

export default hot(RoutingApp)