import { LOCATION_CHANGE } from 'react-router-redux/reducer'
import { Sections } from 'constants/AppSections'
import { projects } from 'strings'

const SITE_NAME = `Rob's Portfolio`;

const routeTitleMapper = store => next => action =>
{   
    // if we detect an action of route changing,
    // label section appropriately

    if(action.type == LOCATION_CHANGE) {
        const { pathname } = action.payload;
        let pathIndex = Sections.findIndex((s)=>(s.basePath == pathname));
        if(pathIndex != -1) {
            window.document.title = `${SITE_NAME} -- ${Sections[pathIndex].name}`; 
        } else if(pathname.indexOf('projects/') != -1) {
            const projectId = pathname.substr(10, pathname.length); // cut off /projects/
            const projectIndex = projects.projectData.findIndex((p)=>(p.id==projectId));
            window.document.title = `${SITE_NAME} -- ${projects.projectData[projectIndex].title}`;
        }
    }
    return next(action);
};

export default routeTitleMapper;