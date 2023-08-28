import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useHistory } from "react-router-dom";
const Home = () => {
  const [listPosts, setListPosts] = useState([]);
  let history = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:5000/posts").then((res) => {
      setListPosts(res.data);
    });
  }, []);

  return (
    <div>
      {listPosts.map((value, key) => {
        return (
          <div
            key={key}
            className="post"
            onClick={() => {
              history(`/posts/${value.id}`);
            }}
          >
            <div className="title"> {value.title}</div>
            <div className="body"> {value.postText}</div>
            <div className="footer"> {value.username}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
