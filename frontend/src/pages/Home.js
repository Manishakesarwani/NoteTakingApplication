import React, { useEffect } from 'react'
import Note from '../components/Note'
import { useGetNotes } from '../hooks/useGetNotes'
import { useNotesContext } from '../hooks/useNotesContext';
import CreateNoteButton from '../components/CreateNoteButton';
import { useUserAuthenticateContext } from '../hooks/useUserAuthenticateContext';

const Home = () => {
  const {error, loading, handleGetNotes} = useGetNotes();
  const {notes} = useNotesContext();
  const {user} = useUserAuthenticateContext();


  useEffect(()=>{
    if(user){
      handleGetNotes();
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className='main'>
        <CreateNoteButton />
        <div className='container-fluid'>
          {error && <div className='blank_container'>{error}☹️</div>}
          {loading && <div>Loading...</div>}
          {!error && notes && notes.map((n)=> <Note key={n._id} nid={n._id} category={n.CategoryID.Category} title={n.Title} content={n.Content} />)}
            {/* <Note category="Category" title="Title" content="Content" /> */}
        </div>
    </div>
  )
}

export default Home