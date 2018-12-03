const bcrypt = require('bcrypt');

function verifyPasswordHash (password, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (isValid => {
            resolve(isValid);
        }));
    });
}

module.exports = verifyPasswordHash;
