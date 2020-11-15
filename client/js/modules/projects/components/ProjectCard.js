import {
    useEffect,
    useLayoutEffect,
    useCallback,
    useRef,
    useReducer
} from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Icon } from '@mdi/react';
import { mdiInformationOutline } from '@mdi/js';
import { OptimizedImg } from 'utils/components';
import useStyles from './ProjectCardStyle';
import {
    VIEW_ALL,
    PROJECT_FADE_TO,
    OFFSET_CALC,
    AFTER_FADE_POSITIONING,
    PROJECT_SCROLL_UP,
    PROJECT_VIEW
} from '../constants/DisplayStates';

const initialState = {
    isHovered: false,
    hasAbsolutePosition: false,
    viewAsTitle: false,
    offsetLeft: undefined,
    offsetTop: undefined
};

const positionReducer = (state, { type, payload }) => {
    switch (type) {
        case 'setHovered': {
            return {
                ...state,
                isHovered: payload
            };
        }

        case 'updateSelectionPositioning': {
            let {
                hasAbsolutePosition,
                viewAsTitle,
                offsetLeft,
                offsetTop,
                isHovered
            } = state;

            const {
                displayState,
                wasSelectionViaUI
            } = payload;

            switch (displayState) {
                case VIEW_ALL:
                case PROJECT_FADE_TO:
                    hasAbsolutePosition = false;
                    break;
                case OFFSET_CALC:
                    hasAbsolutePosition = false;
                    offsetLeft = payload.offsetLeft;
                    offsetTop = payload.offsetTop;
                    break;
                case AFTER_FADE_POSITIONING: {
                    hasAbsolutePosition = true;
                    break;
                }
                case PROJECT_SCROLL_UP: {
                    if(wasSelectionViaUI) {
                        hasAbsolutePosition = true;
                    }
                    offsetLeft = 0;
                    offsetTop = 0;
                    break;
                }
                case PROJECT_VIEW: {
                    viewAsTitle = true;
                    isHovered = false;
                    hasAbsolutePosition = true;

                    if(!wasSelectionViaUI) {
                        offsetLeft = 0;
                        offsetTop = 0;
                    }
                    break;
                }
                default: {
                    break;
                }
            }

            if(displayState != PROJECT_VIEW) {
                viewAsTitle = false;
            }

            return {
                ...state,
                hasAbsolutePosition,
                viewAsTitle,
                offsetLeft,
                offsetTop,
                isHovered
            };
        }

        case 'updateNonSelectionPositioning': {
            const { displayState } = payload;
            let { isHovered } = state;

            if(displayState == PROJECT_VIEW) {
                isHovered = false;
            }
            return {
                ...state,
                isHovered,
                offsetLeft: undefined,
                offsetTop: undefined,
                hasAbsolutePosition: false,
                viewAsTitle: false
            };
        }
        default: {
            return state;
        }
    }
};

export default function ProjectCardLayout(props) {
    const {
        data: {
            id, displayName, context, shortDescription
        },
        pData, onClick,
        isSelected,
        displayState,
    } = props;

    const container = useRef();
    const [state, dispatch] = useReducer(
        positionReducer,
        initialState
    );

    const {
        viewAsTitle,
        isHovered
    } = state;

    const classes = useStyles({
        ...props,
        ...state,
        isHighlighted: isHovered || isSelected
    });

    // ---------------------------- //
    // mouse-hover-state management //
    // ============================ //

    const onMouseEnter = useCallback(() =>
        dispatch({ type: 'setHovered', payload: true }),
    []);
    const onMouseLeave = useCallback(() =>
        dispatch({ type: 'setHovered', payload: false }),
    []);

    useEffect(() => {
        container.current.addEventListener('mouseenter', onMouseEnter);
        container.current.addEventListener('mouseleave', onMouseLeave);
        return () => {
            container.current.removeEventListener('mouseenter', onMouseEnter);
            container.current.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    useLayoutEffect(() => {
        if(isSelected) {
            dispatch({
                type: 'updateSelectionPositioning',
                payload: {
                    ...props,
                    offsetLeft: container.current.offsetLeft,
                    offsetTop: container.current.offsetTop
                }
            });
        }
        else {
            dispatch({
                type: 'updateNonSelectionPositioning',
                payload: props
            });
        }
    }, [isSelected, displayState]);

    return (
        <div ref={ container } className={ classes.container }>
            <Card
                className={ clsx(
                    viewAsTitle &&
                    classes.cardContainerAsTitle,
                    classes.cardContainerBase
                ) }
                onMouseDown={ onClick }
            >
                <div className={ classes.cardMediaContent }>
                    <OptimizedImg
                        src={ `/img/projects/${id}/${id}_thumb.png` }
                        className={ classes.cardMediaImg }
                        alt={ '' }
                    />
                    <div className={ classes.titleOverlay }>
                        <Typography
                            className={ classes.displayName }
                            variant={ 'subtitle1' }
                        >{ displayName }
                        </Typography>
                        <Typography
                            className={ classes.subtitle }
                            variant={ 'subtitle2' }
                        >{ context } ({ pData.year })
                        </Typography>
                        <Icon
                            path={ mdiInformationOutline }
                            className={ classes.moreInfoButton }
                            size={ 1.4 }
                        />
                    </div>
                </div>
                <CardContent className={ classes.cardContent }>
                    <Typography variant={ 'body1' }>
                        { shortDescription }
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
