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
import pure from 'tools/pureWithDisplayName'

import AppHeader     from './core/components/AppHeader'
import AppFooter     from './core/components/AppFooter'
import ProjectsPanel from './projects/components/ProjectsPanel'
import About         from './about/components/About'
import CV            from './cv/components/CV'

import withFadeTransitions from 'tools/withFadeTransitions'

const styles =
{
    appWrapper :
    {
        minHeight       : '100%',
        margin          : '0px auto',
        display         : 'flex',
        flexDirection   : 'row',
        textAlign       : 'center'
    },
    routeViewWrapper :
    {
        display       : 'flex',
        width         : '100%',
        flexDirection : 'column'
    },
    mainContent :
    {
        flexGrow : 1,
        display : 'flex',
        flexDirection : 'column'
    }
};

const TestFadeComponent = withFadeTransitions(
    function TestFadeComponent() {
        return (
            <div id="fadeComponentTester" style={{ padding : '32px' }}>
                testing testing
            </div>
        );
    }
);

const RoutingApp = injectSheet(styles)(({ classes })=>(
    <Provider store={ store }>
        <MuiThemeProvider theme={ baseTheme }>
        <ConnectedRouter history={ appHistory }>
            <div className={ classes.appWrapper }>
                <div className={classes.routeViewWrapper}>
                    <AppHeader/>
                    {
                    <Switch>
                        <Route exact path='(/about|/)' component={ About }/>
                        <Route exact path='/cv' component={ CV }/>
                        <Route path='(/projects|/projects/:projectId)' component={ ProjectsPanel }/>
                    </Switch>
                    }
                    <AppFooter/>
                </div>
            </div>
        </ConnectedRouter>
        </MuiThemeProvider>
    </Provider>
));
RoutingApp.displayName = 'RoutingApp';

export default RoutingApp