import {useParams, Link} from 'react-router-dom';
import DataContext from './context/DataContext';
import { useContext } from 'react';

const PostPage = () => {
  const {posts, handleDelete} = useContext(DataContext);

  const {id} = useParams();
  const post = posts.find(i => (i.id).toString() === id);

  return (
    <main className="PostPage">
      <article className="post">
        { post &&
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>

            <Link to={`/post/edit/${post.id}`}> <button className='editButton'> Edit Post </button> </Link>
            <button className='deleteButton' onClick={()=> handleDelete(post.id)}>Delete Post</button>
          </>
        }

        {!post &&
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's diappointing</p>
            <Link to='/' className='VisitHome'>Visit Our Homepage</Link>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage