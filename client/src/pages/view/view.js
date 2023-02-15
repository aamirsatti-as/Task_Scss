import React, { useState, useEffect } from "react";
import "./view.scss";
import axios from "axios";
import Navbar from "../navbar/navbar";
import { ToastContainer, toast } from "react-toastify";
import { Modal, ModalBody } from "react-bootstrap";
const View = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [findItem, setFindItem] = useState("");
  const [modalData, setModalData] = useState("");
  const [editId, setEditId] = useState(null);

  //To display all the notes record in the table
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let result = await fetch("http://localhost:5000/viewNotes");
    console.log(result);
    result = await result.json();
    setData(result);
  };

  // This will seach the specific element for editing
  const searchEditItem = async (id) => {
    console.log(id);
    console.log(data);
    const find = data.filter((arr) => {
      return arr._id == id;
    });
    if (find) setEditId(id);
    setFindItem(find[0]);
    setModalData(find[0]);
  };

  //This is for the edit fields in the modal
  const handleModalChange = (e) =>
    setModalData({ ...modalData, [e.target.name]: e.target.value });

  // Backend Api cal for updating the notes
  const submitEdit = async (e) => {
    e.preventDefault();
    const title = modalData.title;
    const category = modalData.category;
    const description = modalData.description;
    const data = { title, category, description };
    if (editId) {
      const res = await axios.put(
        "http://localhost:5000/updateNotes/" + editId,
        {
          data,
        }
      );
      console.log(res);
      setShow(false);
      toast(res.data.message);
      fetchData();
    }
  };

  //Backend API call For deleting the note
  const submitDelete = async (d_id) => {
    const response = await axios.delete(
      `http://localhost:5000/deleteNotes/` + d_id
    );
    console.log(response.data.message);
    toast(response.data.message);
    fetchData();
  };
  return (
    <>
      <Navbar />
      <h1>View All Notes</h1>
      <table class="styled-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Description</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((result) => (
            <tr key={result.title}>
              <td>{result.title}</td>
              <td>{result.category}</td>
              <td>{result.description}</td>
              <td>
                <button
                  className="styled-button"
                  onClick={(e) => {
                    e.preventDefault();
                    searchEditItem(result._id);
                    setShow(true);
                  }}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="styled-button2"
                  onClick={() => submitDelete(result._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal that will pop up for editing */}
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        <ModalBody>
          <form className="form" onSubmit={submitEdit}>
            <div className="form__group">
              <label htmlFor="email">Note Title:</label>
              <input
                type="title"
                id="title"
                name="title"
                defaultValue={findItem.title}
                onChange={handleModalChange}
                required
              />
            </div>
            <div className="form__group">
              <label htmlFor="name">Note Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                defaultValue={findItem.description}
                onChange={handleModalChange}
                required
              />
            </div>

            <div className="form__group">
              <label htmlFor="message">Description:</label>
              <textarea
                id="description"
                name="description"
                defaultValue={findItem.category}
                onChange={handleModalChange}
                required
              />
            </div>
            <button type="submit" className="form__submit-button">
              Submit
            </button>
          </form>
        </ModalBody>
      </Modal>

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

export default View;
