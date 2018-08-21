import React from 'react'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import pure from 'recompose/pure'

const contactButtonStyle = (theme)=> ({
    contactButton : {
        display        : 'inline-flex',
        justifyContent : 'center',
        flexDirection  : 'column',
    },
    '@media (max-width: 400px)': {
        contactButton : { minWidth : '68px' }
    },
    icon : {
        fontSize : '18pt',
        color    : '#455A64'
    }
});

const ContactButton = pure(withStyles(contactButtonStyle)
(({ url, classes, iconClass })=> (
    <Button
        className={ classes.contactButton }
        onClick={()=>{ location.href = url }}
    ><i className={`${iconClass} ${classes.icon}`}/>
    </Button>
)));
ContactButton.displayName = 'ContactButton';


const AppFooter = pure(()=>
(
    <div className="appFooter">
        <ContactButton
            iconClass={'mdi mdi-github-box'}
            url={'https://github.com/rob2d'}
        />
        <ContactButton
            iconClass={'rc3 rc3-npm-box'}
            url={'https://www.npmjs.com/~robftw'}
        />
        <ContactButton
            iconClass={'mdi mdi-linkedin-box'}
            url={'https://www.linkedin.com/in/' +
            'robert-concepci%C3%B3n-iii-66bb7114/'}
        />
        <ContactButton
            iconClass={'mdi mdi-gmail'}
            url={'mailto:robert.concepcion.iii@gmail.com'}
        />
    </div>
));

export default AppFooter