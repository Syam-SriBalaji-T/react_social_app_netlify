import DataContext from './context/DataContext';
import { useContext } from 'react';

const NewPost = () => {
  const {handleSubmit, postTitle, setPostTitle, postBody, setPostBody} = useContext(DataContext)

  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input 
          id="postTitle"
          type="text" 
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />

        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          type="text"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)} 
        />

        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default NewPost;