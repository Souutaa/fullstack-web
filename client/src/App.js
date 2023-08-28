import "./App.css";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost.js";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Restration from "./pages/Restration";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Link to="/">Home Page</Link>
          <Link to="/createpost">Create a Post</Link>
          <Link to="/login">Login</Link>
          <Link to="/registration">Registration</Link>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Restration />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
