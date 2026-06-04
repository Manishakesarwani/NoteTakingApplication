import React, { useEffect, useRef } from 'react'
import Note from '../components/Note'
import { useGetNotes } from '../hooks/useGetNotes'
import { useNotesContext } from '../hooks/useNotesContext';

const Home = () => {
  const {error, loading, handleGetNotes} = useGetNotes();
  const {notes} = useNotesContext();

  const hasFetched = useRef(false);

  useEffect(()=>{
    if(!hasFetched.current){
      handleGetNotes();
      hasFetched.current=true;
    }
    
    // eslint-disable-next-line
  }, []);

  return (
    <div className='main'>
        <div className='container-fluid'>
          {error && <div className='blank_container'>{error}☹️</div>}
          {loading && <div>Loading...</div>}
          {notes && notes.map((n)=> <Note key={n._id} category={n.CategoryID.Category} title={n.Title} content={n.Content} />)}
            {/* <Note category="Category" title="Title" content="Content" /> */}
        </div>
    </div>
  )
}

export default Home