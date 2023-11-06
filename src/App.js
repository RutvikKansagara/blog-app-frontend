import './App.css';

import Login from "./pages/user/Login";
import Signup from './pages/user/Signup';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UpdateProfile from "./pages/user/UpdateProfile";
import CreateBlog from './pages/blog/CreateBlog';
import EditBlog from './pages/blog/EditBlog';
import AllBlogs from './pages/blog/AllBlogs';
import YourBlogs from './pages/blog/YourBlogs';
import BlogDetails from './pages/blog/BlogDetails';
import SearchResults from './pages/blog/SearchResults';

// import Home from "./components/Home";




function App() {
  return (
    <>
    <Router>
       <Header/>
       <Routes>
        
        <Route exact path="/" element={<Login/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/register" element={<Signup/>}></Route>
        
        
      <Route exact path="/your-blogs/blog/edit/:blogId" element={<><EditBlog /></>}></Route>
      <Route exact path="/update-profile/:userId" element={<><UpdateProfile /></>}></Route>
      <Route exact path="/blog/create" element={<> <CreateBlog /></>}></Route>
      <Route exact path="/all-blogs" element={<><AllBlogs /> </>}></Route>
      <Route exact path="/your-blogs" element={<><YourBlogs /> </>}></Route>
      <Route exact path="/your-blogs/blog/:blogId" element={<><BlogDetails /> </>}></Route>
      <Route exact path="/search" element={<><SearchResults /></>}></Route> 
       </Routes>
       
      </Router>
    </>
  );
}

export default App;
