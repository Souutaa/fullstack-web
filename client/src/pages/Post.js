import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const Post = () => {
  //let history = useNavigate();
  let { id } = useParams();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);
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
      .post(
        `http://localhost:5000/comments`,
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          // khi người dùng tạo 1 comment thì ngay sau khi gọi API hệ thống sẽ kiểm tra headers xem có token trùng với token user đã đăng nhập hay không.
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: res.data.username,
          };
          setComment([...comment, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:5000/comments/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        setComment(
          comment.filter((val) => {
            return val.id != id;
          })
        );
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
                <label> Username: {comment.username}</label>
                {authState.username === comment.username && (
                  <button
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
