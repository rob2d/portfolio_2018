const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
    type    : {
        type : String,
        match : /video|image/,
        trim  : true
    },
    src     : String,
    thumb   : String,
    videoId : String
});