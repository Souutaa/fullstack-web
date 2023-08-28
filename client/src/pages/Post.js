import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Post = () => {
  let history = useNavigate();
  let { id } = useParams();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:5000/posts/byId/${id}`).then((res) => {
      setPost(res.data);
    });
    axios.get(`http://localhost:5000/comments/${id}`).then((res) => {
      setComment(res.data);
    });
  }, []);

  const addComment = (data) => {
    axios
      .post(`http://localhost:5000/comments`, {
        commentBody: newComment,
        PostId: id,
      })
      .then((res) => {
        const commentToAdd = { commentBody: newComment };
        setComment([...comment, commentToAdd]);
        setNewComment("");
      });
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{post.title}</div>
          <div className="body">{post.postText}</div>
          <div className="footer">{post.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              addComment();
            }}
          >
            Add Comment
          </button>
        </div>
        <div className="ListOfComments">
          {comment.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
