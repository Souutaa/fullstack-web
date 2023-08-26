import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Post = () => {
  let { id } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:5000/posts/byId/${id}`).then((res) => {
      setPost(res.data);
    });
  }, []);

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{post.title}</div>
          <div className="body">{post.postText}</div>
          <div className="footer">{post.username}</div>
        </div>
      </div>
      <div className="rightSide">Comment Section</div>
    </div>
  );
};

export default Post;
