const mongoose = require('mongoose');
const projectSchema = require('./../schemas/projectSchema');
const { Model } = mongoose;

export default Model(projectSchema);