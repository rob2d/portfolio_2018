const sectionOrderDict = {
    about: 1,
    projects: 2,
    misc: 3,
    cv: 4
};

module.exports = {
    appBar: {
        sectionButton: s => (
            `[data-id=app-header-nav] > div:nth-child(${sectionOrderDict[s]})`
        )
    },
    page: {
        content: () => `[data-id=page-content]`
    }
};
