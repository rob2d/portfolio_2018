import React, { useMemo, useCallback, lazy, Suspense } from 'react';
/**
 * lazily loads a component with a provided resolver
 * (so that webpack can use magic import via comment
 * in caller) and content for loading screen;
 * take note that this memoizes component being loaded
 *
 * @param {Function} resolver
 * @param {Function} loadingContent
 */
export default function useLazyComponent(resolver, loadingContent) {
    const Component = useMemo(() => lazy(resolver), []);

    const returnValue = useCallback(() => (
        <Suspense fallback={ loadingContent }>
            <Component />
        </Suspense>
    ), [Component]);

    return returnValue;
}
