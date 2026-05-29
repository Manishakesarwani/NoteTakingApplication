const mongoose = require("mongoose");

const schema = mongoose.Schema;

const NotesModel = new schema({
    CategoryID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CategoryModel",
        required: true
    },
    Title:{
        type: String,
        required: true
    },
    Content:{
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("NotesModel", NotesModel)