import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./helpers/AuthContext";
import CreatePost from "./pages/CreatePost.js";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Restration from "./pages/Restration";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: res.data.username,
            id: res.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };
  return (
    <>
      <div className="App">
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <BrowserRouter>
            <Link to="/">Home Page</Link>
            <Link to="/createpost">Create a Post</Link>
            {!authState.status ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/registration">Registration</Link>
              </>
            ) : (
              <button
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </button>
            )}

            <h3>{authState.username}</h3>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/createpost" element={<CreatePost />} />
              <Route path="/posts/:id" element={<Post />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Restration />} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </div>
    </>
  );
}

export default App;
