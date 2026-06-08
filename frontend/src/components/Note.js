import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Link} from "react-router-dom";

const Note = ({nid, category, title, content}) => {

  const handleUpdate= async(e) => {
    e.preventDefault();
    console.log(nid);
  }

  const handleRemove= async(e) => {
    e.preventDefault();
    console.log(nid);
  }

  return (
    <div className='note'>
      <div className='dropdown'>
        <i className="bi bi-three-dots-vertical dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>
        <ul className="dropdown-menu">
          <li><Link  data-bs-toggle="modal" data-bs-target="#NoteUpdateForm" className="dropdown-item" to="/" onClick={handleUpdate}>Update</Link></li>
          <li><Link  data-bs-toggle="modal" data-bs-target="#NoteUpdateForm" className="dropdown-item" to="/" onClick={handleRemove}>Remove</Link></li>
        </ul>
      </div>
        <div className='main_content'>
            <h5 className='title'>{title}</h5>
            <hr />
            <div className='content'>{content}</div>
        </div>
        <span className='category'>{category}</span>


        <div className='modal fade' id="NoteUpdateForm" tabIndex="-1" aria-labelledby="NoteUpdate" aria-hidden="true">
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1 className="modal-title fs-5" id="NoteUpdate"><i className="bi bi-pencil-square"></i> Update Note</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className='modal-body'>
                        <h1>{nid}</h1>
                    </div>
                    <div className='modal-footer'>
                        <button id='cancel' type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Note