const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

function generatePasswordHash(password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(SALT_WORK_FACTOR, (error, salt) => {
            if(error) {
                reject(error);
            } else {
                bcrypt.hash(password, salt, (error, hash) => {
                    if(error) { reject(error) } 
                    else { resolve(hash) }
                });
            }
        });
    });
}

module.exports = generatePasswordHash;