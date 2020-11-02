import { useMemo, useCallback, useRef, useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import SkillOrbs from './SkillOrbs';

/**
 * generates handlers and content needed
 * for canvas ref that will manage a
 * 3D skills orbit scene
 */
export default function useSkillOrbsScene() {
    const theme = useTheme();
    const containerRef = useRef();
    const [isHighlighted, setHighlighted] = useState(() => false);
    const scene = useMemo(() => new SkillOrbs(theme), []);

    const onMouseEnter = useCallback( e => setHighlighted(true), []);
    const onMouseLeave = useCallback( e => setHighlighted(false), []);

    // callbacks

    useEffect(() => { scene.setHighlighted(isHighlighted) }, [isHighlighted]);
    useEffect(() => { scene.setTheme(theme) }, [theme]);

    // setup/teardown

    useEffect(() => {
        scene.onMount(containerRef?.current);
        if(containerRef?.current) {
            containerRef.current.addEventListener('mouseenter', onMouseEnter);
            containerRef.current.addEventListener('mouseleave', onMouseLeave);
        }

        return () => {
            scene.onUnmount();

            if(containerRef?.current) {
                containerRef.current.removeEventListener('mouseenter', onMouseEnter);
                containerRef.current.removeEventListener('mouseleave', onMouseLeave);
            }
        };
    }, []);

    return [containerRef, isHighlighted];
}
