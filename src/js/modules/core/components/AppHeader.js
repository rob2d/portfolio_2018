import React                 from 'react';
import pure                  from 'recompose/pure'
import Typography            from 'material-ui/Typography';
import AppBar                from 'material-ui/AppBar';
import Toolbar               from 'material-ui/Toolbar';
import { withStyles }        from 'material-ui/styles';
import {menus}               from 'strings';
import styleSheet            from './style/AppHeaderStyle';
import LanguageSelectionMenu from './LanguageSelectionMenu';
import { connect }           from 'react-redux';
import appHistory            from 'tools/appHistory';
import HeaderSectionButton   from './HeaderSectionButton'

const goToHeaderLink = (url)=> (appHistory.goTo(url) );

const Sections =
[
    {
        name        : 'about',
        iconClass   : 'mdi mdi-human-greeting',
        tooltipText : menus.main.about,
        onClick     : ()=>( goToHeaderLink('/about') )
    },
    {
        name        : 'projects',
        iconClass   : 'mdi mdi-briefcase',
        tooltipText : menus.main.projects,
        onClick     : ()=>( goToHeaderLink('/projects') )
    },
    {
        name        : 'cv',
        iconClass   : 'mdi mdi-file-document-box',
        tooltipText : menus.main.cv,
        onClick     : ()=>( goToHeaderLink('/cv') )
    }
];

const AppHeader = withStyles(styleSheet)(({ classes })=>
(
    <AppBar className={ classes.appBar }>
        <Toolbar className={ classes.toolbar }>
            <div className={ classes.leftIconsWrapper }>
                { Sections.map((s)=>
                (
                    <HeaderSectionButton
                        key={ `headerSectionButton${s.name}` }
                        name={ s.name }
                        iconClass={ s.iconClass }
                        tooltipText={ s.tooltipText }
                        onClick={ s.onClick }
                    />
                ))}
            </div>
            <div className={ classes.centerPadder } />
            <div className={ classes.rightContainer }>
                <Typography className={`md-maximum ${classes.myNameText}`}>
                    Robert Concepción III
                </Typography>
                <LanguageSelectionMenu />
            </div>
        </Toolbar>
    </AppBar>
));
AppHeader.displayName = 'AppHeader';

const VisibleAppHeader = pure(connect(
    (state,ownProps)=>({ language : state.core.language }),
    (dispatch)=> ({})
)(AppHeader));

export default VisibleAppHeader