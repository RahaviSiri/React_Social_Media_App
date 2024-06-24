import React from 'react'
import { useParams,Link } from 'react-router-dom'

const PagePost = ({posts,handleDelete}) => {
  const {id} =  useParams();
  const post = posts.find(post => (post.id).toString() === id);
  return (
    <main className="PostPage">
      <article className="post">
        {post && 
          <>
            <h2>{post.title}</h2>
            <div className="postDate">{post.datetime}</div>
            <div className="postBody">{post.body}</div>
            <button className='deleteButton' onClick={() => handleDelete(post.id)}>Delete Post</button>
          </>
        }
        {!post &&
        <>
          <h2>Post Not Found</h2>
          <p>Well that is disappointing</p>
          <p><Link to='/'>Visit Our Homepage</Link></p>
        </>
        }
      </article>
    </main>
  )
}

export default PagePost