import React, { useMemo, lazy, Suspense } from 'react';
/**
 * lazily loads a component with a provided resolver
 * (so that webpack can use magic import via comment
 * in caller) and content for loading screen;
 * take note that this memoizes component being loaded
 *
 * @param {Function} resolver
 * @param {Function} loadingContent
 * @param {Boolean} watchResolver flag to watch resolver for memoization
 */
export default function useLazyComponent(resolver, loadingContent, watchResolver=false) {
    const Component = useMemo(() => lazy(resolver), [watchResolver && resolver]);

    return () => (
        <Suspense fallback={ loadingContent }>
            <Component />
        </Suspense>
    );
}
