import React, { 
    Fragment, 
    PureComponent 
} from 'react'
import injectSheet        from 'react-jss'
import Menu               from '@material-ui/core/Menu'
import MenuItem           from '@material-ui/core/MenuItem'
import Button             from '@material-ui/core/Button'
import appHistory         from 'tools/appHistory'
import strings, { menus } from 'strings'
import styleSheet         from './style/LanguageMenuStyle'
import { connect }        from 'react-redux'

// TODO : language should be based on language query parameter
//        vs always defaulting to English

class LanguageMenu extends PureComponent {
    constructor (props, context) {
        super(props, context);
        this.state = { anchorEl : undefined };
    }

    onMenuClick = event => {
        this.setState({ anchorEl : event.currentTarget });
    };

    onRequestClose = ()=> {
        this.setState({ anchorEl: undefined });
    };

    onLanguageSelected = language => {
        const { pathname } = this.props;
        const search = (language != 'en' ? `language=${language}` : '');
        
        appHistory.push({ pathname, search });
    };

    render () {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        
        return (
            <Fragment>
                <Button 
                    onClick={ this.onMenuClick }
                    aria-owns={ anchorEl ? 'languageMenu' : null }
                    aria-haspopup={ true }
                    className={ classes.languageContainer } 
                >
                    <span className={classes.languageTextSpan}>
                        { menus.main.languageAbbr }&nbsp;
                    </span>
                    <div
                        className={classes.languageButtonContainer}
                    ><i className={`mdi mdi-menu-down ${classes.languageButtonIcon}`} />
                    </div>
                </Button>
                <Menu
                    id='languageMenu'
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.onRequestClose}
                >{ 
                    strings.languageCodes.map( language => (
                        <MenuItem
                            key={`LanguageMenuItem${language}`}
                            onClick={ e => {
                                this.onLanguageSelected(language);
                                this.onRequestClose();
                            }}>
                            { strings.global.languages[language] }
                        </MenuItem>
                    ))}
                </Menu>
            </Fragment>
        );
    }
}

let VisibleLanguageMenu = connect(
    (state,ownProps)=> ({ 
        language : state.core.language,
        pathname : state.router.location.pathname
    }),
)(injectSheet(styleSheet)(LanguageMenu));

export default VisibleLanguageMenu