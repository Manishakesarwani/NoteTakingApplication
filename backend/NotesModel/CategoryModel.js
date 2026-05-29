const mongoose = require("mongoose");

const schema = mongoose.Schema;

const CategoryModel = new schema({
    Category:{
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true});

module.exports = mongoose.model("CategoryModel", CategoryModel);