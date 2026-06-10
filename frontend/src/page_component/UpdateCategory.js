import { useState } from "react"
import { useUpdateNotes } from "../hooks/useUpdateNotes";
import 'bootstrap-icons/font/bootstrap-icons.css';
const UpdateCategory = ({nid,setNoteComp}) => {

    const [newCat, setNewCat] = useState("");
    const {loading, handleUpdateNotes} = useUpdateNotes();

    const handleUpdateCategory = async(e) => {
        e.preventDefault();

        // console.log(nid);
        await handleUpdateNotes(nid, newCat,setNoteComp);
        setNewCat("");
        // category
    }
  return (
    <div className="update">
        <form onSubmit={handleUpdateCategory}>
            <div className="input_fields">
                <label htmlFor="cat"><i className="bi bi-pencil-square"></i> Category</label>
                <input type="text" placeholder="Please mention Category." id="cat" value={newCat} onChange={(e)=>setNewCat(e.target.value)} />
            </div>
            <div>
                <button type="submit" disabled={loading}>{loading ? "Updating" : "Update Category"}</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateCategory