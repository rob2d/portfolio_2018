import { useRef, useLayoutEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import useViewportSizes from 'use-viewport-sizes';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AppSections from 'constants/AppSections';
import { appHistory } from 'utils';
import { useAutoFaderClass } from 'utils/hooks';
import ThemeButton from './ThemeButton';
import HeaderSectionButton from './HeaderSectionButton';
import SectionHighlighter from './SectionHighlighter';

const { Sections, pathIndexLookup } = AppSections;
const BUTTON_WIDTH_PX = 60;

const PREFIX = 'AppHeader';

const classes = {
    rightContainer: `${PREFIX}-rightContainer`,
    leftIconsWrapper: `${PREFIX}-leftIconsWrapper`,
    centerPadder: `${PREFIX}-centerPadder`,
    myNameText: `${PREFIX}-myNameText`
};

const StyledAppBar = styled(AppBar)(({
    theme: { palette: { common } }
}) => ({
    [`& .${classes.rightContainer}`]: {
        textAlign: 'right',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative'
    },

    [`& .${classes.leftIconsWrapper}`]: {
        position: 'relative',
        width: `${Sections.length * BUTTON_WIDTH_PX}px`,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },

    [`& .${classes.centerPadder}`]: {
        flex: 1,
        display: 'flex'
    },

    [`& .${classes.myNameText}`]: {
        textAlign: 'right !important',
        marginRight: '16px !important',
        display: 'block',
        color: common.white
    }
}));

/**
 * callback events corresponding to each section
 * in Sections list which navigate to desired
 * section
 */
const SectionClickEvents = Sections.map( section => e =>
    appHistory.goTo(section.basePath, e)
);

export default function AppHeader() {
    const fadeContainerClass = useAutoFaderClass();
    const location = useLocation();
    const { pathname } = location;
    const pathIndex = useMemo(() =>
        (typeof pathIndexLookup[pathname] !== 'undefined') ?
            pathIndexLookup[pathname] : -1,
    [pathname]);

    const [vpW, vpH] = useViewportSizes();
    const [hasInitialized, setInitialized] = useState(undefined);

    // create a re-render before first paint to consume refs
    // animate section highlighter

    useLayoutEffect(() => { setInitialized(1) },[]);

    const buttonRefs = useRef(
        Array(Sections.length).fill(undefined)
    );

    const visualState = useMemo(() => {
        if(buttonRefs.current && buttonRefs.current[0]) {
            const buttons = buttonRefs.current;
            const buttonW = buttons[0] && buttons[0].offsetWidth;
            const appBar = buttons[0].parentNode.parentNode;
            const appBarHeight = appBar && appBar.clientHeight;
            const cStyle = window.getComputedStyle(appBar, null);
            const leftPadding = cStyle.getPropertyValue('padding-left');
            const xPositions = buttons.map(b => b.offsetLeft + buttonW / 2 );

            return {
                appBarHeight,
                leftPadding,
                xPositions,
                buttonW
            };
        }
        else return {};
    }, [vpW, vpH, pathname, buttonRefs.current?.[0]]);

    console.log('visualState ->', visualState);

    // set of callbacks to set individual refs
    // (to prevent 2x renders in SectionButtons)

    const refRetrievers = useMemo(() =>
        buttonRefs.current.map((_,i) => el => buttonRefs.current[i] = el, [] ),
    [buttonRefs.current[0]]);

    const {
        appBarHeight,
        buttonW,
        xPositions,
        leftPadding
    } = visualState;

    return (
        <StyledAppBar className={ fadeContainerClass } data-id={ 'app-header' }>
            <SectionHighlighter
                sectionIndex={ (pathIndex != -1) ? pathIndex: 1 }
                isSubsection={ pathIndex == -1 }
                vpW={ vpW }
                buttonXs={ xPositions }
                leftPadding={ leftPadding }
                buttonW={ buttonW }
                appBarHeight={ appBarHeight } // needed for browser issues
            />
            <Toolbar className={ classes.toolbar }>
                <div
                    className={ classes.leftIconsWrapper }
                    data-id={ 'app-header-nav' }
                > { Sections.map((s, i) =>
                    (
                        <HeaderSectionButton
                            key={ `headerSectionButton${s.name}` }
                            name={ s.name }
                            disabled={ false }
                            iconPath={ s.iconPath }
                            tooltipText={ s.getTooltipText() }
                            onClick={ SectionClickEvents[i] }
                            buttonDivRef={ refRetrievers[i] }
                        />
                    ))}
                </div>
                <div className={ classes.centerPadder } />
                <div className={ classes.rightContainer }>
                    <Typography
                        className={ `md-maximum ${classes.myNameText}` }
                        variant={ 'h3' }
                    >Robert Concepción III
                    </Typography>
                    <ThemeButton />
                </div>
            </Toolbar>
        </StyledAppBar>
    );
}
