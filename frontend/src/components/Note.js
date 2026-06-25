import 'bootstrap-icons/font/bootstrap-icons.css';
import {Link, useNavigate} from "react-router-dom";
import { useNoteRemove } from '../hooks/useNoteRemove';
import Swal from 'sweetalert2';

const Note = ({nid, category, title, content, activeCategory, handleGetNotes, setcatname}) => {

  const {handleDeleteNote} = useNoteRemove();
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.preventDefault();

    // console.log(nid);
    Swal.fire({
    title: 'Are you sure?',
    text: "This note will be permanently removed.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    // Execution ONLY proceeds inside this block if 'Yes' is clicked
    if (result.isConfirmed) {
      handleDeleteConfirm();
    }
  });
    
  }
  const handleDeleteConfirm = async() => {
    await handleDeleteNote(nid);
    // window.location.reload();
    // console.log(cid);
    // await handleGetNotes(activeCategory);
    navigate("/");
    setcatname("");
    await handleGetNotes("");
  }


  return (
    <div className='note'>
      <div className='dropdown'>
        <i className="bi bi-three-dots-vertical dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>
        <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to={`/update/${nid}`} state={{category, title, content}} >Update</Link></li>
          <li><Link className="dropdown-item" to="/" onClick={handleDelete} >Remove</Link></li>
        </ul>
      </div>
        <div className='main_content'>
            <h5 className='title'>{title}</h5>
            <hr />
            <div className='content'>{content}</div>
        </div>
        <span className='category'>{category}</span>
    </div>
  )
}

export default Note