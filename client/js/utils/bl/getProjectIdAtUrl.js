const SECTION_ROOT = '/projects';

const getProjectIdAtUrl = location => (  
    !(location.pathname == SECTION_ROOT || 
        location.pathname == '/'
    ) ?
    location.pathname.substr(SECTION_ROOT.length+1) : -1
);

export default getProjectIdAtUrl