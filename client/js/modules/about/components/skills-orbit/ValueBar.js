import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    container: {
        width: '100%',
        transition: 'border-color 0.5s',
        height: '4px'
    },
    bar: {
        display: 'block',
        width: ({ isVisible, value }) => (
            `${isVisible ? (value * 100): '0'}%`
        ),
        height: '100%',
        backgroundColor: '#c51162',
        transition: ({ index }) => {
            const attribs = `0.30s linear ${Number(((index+1)*0.1).toFixed(2))}s`;
            return `width ${attribs}`;
        }
    }
}));

export default function ValueBar({ isVisible, index, value }) {
    const classes = useStyles({ isVisible, index, value });

    return (
        <div className={ classes.container }>
            <div className={ classes.bar } />
        </div>
    );
}
