import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

const PREFIX = 'LoadingComponent';

const classes = {
    container: `${PREFIX}-container`
};

const Root = styled('div')(() => ({
    [`&.${classes.container}`]: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
        minHeight: '60px',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '32px',
        paddingBottom: '16px',
        flexGrow: 1
    }
}));

export default function LoadingComponent({ error, size=64 }) {

    if(error) {
        console.error(error);
        return 'Error Loading!';
    }
    else {
        return (
            <Root className={ classes.container }>
                <CircularProgress size={ size } color={ 'secondary' } />
            </Root>
        );
    }
}
