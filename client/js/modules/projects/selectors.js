const SECTION_ROOT = '/projects';

const getProjectIdOfUrl = ({ pathname }) => (
    !((pathname == SECTION_ROOT) || (pathname == '/')) ?
        pathname.substr(SECTION_ROOT.length+1) : undefined
);

export const projectIdOfUrl = state => getProjectIdOfUrl(state.router.location);
export default { projectIdOfUrl };
