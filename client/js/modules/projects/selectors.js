import defineSelector from 'utils/defineSelector'

const SECTION_ROOT = '/projects';

const getProjectIdOfUrl = location => (  
    !(location.pathname == SECTION_ROOT || 
        location.pathname == '/'
    ) ?
    location.pathname.substr(SECTION_ROOT.length+1) : undefined
);

export const projectIdOfUrl = (state, { location }) => (
    getProjectIdOfUrl(location)
);


export default { 
    projectIdOfUrl
}