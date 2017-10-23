import React, { PureComponent } from 'react'
import injectSheet              from 'react-jss'
import Menu, { MenuItem }       from 'material-ui/Menu'
import IconButton               from 'material-ui/IconButton'
import strings,{ menus }        from 'strings'
import styleSheet               from './style/LanguageMenuStyle'
import { setLanguage }          from '../actions'
import { connect }              from 'react-redux'

class LanguageMenu extends PureComponent {
    constructor (props, context) {
        super(props, context);
        this.state = { anchorEl : undefined, open : false }
    }
    onMenuClick = (event)=> {
        this.setState({ 
            anchorEl : event.currentTarget,
            open : true  
        });
    };
    onRequestClose = ()=> {
        this.setState({ open : false });
    };
    render () {
        const { onLanguageSelected, classes } = this.props;
        
        return (
            <div className={classes.languageContainer} onClick={this.onMenuClick}>
                <span className={classes.languageTextSpan}>
                    {menus.main.languageAbbr}&nbsp;
                </span>
                <IconButton
                    className={classes.languageButtonContainer}
                ><i className={`mdi mdi-menu-down ${classes.languageButtonIcon}`}/>
                </IconButton>
                <Menu
                    id={'languageMenu'}
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.onRequestClose}
                >
                    { strings.languageCodes.map((language)=> (
                        <MenuItem
                            key={`LanguageMenuItem${language}`}
                            onClick={(e)=>
                            {
                                onLanguageSelected(language);
                                this.onRequestClose();
                            }}>
                            {strings.global.languages[language]}
                        </MenuItem>
                    ))}
                </Menu>
            </div>);
    }
}
LanguageMenu.displayName = 'LanguageMenu';

let VisibleLanguageMenu = connect(
    (state,ownProps)=> ({
        language : state.core.language
    }),
    (dispatch)=> ({ onLanguageSelected : (language)=>
    {
        dispatch(setLanguage(language));
    }})
)(injectSheet(styleSheet)(LanguageMenu));

export default VisibleLanguageMenu