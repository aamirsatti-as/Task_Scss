import React, { useState } from "react";
import "./add.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../navbar/navbar"; 

//changes
const Add = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //API call to backend for adding the note
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data={title, category, description}
    const response=await axios.post("http://localhost:5000/addNotes", data);
    toast(response.data.message)
  };

  return (
    
    <>
    <Navbar/>
    
      <form className="form" onSubmit={handleSubmit}>
        <h1>Add Note</h1>
        <div className="form__group">
          <label htmlFor="email">Note Title:</label>
          <input
            type="title"
            id="title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div className="form__group">
          <label htmlFor="name">Note Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          />
        </div>

        <div className="form__group">
          <label htmlFor="message">Description:</label>
          <textarea
            id="message"
            name="message"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>
        <button type="submit" className="form__submit-button">
          Submit
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Add;
