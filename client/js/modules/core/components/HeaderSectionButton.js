import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from '@mui/styles';
import { Icon } from '@mdi/react';

const useStyles = makeStyles(({ palette: { common } }) => ({
    container: {
        display: 'block'
    },
    button: {
        display: 'block',
        height: 'auto',
        lineHeight: '24px',
        padding: '8px',
        minWidth: '60px',
        '& > *': {
            position: 'relative',
            top: '2px',
        },
        '& svg': {
            fontSize: '18pt',
            fill: common.white,
            color: common.white
        }
    },
    '@media (max-width: 400px)': {
        button: { minWidth: '68px' }
    }
}), 'HeaderSectionButton');

export default function HeaderSectionButton({
    onClick, domId, description,
    iconPath, tooltipText,
    buttonDivRef, disabled
}) {
    const classes = useStyles();

    return (
        <div ref={ buttonDivRef } className={ classes.container }>
            <Tooltip
                enterDelay={ 400 }
                title={ tooltipText }
            >
                <Button
                    className={ classes.button }
                    disabled={ disabled }
                    id={ domId }
                    onMouseDown={ onClick }
                    variant={ 'text' }
                    aria-label={ description }
                ><Icon path={ iconPath } size={ 1.025 } />
                </Button>
            </Tooltip>
        </div>
    );
}
