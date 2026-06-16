const CategoryModel = require("../NotesModel/CategoryModel");
const NotesModel = require("../NotesModel/NotesModel");
const UserModel = require("../NotesModel/UserModel");


exports.getAllNotes = async (req, res) => {
    const id = req.user._id;
    const notes = await NotesModel.find({UserID: id}).sort({createdAt: -1})
    .populate("CategoryID", "Category");

    
    if(notes.length<1){
        return res.status(400).json({error: "No notes present in the system!"});
    }
    else{
        return res.status(200).json(notes);
    }
}

exports.createNote = async(req, res) => {
    const {category, title, content} = req.body;

    if(!category || !title || !content){
        return res.status(400).json({error: "Please mention all the fields."});
    }
    else{
        const trimmedCategory = category.trim();
        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();

        const categoryRegex = /^[a-zA-Z0-9 _-]+$/;
        const titleRegex = /^[a-zA-Z _-]+$/;

        if(!trimmedCategory || !trimmedTitle || !trimmedContent){
            return res.status(400).json({error: "Fields cannot consist of only blank spaces."})
        }
        else if(trimmedCategory.length > 15){
            return res.status(400).json({error: "Category cannot exceed 15 characters."});
        }
        else if(trimmedTitle.length > 25){
            return res.status(400).json({error: "Title cannot exceed 25 characters."});
        }
        else if(!categoryRegex.test(trimmedCategory)){
            return res.status(400).json({error: "Category can only contain letters, numbers, spaces, hyphens, and underscores."});
        }
        else if(!titleRegex.test(trimmedTitle)){
            return res.status(400).json({error: "Title can only contain letters, spaces, hyphens, and underscores."});
        }

        const isCategoryExists = await CategoryModel.find({
            UserID: req.user._id,
            Category: { $regex: new RegExp(`^${trimmedCategory}$`, 'i') }
        });

        if(isCategoryExists.length > 0){
            const newNote = await NotesModel.create({
                UserID: req.user._id,
                CategoryID: isCategoryExists[0]._id,
                Title: trimmedTitle,
                Content: trimmedContent
            });
            return res.status(200).json(newNote);
        }
        else{
            const newCat = await CategoryModel.create({
                UserID: req.user._id,
                Category: trimmedCategory
            });
            const newNote = await NotesModel.create({
                UserID: req.user._id,
                CategoryID: newCat._id,
                Title: trimmedTitle,
                Content: trimmedContent
            });
            return res.status(200).json(newNote);
        }
    }
}

exports.updateNoteContent = async(req, res)=>{
    const {id} = req.params;
    const {content} = req.body;

    if(!id){
        return res.status(400).json({error: "Please share ID of the note to be updated."});
    }
    else{
        const note = await NotesModel.findById(id);
        const trimmedContent = content.trim();

        if(!note){
            return res.status(400).json({error: "No note found!"});
        }
        else if(!content){
            return res.status(400).json({error: "Please mention the content to be updated."});
        }
        else if(!trimmedContent){
            return res.status(400).json({error: "Fields cannot consist of only blank spaces."})
        }
        else if(note.Content.toLowerCase() === trimmedContent.toLowerCase()){
            return res.status(400).json({error: "Content should not be same as the existing one."});
        }
        else{
            const updatedNote = await NotesModel.findOneAndUpdate({_id: note._id}, {
                Content: trimmedContent
            }, {returnDocument: 'after'});
            return res.status(200).json(updatedNote);
        }
    }
}

exports.updateNoteTitle = async(req, res)=>{
    const {id} = req.params;
    const {title} = req.body;

    if(!id){
        return res.status(400).json({error: "Please share ID of the note to be updated."});
    }
    else{
        const note = await NotesModel.findById(id);
        const trimmedTitle = title.trim();
        const titleRegex = /^[a-zA-Z _-]+$/;

        if(!note){
            return res.status(400).json({error: "No note found!"});
        }
        else if(!title){
            return res.status(400).json({error: "Please mention the title to be updated."});
        }
        else if(!trimmedTitle){
            return res.status(400).json({error: "Title cannot consist of only blank spaces."})
        }
        else if(trimmedTitle.length > 25){
            return res.status(400).json({error: "Title cannot exceed 25 characters."});
        }
        else if(!titleRegex.test(trimmedTitle)){
            return res.status(400).json({error: "Title can only contain letters, spaces, hyphens, and underscores."});
        }
        else if(note.Title.toLowerCase() === trimmedTitle.toLowerCase()){
            return res.status(400).json({error: "Title should be different than the existing one."});
        }
        else{
            const updatedNote = await NotesModel.findOneAndUpdate({_id: note._id}, {
                Title: trimmedTitle
            }, {returnDocument: 'after'});
            return res.status(200).json(updatedNote);
        }
    }
}

exports.updateNoteCategory = async(req, res)=>{
    const {id} = req.params;
    const {category} = req.body;

    if(!id){
        return res.status(400).json({error: "Please share ID of the note to be updated."});
    }
    else{
        const trimmedCategory = category.trim();
        const categoryRegex = /^[a-zA-Z0-9 _-]+$/;
        const note = await NotesModel.findById(id);

        if(!note){
            return res.status(400).json({error: "No note found!"});
        }
        else if(!category){
            return res.status(400).json({error: "Please mention the category to be updated."});
        }
        else if(!trimmedCategory){
            return res.status(400).json({error: "Category cannot contain blank spaces."});
        }
        else if(trimmedCategory.length > 15){
            return res.status(400).json({error: "Category cannot exceed 15 characters."});
        }
        else if(!categoryRegex.test(trimmedCategory)){
            return res.status(400).json({error: "Category can only contain letters, numbers, spaces, hyphens, and underscores."});
        }  
        else{
            const isCategoryExists = await CategoryModel.find({
                UserID: req.user._id,
                Category: { $regex: new RegExp(`^${trimmedCategory}$`, 'i') }
            });
            if(isCategoryExists.length > 0){
                // console.log(note.CategoryID, isCategoryExists[0]._id);
                if(note.CategoryID.equals(isCategoryExists[0]._id)){
                    return res.status(400).json({error: "Category should be different than existing one."});
                }
                const updatedNote = await NotesModel.findOneAndUpdate({_id: note._id}, {
                    UserID: req.user._id,
                    CategoryID: isCategoryExists[0]._id
                }, {returnDocument: 'after'});
                return res.status(200).json(updatedNote);
            }
            else{
                const newCat = await CategoryModel.create({
                    UserID: req.user._id,
                    Category: trimmedCategory
                });
                const updatedNote = await NotesModel.findOneAndUpdate({_id: note._id}, {
                    UserID: req.user._id,
                    CategoryID: newCat._id
                }, {returnDocument: 'after'});
                return res.status(200).json(updatedNote);
            }
            
        }
    }
}

exports.removeNote = async(req, res) => {
    const {id} = req.params;

    if(!id){
        return res.status(400).status({error: "Please share ID of the note to be updated."});
    }
    else{
        const note = await NotesModel.findById(id);

        if(!note){
            return res.status(400).json({error: "No note found!"});
        }
        else{
            const note_r = await NotesModel.findOneAndDelete({_id: note._id});
            return res.status(200).json(note_r);
        }
    }
}
