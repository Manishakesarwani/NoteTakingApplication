import { useNavigate, useLocation, useParams } from "react-router-dom"
import UpdateCategory from "../page_component/UpdateCategory";
import UpdateTitle from "../page_component/UpdateTitle";
import UpdateContent from "../page_component/UpdateContent";
import { useState } from "react";

const UpdateNotes = () => {

    const {nid} = useParams();
    const location=useLocation();

    const navigate = useNavigate();

    const [noteComp, setNoteComp] = useState(location.state || {});

    const handleBack = (e) => {
      e.preventDefault();
      navigate("/");
    }


  return (
    <div className="main update_note">
        <div className="container-fluid">
          <div className='note'>
            <div className='main_content'>
                <h5 className='title'>{noteComp.title}</h5>
                <hr />
                <div className='content'>{noteComp.content}</div>
            </div>
            <span className='category'>{noteComp.category}</span>
          </div>
          <div className="note_components">
            <UpdateCategory nid={nid} setNoteComp={setNoteComp} />
            <UpdateTitle nid={nid} setNoteComp={setNoteComp} />
            <UpdateContent nid={nid} setNoteComp={setNoteComp} />
          </div>
          <div className="back_button">
            <button type="button" onClick={handleBack}>Back</button>
          </div>
        </div>
    </div>
  )
}

export default UpdateNotes