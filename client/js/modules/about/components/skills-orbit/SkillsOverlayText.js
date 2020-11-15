import { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import skillPoints from 'constants/skillPoints';
import ValueBar from './ValueBar';

const useStyles = makeStyles(({ palette: { text } }) => ({
    container: {
        position: 'absolute',
        bottom: '0',
        width: '180px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        flexDirection: 'column',
        opacity: p => p.isVisible ? 1.0: 0.0,
        transition: p => `opacity 0.5s ease ${ !p.isVisible ? 1: 0 }s`,
        overflowX: 'hidden',
        overflowY: 'visible',
        color: text.primary
    },
    textItem: {
        boxSizing: 'border-box',
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: (Math.round(100/skillPoints.length) * 0.62) + '%'
    },
    namespace: {
        display: 'flex',
        flexDirection: 'row',
        width: '75%',
        justifyContent: 'flex-start',
        fontWeight: 300,
        fontSize: '11pt'
    },
    value: {
        display: 'flex',
        flexDirection: 'row',
        width: '25%',
        justifyContent: 'flex-end',
        fontSize: '11pt'
    }
}));

export default function SkillsOverlayText({ isVisible }) {
    const classes = useStyles({ isVisible });
    const skillStrings = strings.skills;

    const skillContent = useMemo(() => (
        skillPoints.sort((sp1, sp2) => (sp2.value-sp1.value))
            .map(({ namespace, value }, i) => (
                <React.Fragment key={ `skillText_${namespace}_${i+1}` }>
                    <div className={ classes.textItem }>
                        <p className={ classes.namespace }>
                            { skillStrings[namespace] }
                        </p>
                        <p className={ classes.value }>
                            { parseFloat(value).toFixed(2) }
                        </p>
                    </div>
                    <ValueBar isVisible={ isVisible } value={ value } index={ i } />
                </React.Fragment>
            ))
    ), [classes, skillPoints]);

    return (
        <div className={ classes.container }>
            { skillContent }
        </div>
    );
}
