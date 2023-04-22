import { makeStyles } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles( () => ({
    container: {
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
}), 'LoadingComponent');

export default function LoadingComponent({ error, size=64 }) {
    const classes = useStyles({ error, size });

    if(error) {
        console.error(error);
        return 'Error Loading!';
    }
    else {
        return (
            <div className={ classes.container }>
                <CircularProgress size={ size } color={ 'secondary' } />
            </div>
        );
    }
}
