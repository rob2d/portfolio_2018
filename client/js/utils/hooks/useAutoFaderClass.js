import { useState, useEffect } from 'react';
import wait from '../wait';
import useFadeContainerClass from './useFadeContainerClass';

const DEFAULT_FADETIME = 320;

export default function useAutoFaderClass(fadeTime=320, fadeInDelay=0) {
    const [isShown, setShown] = useState(() => false);
    const fadeContainerClass = useFadeContainerClass(fadeTime, isShown);

    // wait is needed even with no fadeInDelay to
    // let thread process for CSS sticky anims/reflow/repaint

    useEffect(() => {
        wait(fadeInDelay).then(() => setShown(true));
        return () => wait(fadeInDelay).then(() => setShown(false));
    }, []);

    return fadeContainerClass;
}
