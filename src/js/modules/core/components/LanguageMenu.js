import React, { PureComponent } from 'react'
import injectSheet              from 'react-jss'
import Menu, { MenuItem }       from 'material-ui/Menu'
import Button                   from 'material-ui/Button'
import appHistory               from 'tools/appHistory'
import strings,{ menus }        from 'strings'
import styleSheet               from './style/LanguageMenuStyle'
import { connect }              from 'react-redux'

// TODO : language should be based on language query parameter
//        vs always defaulting to English

class LanguageMenu extends PureComponent {
    constructor (props, context) {
        super(props, context);
        this.state = { 
            anchorEl : undefined, 
            open     : false 
        };
    }
    onMenuClick = (event)=> {
        this.setState({ 
            anchorEl : event.currentTarget,
            open     : true  
        });
    };
    onRequestClose = ()=> {
        this.setState({ open : false });
    };
    onLanguageSelected = (language)=> {
        const { pathname } = this.props;
        const search = (language != 'en' ? `language=${language}` : '');
        
        appHistory.push({ pathname, search });
    };
    render () {
        const { onLanguageSelected, classes } = this.props;
        
        return (
            <Button className={classes.languageContainer} onClick={this.onMenuClick}>
                <span className={classes.languageTextSpan}>
                    {menus.main.languageAbbr}&nbsp;
                </span>
                <div
                    className={classes.languageButtonContainer}
                ><i className={`mdi mdi-menu-down ${classes.languageButtonIcon}`}/>
                </div>
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
                                this.onLanguageSelected(language);
                                this.onRequestClose();
                            }}>
                            {strings.global.languages[language]}
                        </MenuItem>
                    ))}
                </Menu>
            </Button>);
    }
}

let VisibleLanguageMenu = connect(
    (state,ownProps)=> ({ 
        language : state.core.language,
        pathname : state.router.location.pathname
    }),
)(injectSheet(styleSheet)(LanguageMenu));

export default VisibleLanguageMenu