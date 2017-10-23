import React, { PureComponent } from 'react'
import injectSheet              from 'react-jss'
import IconButton               from 'material-ui/IconButton'
import strings, {menus}         from 'strings'
import { connect }              from 'react-redux'
import appHistory from 'tools/appHistory'

const parentStyleSheet = {
    container : {
        margin : '0 auto',
        padding : '0px',    
    }
};

const styleSheet = {
    container : {
        maxWidth   : '600px',
        minWidth   : '240px',
        margin     : '0 auto',
        padding    : '0px',
        textAlign  : 'center',
        alignItems : 'center',
        justifyContent : 'center',
        overflow       : 'hidden',
        opacity        : ({ message })=>( message ? 1 : 0 ),
        margin         : ({ message })=>( message ? '32px auto 0px' : '0px auto 0px' ),
        maxHeight      : ({ message })=>( message ? '200px' : '0px' ),
        transition     : 'max-height 0.75s, width 0.75s, opacity 0.75s, margin 0.75s'
    },
    disclaimer :
    {
        padding        : ({ message })=>(message ? '8px 16px' : '0px 16px'),
        color          : '#BB4433',
        textAlign      : 'center',
        alignItems     : 'center',
        justifyContent : 'center',
        transition     : 'padding 0.75s'
    },
    disclaimerNote : 
    {
        display    : 'flex',
        overflow   : 'hidden',
        flexAlign  : 'row',
        fontSize   : '12pt',
        textAlign  : 'justify',
        margin     : '0px',
        maxHeight  : ({ message })=>( message ? '200px' : '0px' ),
        transition : 'max-height 0.75s linear 0.25s, height 0.75s linear 0.25s'
    },
    disclaimerIcon : {
        overflow   : 'hidden',
        fontSize   : '18pt',
        maxHeight  : ({ message })=>( message ? '200px' : '0px' ),
        transition : 'max-height 0.75s linear 0.25s, height 0.75s linear 0.25s'
    },
    disclaimerIconContainer : {
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center',
        marginRight    : '16px'
    },
    disclaimerText : {
        margin : '0px'
    }
};

const AppWarningBox = injectSheet(styleSheet)(
    class AppWarningBox extends PureComponent {
        constructor (props) {
            super(props);
            this.state = { messageDisplayed : props.message || '' };
        }
        componentWillReceiveProps (nextProps) {
            if(nextProps.message) {
                this.setState({ messageDisplayed : nextProps.message })            
            }
        }

        render () {
            const { classes, message, location } = this.props;
            return (
                <div className={classes.container}>
                    <div className={ classes.disclaimer }>
                        <p className={classes.disclaimerNote}>
                            <div className={classes.disclaimerIconContainer}>
                                <i className={`mdi mdi-alert ${classes.disclaimerIcon}`}/>
                            </div>
                            <p className={classes.disclaimerText}>
                                { this.state.messageDisplayed }
                            </p> 
                        </p>
                    </div>
                </div>
            );
        }
    }
);

    
class AppWarningNotice extends PureComponent {
    constructor (props) {
        super(props);
        this.state = { isAtProjectLocation : false };
    }

    componentDidMount () {
        this.checkForProjectWarning();
    }

    componentDidUpdate (prevProps, prevState) {
        this.checkForProjectWarning();
    }

    checkForProjectWarning = ()=> {
        if(!this.state.isAtProjectLocation && this.isAtProjectLocation()) {
            setTimeout(()=> {
                this.setState({ isAtProjectLocation : true });
            }, 2000);
        } else if(this.state.isAtProjectLocation && !this.isAtProjectLocation()) {
            this.setState({ isAtProjectLocation : false });
        }
    };

    isAtProjectLocation = ()=> {
        const { pathname } = this.props;
        return pathname != '/projects' && (pathname.indexOf('/projects') != -1);
    };

    render () {
        const { classes, language } = this.props;
        
        return (
            <div className={classes.container} >
                {/* Notice to let users know Japanese translation is WIP */}
                <AppWarningBox message={strings.global.translationIsWIP[language]} />
                
                {/* Notice to let users know Project Details are WIP */}
                <AppWarningBox message={this.state.isAtProjectLocation &&  (
                            `This section is a work in progress and
                            does not yet contain all relevant content.
                            Check back soon for updates!`
                )} />
            </div>
        );
    }
} 

export default connect(
    (state, ownProps)=>({
        language : state.core.language,
        pathname : state.router.location.pathname
    }), {}
)(injectSheet(parentStyleSheet)(AppWarningNotice));