import { makeStyles } from '@mui/styles';
import Technologies from 'constants/Technologies';
import ButtonLink from 'utils/components/ButtonLink';
import SVG from 'react-inlinesvg';
import C from 'color';

const useStyles = makeStyles(({ palette: { secondary, text, common } }) => ({
    techContainer: {
        margin: '4px',
        '& *': {
            fill: `${text.primary} !important`,
            stroke: `${text.primary} !important`,
            transition: 'background-color 0.35s ease'
        },
        '&:hover *': {
            fill: `${common.white} !important`,
            stroke: `${common.white} !important`
        },
        '&:hover $techIcon': {
            backgroundColor: secondary.main,
        },
        '&:active $techIcon': {
            backgroundColor: common.active
        }
    },
    techIcon: {
        width: '64px',
        height: '64px',
        borderRadius: '4px',
        backgroundColor: `${C(common.contrast).alpha(0).rgb()}`,
        '@media(max-width:800px)': {
            width: '48px',
            height: '48px'
        }
    }
}), { name: 'ProjectTechs' });

export default function ProjectTechs({ technologies }) {
    const classes = useStyles({ technologies });

    return technologies.map( tKey => {
        const { displayName, referenceUrl } = Technologies[tKey];

        return (
            <ButtonLink
                url={ referenceUrl }
                className={ classes.techContainer }
                title={ displayName }
                key={ `${displayName}_buttonLinkContainer` }
            >   <SVG
                    className={ classes.techIcon }
                    src={ `/img/techs/${tKey}.svg` }
                />
            </ButtonLink>
        );
    });
}
