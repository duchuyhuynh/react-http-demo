import React, { useState, useEffect } from 'react'
import axios from 'axios'
import classes from './App.module.css'

const App = () => {
  const [comments, setComments] = useState([])
  const [commentValue, setCommentValue] = useState('')
  const [userValue, setUserValue] = useState('')
 
  useEffect(() => {
    axios.get('http://localhost:3000/comments')
      .then(response => {
        setComments(response.data)
      })
  }, [])

  const renderComments = () => comments.map(comment => (
    <div key={comment.id} className={classes.Comment}>
      <div className={classes.comment_content}>
        <h5>{comment.user}</h5>
        <p>{comment.comment}</p>
      </div>
      <button onClick={() => deleteComment(comment.id)}>Delete</button>
    </div>
  ))

  const deleteComment = id => {
    axios.delete('http://localhost:3000/comments/' + id)
      .then(() => setComments(prev => prev.filter(el => el.id !== id)))
  }

  const onSubmitForm = e => {
    e.preventDefault()
    axios.post('http://localhost:3000/comments', { user: userValue, comment: commentValue })
      .then(response => {
        setCommentValue('')
        setUserValue('')
        setComments(prev => [...prev, response.data])
      })
  }

  return (
    <div className={classes.App}>
      <h1>React Review</h1>
      <div className={classes.review_container}>{ renderComments() }</div>
      <div className={classes.form_container}>
        <form onSubmit={onSubmitForm} id="cmtForm">
          <div>
            <label htmlFor="username">User</label>
            <input id="username" type="text" onChange={e => setUserValue(e.target.value)} value={userValue} />
          </div>
          <div>
            <label htmlFor="comment">Comment</label>
            <textarea id="comment" form="cmtForm" onChange={e => setCommentValue(e.target.value)} value={commentValue} />
          </div>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
