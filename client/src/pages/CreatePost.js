import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"; //dùng thư viện form có sẵn
import axios from "axios";
import * as Yup from "yup"; //tạo ràng buộc cho entities's properties
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  let history = useNavigate();
  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input your title"),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:5000/posts", data).then((res) => {
      history("/");
    });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Long...)"
          />
          <label>postText: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex. dâd...)"
          />
          <label>username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. Lodâdng...)"
          />
          <button type="submit">Create a Post</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePost;
