const mongoose = require('mongoose');
const mediaSchema = require('./mediaSchema');
const { Schema, Model } = mongoose;

module.exports = new Schema({
    namespace : {
        type        : String, 
        uniqueIndex : true,
        trim        : true,
        lowercase   : true
    },
    year             : String,
    media            : [ mediaSchema ], 
    mediaAspectRatio : Number,
    links            : [ String ],
    documentation    : [ String ],
    sourceCode       : [ String ]
});

export default Model(projectSchema);