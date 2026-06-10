import { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useUpdateNotesTitle } from "../hooks/useUpdateNotesTitle";

const UpdateTitle = ({nid,setNoteComp}) => {

    const [newTtl, setNewTtl] = useState("");
    const {loading, handleUpdateNotes} = useUpdateNotesTitle();
    
    const handleUpdateTitle = async(e) => {
        e.preventDefault();
    
        // console.log(nid);
        await handleUpdateNotes(nid, newTtl,setNoteComp);
        setNewTtl("");
        // category
    }

  return (
    <div className="update">
        <form onSubmit={handleUpdateTitle}>
            <div className="input_fields">
                <label htmlFor="ttl"><i className="bi bi-pencil-square"></i> Title</label>
                <input type="text" placeholder="Please mention Title." id="ttl" value={newTtl} onChange={(e)=>setNewTtl(e.target.value)} />
            </div>
            <div>
                <button type="submit" disabled={loading}>{loading ? "Updating" : "Update Title"}</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateTitle