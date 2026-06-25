import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useRef, useState } from 'react';
import useCreateNote from '../hooks/useCreateNote';
import Categories from './Categories';

const CreateNoteButton = ({onSelectCategory, activeCategory, handleGetNotes, setcatname}) => {

    const {loading, createNote} = useCreateNote();

    const [cat, setCat] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const modalRef = useRef(null);


    useEffect(() => {
    // 1. Grab the modal element from the DOM
    const modalElement = document.getElementById('NoteCreationForm');
    if (!modalElement) return;

    // 2. Define the cleanup handler to remove focus right before hiding
    const handleHide = () => {
      if (document.activeElement) {
        document.activeElement.blur(); // Drops focus from the cancel button immediately
      }
    };

    // 3. Bind Bootstrap's native hiding event listener
    modalElement.addEventListener('hide.bs.modal', handleHide);

    // 4. Always return a cleanup function to prevent memory leaks in React
    return () => {
      modalElement.removeEventListener('hide.bs.modal', handleHide);
    };
  }, []); // Run once on component mount


    const handleCreation = async(e) => {
        e.preventDefault();

        // console.log("test");
        await createNote(cat, title, content);

        // window.location.reload();
        const dismiss_btn = document.getElementById('cancel');
        dismiss_btn.click();

        await handleGetNotes(activeCategory);

        setCat("");
        setTitle("");
        setContent("");
    }

  return (
    <div className='createButton'>
        <button type='button' data-bs-toggle="modal" data-bs-target="#NoteCreationForm"><i className="bi bi-pencil-square"></i> Create</button>
        <div ref={modalRef} className='modal fade' id="NoteCreationForm" tabIndex="-1" aria-labelledby="NoteCreation" aria-hidden="true">
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1 className="modal-title fs-5" id="NoteCreation"><i className="bi bi-pencil-square"></i> New Note</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className='modal-body'>
                        <form id="note-form" onSubmit={handleCreation}>
                            <div>
                                <label htmlFor='category'>Category</label>
                                <input type='text' placeholder='Please mention Category.' value={cat} onChange={(e)=>setCat(e.target.value)} id='category' />
                            </div>
                            <div>
                                <label htmlFor='title'>Title</label>
                                <input type='text' id='title' placeholder='Please mention title.' value={title} onChange={(e)=>setTitle(e.target.value)} />
                            </div>
                            <div>
                                <label>Content</label>
                                <textarea value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
                            </div>
                        </form>
                    </div>
                    <div className='modal-footer'>
                        <button id='cancel' type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" form='note-form' className="btn btn-primary" disabled={loading}>{loading ? "Creating" : "Create"}</button>
                    </div>
                </div>
            </div>
        </div>
        <Categories onSelectCategory={onSelectCategory} setcatname={setcatname} />
    </div>
  )
}

export default CreateNoteButton