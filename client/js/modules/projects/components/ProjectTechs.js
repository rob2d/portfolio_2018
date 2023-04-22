import { styled } from '@mui/material/styles';
import Technologies from 'constants/Technologies';
import ButtonLink from 'utils/components/ButtonLink';
import SVG from 'react-inlinesvg';
import C from 'color';

const PREFIX = 'ProjectTechs';

const classes = {
    techContainer: `${PREFIX}-techContainer`,
    techIcon: `${PREFIX}-techIcon`
};

const StyledButtonLink = styled(ButtonLink)(({
    theme: { palette: { secondary, text, common } }
}) => ({
    [`&.${classes.techContainer}`]: {
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

    [`& .${classes.techIcon}`]: {
        width: '64px',
        height: '64px',
        borderRadius: '4px',
        backgroundColor: `${C(common.contrast).alpha(0).rgb()}`,
        '@media(max-width:800px)': {
            width: '48px',
            height: '48px'
        }
    }
}));

export default function ProjectTechs({ technologies }) {


    return technologies.map( tKey => {
        const { displayName, referenceUrl } = Technologies[tKey];

        return (
            <StyledButtonLink
                url={ referenceUrl }
                className={ classes.techContainer }
                title={ displayName }
                key={ `${displayName}_buttonLinkContainer` }
            >   <SVG
                    className={ classes.techIcon }
                    src={ `/img/techs/${tKey}.svg` }
                />
            </StyledButtonLink>
        );
    });
}
