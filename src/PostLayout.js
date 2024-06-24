import React from 'react'
import { Link, Outlet } from 'react-router-dom'


const PostLayout = () => {
  return (
    <>
        <Link to="/pagepost/1">Post 1</Link>
        <br></br>
        <Link to="/pagepost/2">Post 2</Link>
        <br></br>
        <Link to="/pagepost/3">Post 3</Link>
        <br />
        <Link to="/pagepost/post">Newpost</Link>
        <Outlet/>
    </>
  )
}

export default PostLayout