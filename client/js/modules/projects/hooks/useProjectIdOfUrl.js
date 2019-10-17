import { useMemo } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';

const SECTION_ROOT = '/projects';

export default function useProjectIdOfUrl() {
    const location = useLocation();
    const match = useRouteMatch('/projects(/:projectId)?');
    const { pathname } = location;

    const result = useMemo(() => {
        const projectId = !(
            (pathname == SECTION_ROOT) ||
            (pathname == '/')
        ) ? pathname.substr(SECTION_ROOT.length+1) : undefined;

        return [projectId, location, match];
    }, [pathname]);

    return result;
}
