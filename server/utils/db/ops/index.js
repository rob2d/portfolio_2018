const getEntries            = require('./getEntries');
const upsertData            = require('./upsertData');
const deleteData            = require('./deleteData');
const paginateDBCursor      = require('./paginateDBCursor');
const xformPaginatedResults = require('./xformPaginatedResults');

module.exports = {
    upsertData,
    deleteData,
    getEntries,
    xformPaginatedResults,
    paginateDBCursor
};