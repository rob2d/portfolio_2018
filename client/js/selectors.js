import { createSelector } from 'reselect';
import AppSections from 'constants/AppSections';

const { SectionIndexes, Sections } = AppSections;

export const getVisitedPathIndex = state => {
    const { pathname } = state.router.location;

    switch (pathname) {
        case Sections[1].basePath :
            return SectionIndexes.PROJECTS;
        case Sections[2].basePath :
            return SectionIndexes.MISC;
        case Sections[3].basePath :
            return SectionIndexes.CV;
        case Sections[0].basePath :
            return SectionIndexes.WELCOME;
        default :
            return -1;
    }
};

export const visitedPathIndex = createSelector(getVisitedPathIndex, v => v);
