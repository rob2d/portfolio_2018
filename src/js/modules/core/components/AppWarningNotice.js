import React, { PureComponent } from 'react'
import injectSheet              from 'react-jss'
import IconButton               from 'material-ui/IconButton'
import Paper                    from 'material-ui/Paper'
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
        margin         : ({ message })=>( message ? '32px auto 0px' : '0' ),
        maxHeight      : ({ message })=>( message ? '500px' : '0px' ),
        opacity        : ({ message })=>( message ? 1 : 0 ),
        transition     : 'max-height 0.75s, width 0.75s, opacity 0.75s, margin 0.75s'
    },
    disclaimer :
    {
        padding        : ({ message })=>(message ? '8px 16px' : '0px'),
        color          : '#BB4433',
        textAlign      : 'center',
        alignItems     : 'center',
        justifyContent : 'center',
        transition     : 'padding 0.75s'
    },
    disclaimerNote : 
    {
        display    : 'flex',
        flexAlign  : 'row',
        fontSize   : ({ message })=>( message ? '12pt':'0' ),
        textAlign  : 'justify',
        margin     : '0px',
        transition : 'font-size 0.75s'
    },
    disclaimerIcon : {
        fontSize : ({ message })=>( message ? '18pt':'0' ),
        transition : 'font-size 0.75s'
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
                    <Paper className={ classes.disclaimer }>
                        <p className={classes.disclaimerNote}>
                            <div className={classes.disclaimerIconContainer}>
                                <i className={`mdi mdi-alert ${classes.disclaimerIcon}`}/>
                            </div>
                            <p className={classes.disclaimerText}>
                                { this.state.messageDisplayed }
                            </p> 
                        </p>
                    </Paper>
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