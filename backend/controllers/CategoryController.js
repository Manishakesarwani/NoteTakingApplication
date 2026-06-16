const CategoryModel = require("../NotesModel/CategoryModel");
const NotesModel = require("../NotesModel/NotesModel");

exports.getAllCategories = async (req, res) => {
    const id = req.user._id;
    const categories = await CategoryModel.find({UserID: id}).sort({createdAt: -1});

    
    if(categories.length<1){
        return res.status(400).json({error: "No Categories present in the system!"});
    }
    else{
        return res.status(200).json(categories);
    }
}

exports.getNotesFromCategory = async(req,res) => {
    const {id} = req.params;

    if(!id){
        return res.status(400).json({error: "ID not found!"});
    }
    else{
        const notes = await NotesModel.find({
            UserID: req.user._id,
            CategoryID: id
        }).sort({createdAt: -1})
        .populate("CategoryID", "Category");

        if(notes.length<1){
            return res.status(400).json({error: "No notes present under this category in the system!"});
        }
        else{
            return res.status(200).json(notes);
        }
    }
}

exports.removeCategory = async(req, res) => {
    const {id} = req.params;

    if(!id){
        return res.status(400).json({error: "Please share ID of the category to be updated."});
    }
    else{
        const category = await CategoryModel.find({
            UserID: req.user._id,
            _id: id
        });
        if(category.length<1){
            return res.status(400).json({error: "This category is not present in the system."});
        }
        else{
            const notes = await NotesModel.find({
                UserID: req.user._id,
                CategoryID: id
            });
            if(notes.length>0){
                await NotesModel.deleteMany({
                    UserID: req.user._id,
                    CategoryID: id
                });
            }
            const deletedCat = await CategoryModel.findOneAndDelete({_id: id});
            return res.status(200).json({deletedCat});
        }
    }
}