import Header from "./Header";
import NavBar from "./NavBar";
import Home from "./Home";
import Post from "./Post";
import PagePost from "./PagePost";
import About from "./About";
import Missing from "./Missing";
import Footer from "./Footer";
import {useState,useEffect} from "react";
import { format } from "date-fns";
import { Routes,Route, useNavigate} from "react-router-dom";
import api from "./api/posts";
import useWindowSize from "./hooks/useWindowSize";

function App() {
  const [posts,setPosts] = useState([]);
  const [search,setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const navigate = useNavigate();
  const {width} = useWindowSize();


  useEffect (() => {
    const fetchPosts = async () => {
      try{
        const response = await api.get('');
        setPosts (response.data);
      }
      catch (err) {
        if(err. response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }
        else{
          console.log('Error: ${err-message}');
        }
      }
    }
    fetchPosts ();
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd,yyyy pp');
    const newPost = { id, title: postTitle, datetime,body:postBody};
    const response = await api.post("", newPost)
    // const allPosts = [...posts, newPost]; before using response.
    const allPosts = [...posts, response.data];
    setPosts(allPosts);
    setPostTitle("");
    setPostBody("");
  }

  const handleDelete = async (id) => {
    try{
      await api.delete(`${id}`)
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
      navigate('/');
    }
    catch(err){
      console.log(`Error: ${err.message} occured`);
    }
  }

  useEffect(() => {
    const filteredResults = posts.filter((post) => ((post.body).toLowerCase()).includes(search.toLowerCase())
    || ((post.title).toLowerCase()).includes(search.toLowerCase()));
    setSearchResults(filteredResults.reverse());
  },[posts,search])

  return (
    <div className="App">

      <Header
        title = "Social Media App"
        width = {width}
      />
      <NavBar
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element = {<Home posts = {searchResults}/>}></Route>
        <Route path="/post">
          <Route index element =  {<Post 
          postitle={postTitle}
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody}
          handleSubmit={handleSubmit}/>}></Route>
          <Route path = ":id" element = {<PagePost posts = {posts} handleDelete = {handleDelete}/>}></Route>
        </Route>
        <Route path = "/about" element = {<About/>}></Route>  
        <Route path = "*" element = {<Missing/>}></Route>    
      </Routes>
      
      <Footer/>
      


      {/* <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/post">Post</Link></li>
          <li><Link to="/pagepost">PostPage</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/missing">Missing</Link></li>
          <li><Link to="/footer">Footer</Link></li> 
        </ul>
      </nav>

      <Routes>
        <Route index element = {<Home/>}/>
        <Route path="/post" element = {<Post/>}/>
        
        <Route path="/pagepost">
          <Route path="" element = {<PostLayout/>}/>
          <Route path=":id" element = {<Posting/>}/>
          <Route path="post" element = {<Posting/>}/>
        </Route> 

        <Route path="/pagepost" element = {<PagePost/>}/>
        <Route path="/pagepost/:id" element = {<Posting/>}/>
        <Route path="/pagepost/post" element = {<Posting/>}/>

        <Route path="/about" element = {<About/>}/>
        <Route path="*" element = {<Missing/>}/>
        <Route path="/footer" element = {<Footer/>}/>
      </Routes>*/}

    </div>
  );
}

export default App;
