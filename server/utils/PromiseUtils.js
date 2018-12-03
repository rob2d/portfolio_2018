module.exports = {
    runInSeries : methods => {
        return methods.reduce((promise, method) =>
            promise.then( result =>
                method().then(
                    Array.prototype.concat.bind(result)
                )
            ),
            Promise.resolve([])
        )
    }
};