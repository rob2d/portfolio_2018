import React from 'react'
import pure from 'recompose/pure'
import withStyles from '@material-ui/core/styles/withStyles'
import ButtonLink from 'tools/components/ButtonLink'

const styles = theme => ({
    listItem : {
        listStyleType : 'none',
        cursor        : 'pointer',
        color         : '#c51162',
        fontFamily    : 'roboto_bold',
        fontSize      : '11pt',
        minWidth      : '148px',
        textAlign     : 'left',
        transition    : 'color 0.21s'
    },
    icon : {
        marginRight : '16px',
        fontSize    : '13pt',
        color       : theme.rc3.text
    },
    container : {
        display : 'block !important',
        padding : '8px !important',
        '&:hover $listItem' : {
            color : '#ff4081'
        },
        '&:active $listItem' : {
            color : '#00b8d4'
        }
    }
});


let SectionLink = pure(withStyles(styles)(
    function SectionLinkLayout ({ url, name, mdiClass, classes }) {
        const iconClass = `mdi mdi-${mdiClass} ${classes.icon}`;

        return (
            <ButtonLink 
                url={url}
                containerClass={classes.container}
            >   <li className={classes.listItem}> 
                    <i className={iconClass} />&nbsp;{name}
                </li>
            </ButtonLink>
        );
}));

export default SectionLink