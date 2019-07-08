const SECTION_ROOT = '/projects';

const getProjectIdOfUrl = location => (  
    !(location.pathname == SECTION_ROOT || 
        location.pathname == '/'
    ) ?
    location.pathname.substr(SECTION_ROOT.length+1) : undefined
);

export const projectIdOfUrl = state => getProjectIdOfUrl(state.router.location);

export default { projectIdOfUrl }