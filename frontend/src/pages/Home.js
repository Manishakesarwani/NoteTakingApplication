import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useEffect, useState } from 'react'
import Note from '../components/Note'
import { useGetNotes } from '../hooks/useGetNotes'
import { useNotesContext } from '../hooks/useNotesContext';
import CreateNoteButton from '../components/CreateNoteButton';
import { useUserAuthenticateContext } from '../hooks/useUserAuthenticateContext';
import Swal from 'sweetalert2';
import {Link, useNavigate} from "react-router-dom";
import { useCategoryRemove } from '../hooks/useCategoryRemove';
import RenameCategory from '../page_component/RenameCategory';

const Home = () => {
  const {error, loading, handleGetNotes} = useGetNotes();
  const {notes} = useNotesContext();
  const {user} = useUserAuthenticateContext();
  const {handleDeleteCategoryApi} = useCategoryRemove();

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [catName, setCatName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tempCatName, setTempCatName] = useState(catName);

  const navigate = useNavigate();


  useEffect(()=>{
    if(user){
      handleGetNotes(selectedCategoryId);
    }
    // eslint-disable-next-line
  }, [user,selectedCategoryId]);

  useEffect(() => {
  if (!selectedCategoryId) {
    setCatName("");
  }
}, [selectedCategoryId]);

const handleDeleteCategory = (e) => {
    e.preventDefault();

    // console.log(nid);
    Swal.fire({
    title: 'Are you sure?',
    text: "This category along with all the notes within this category will be permanently removed.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    // Execution ONLY proceeds inside this block if 'Yes' is clicked
    if (result.isConfirmed) {
      // handleDeleteConfirm();
      // console.log(selectedCategoryId);
      handleCategoryDeleteConfirm();
    }
  });
    
  }

  const handleCategoryDeleteConfirm = async() => {
    await handleDeleteCategoryApi(selectedCategoryId);
    navigate("/");
    setCatName("");
    setSelectedCategoryId("");
    await handleGetNotes("");
  }

  const handleEditCategory = (e) => {
    e.preventDefault();

    setIsEditing(true);
    setTempCatName(catName);
    // console.log(selectedCategoryId);
  }

  return (
    <div className='main'>
        <CreateNoteButton onSelectCategory={setSelectedCategoryId} activeCategory={selectedCategoryId} handleGetNotes={handleGetNotes} setcatname={setCatName} />
        <div className={selectedCategoryId ? `container-fluid active_category` : `container-fluid`}>
          {selectedCategoryId && (
            <div className='category_header'>
              <div className='dropdown'>
              <div className='category_name'>
                {isEditing ? (
                  <RenameCategory catname={catName} setcatname={setCatName} setisediting={setIsEditing} activeCategory={selectedCategoryId} handleGetNotes={handleGetNotes} tempname={tempCatName} />
                ) : (
                  <>
                  <span className='category_text'>{catName}</span>
                  <i className="bi bi-three-dots-vertical dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/" onClick={handleEditCategory}>Rename Category</Link></li>
                    <li><Link className="dropdown-item" to="/" onClick={handleDeleteCategory} >Remove Category</Link></li>
                </ul>
                </>
                )}
              </div>
              <hr />
            </div>
            </div>
          )}
          <div className='notes'>
            {error && <div className='blank_container'>{error}☹️</div>}
            {loading && <div>Loading...</div>}
           {!error && notes.length>0 && notes.map((n)=> <Note key={n._id} nid={n._id} category={n.CategoryID.Category} title={n.Title} content={n.Content} activeCategory={selectedCategoryId} handleGetNotes={handleGetNotes} setcatname={setCatName} onSelectCategory={setSelectedCategoryId} />)}
            {/* <Note category="Category" title="Title" content="Content" /> */}
          </div>
        </div>
    </div>
  )
}

export default Home