import React from 'react'

const Note = ({category, title, content}) => {
  return (
    <div className='note'>
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