import { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useUpdateNotesContent } from "../hooks/useUpdateNotesContent";

const UpdateContent = ({nid,setNoteComp}) => {

    const [newContent, setNewContent] = useState("");
    const {loading, handleUpdateNotes} = useUpdateNotesContent();
    
    const handleUpdateContent = async(e) => {
        e.preventDefault();
    
        // console.log(nid);
        await handleUpdateNotes(nid, newContent,setNoteComp);
        setNewContent("");
        // category
    }

  return (
    <div className="update">
        <form onSubmit={handleUpdateContent}>
            <div className="input_fields">
                <label htmlFor="content"><i className="bi bi-pencil-square"></i> Content</label>
                <textarea id="content" value={newContent} onChange={(e)=>setNewContent(e.target.value)}></textarea>
            </div>
            <div>
                <button type="submit" disabled={loading}>{loading ? "Updating" : "Update Content"}</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateContent