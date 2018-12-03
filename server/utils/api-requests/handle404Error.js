module.exports = function({ req, res }) {
    console.error(`404 occured while requesting ${req.path}`);
    res.status(404).send('404: Resource requested was not found');
};