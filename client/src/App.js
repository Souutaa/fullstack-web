import "./App.css";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost.js";
import Post from "./pages/Post";
function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Link to="/createpost">Create a Post</Link>
          <Link to="/">Home Page</Link>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
