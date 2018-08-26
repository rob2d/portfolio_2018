import Provider from 'react-redux/lib/components/Provider'
import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import baseTheme     from 'app-root/baseTheme'
import appHistory from 'tools/appHistory'
import ConnectedRouter from 'react-router-redux/ConnectedRouter'
import store from '../store'
import injectSheet from 'react-jss'

import AppWarningNotice from './core/components/AppWarningNotice'

import AppHeader     from './core/components/AppHeader'
import AppFooter     from './core/components/AppFooter'
import ProjectsPanel from './projects/components/ProjectsPanel'
import About         from './about/components/About'
import Miscellaneous from './misc/components/Miscellaneous'
import CV            from './cv/components/CV'

const styles = {
    appWrapper : {
        minHeight       : '100%',
        margin          : '0px auto',
        display         : 'flex',
        flexDirection   : 'row',
        textAlign       : 'center'
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
};

const RoutingApp = injectSheet(styles)(({ classes })=>(
    <Provider store={ store }>
        <MuiThemeProvider theme={ baseTheme }>
        <ConnectedRouter history={ appHistory }>
            <div className={ classes.appWrapper }>
                <div className={classes.routeViewWrapper}>
                    <AppHeader />
                    <AppWarningNotice />
                    {
                    <Switch>
                        <Route exact path='(/about|/)' component={ About } />
                        <Route exact path='/cv' component={ CV } />
                        <Route path='(/projects|/projects/:projectId)' component={ ProjectsPanel } />
                        <Route path='(/misc)' component={ Miscellaneous } />
                    </Switch>
                    }
                    <AppFooter />
                </div>
            </div>
        </ConnectedRouter>
        </MuiThemeProvider>
    </Provider>
));
RoutingApp.displayName = 'RoutingApp';

export default RoutingApp