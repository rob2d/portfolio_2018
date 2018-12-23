import { Provider, connect } from 'react-redux'
import React from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Loadable from 'react-loadable'
import withStyles from '@material-ui/core/styles/withStyles'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import { getTheme } from 'app-root/themeFactory'
import appHistory from 'utils/appHistory'
import withViewportSizes from 'utils/hocs/withViewportSizes'
import { ConnectedRouter } from 'connected-react-router'
import store from '../store'
import { AppHeader, AppFooter } from './core'

const styles = theme => ({
    appWrapper : {
        minHeight       : '100%',
        margin          : '0px auto',
        display         : 'flex',
        flexDirection   : 'row',
        textAlign       : 'center',
        backgroundColor : theme.rc3.background,
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
});


// TODO : create module/stylize this

const Loading = ({ error })=> {
    if(error) {
        return 'Error Loading!';
    }
    else {
        return (<p>Loading...</p>);
    }
};

// TODO : DRY this

const ProjectsPanel = Loadable({
    loader : ()=> new Promise((resolve, reject) => 
        import(/* webpackChunkName: "projects" */'./projects')
            .then( m => resolve(m.ProjectsPanel) )
            .catch( reject )
    ),
    loading : Loading
});

const About = Loadable({
    loader : ()=> new Promise((resolve, reject) =>
        import(/* webpackChunkName: "core" */'./about')
            .then( m => resolve(m.About) )
            .catch( reject )
    ),
    loading : Loading
});

const Miscellaneous = Loadable({
    loader : ()=> new Promise((resolve, reject) =>
        import(/* webpackChunkName: "misc" */'./misc')
            .then( m => resolve(m.Miscellaneous) )
            .catch( reject )
    ),
    loading : Loading
});

const CV = Loadable({
    loader : ()=> new Promise((resolve, reject) => 
        import(/* webpackChunkName: "cv" */'./cv')
            .then( m => resolve(m.CV) )
            .catch( reject )
    ),
    loading : Loading
});

const StyledContent = withStyles(styles)(
    function AppContent ({ classes }) {
        return (  
            <div className={ classes.appWrapper }>
                <div className={ classes.routeViewWrapper }>
                    <AppHeader />
                    {
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
                    }
                    <AppFooter />
                </div>
            </div>
        );
    }
);


const ThemedApp = withViewportSizes(connect(
    ({ core })=> ({ theme : core.theme })
)(
    function ThemedApp({ theme }) {
        const themeApplied = getTheme(theme); 

        return (
            <MuiThemeProvider theme={ themeApplied }>
                <ConnectedRouter history={ appHistory }>
                    <StyledContent />
                </ConnectedRouter>
            </MuiThemeProvider>
        )
    })
);


function RoutingApp(){ 
    return (
        <Provider store={ store }>
            <ThemedApp />
        </Provider>
    );
}



export default RoutingApp