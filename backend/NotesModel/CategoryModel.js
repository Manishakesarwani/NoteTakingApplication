const mongoose = require("mongoose");

const schema = mongoose.Schema;

const CategoryModel = new schema({
    UserID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },
    Category:{
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("CategoryModel", CategoryModel);