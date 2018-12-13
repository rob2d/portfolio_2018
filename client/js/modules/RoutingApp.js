import { Provider, connect } from 'react-redux'
import React, { Component } from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import withStyles from '@material-ui/core/styles/withStyles'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import { getTheme } from 'app-root/themeFactory'
import appHistory from 'utils/appHistory'
import { ConnectedRouter } from 'connected-react-router'
import store from '../store'
import pure from 'recompose/pure'
import { AppHeader, AppFooter } from './core'
import { ProjectsPanel } from './projects'
import { About } from './about'
import { Miscellaneous } from './misc'
import { CV } from './cv'

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


const ThemedApp = connect(
    ({ core })=> ({ theme : core.theme })
)(function ThemedApp({ theme }) {
    const themeApplied = getTheme(theme); 

    return (
        <MuiThemeProvider theme={ themeApplied }>
            <ConnectedRouter history={ appHistory }>
                <StyledContent />
            </ConnectedRouter>
        </MuiThemeProvider>
    )
});


function RoutingApp(){ 
    return (
        <Provider store={ store }>
            <ThemedApp />
        </Provider>
    );
}



export default RoutingApp