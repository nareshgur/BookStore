import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./editBook.css";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Replaces useHistory
  const [book, setBook] = useState({ title: "", author: "", genre: "", pages: "", publishedDate: "" });

  useEffect(() => {
    axios.get(`http://localhost:3000/books/${id}`)
      .then((response) => setBook(response.data))
      .catch((error) => console.error("Error fetching book details:", error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/books/${id}`, book)
      .then(() => navigate(`/books/${id}`)) // Navigate after editing
      .catch((error) => console.error("Error updating book:", error));
  };

  return (
    <div className="edit-book-container">
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={book.title} onChange={handleInputChange} required />

        <label>Author:</label>
        <input type="text" name="author" value={book.author} onChange={handleInputChange} required />

        <label>Genre:</label>
        <input type="text" name="genre" value={book.genre} onChange={handleInputChange} required />

        <label>Pages:</label>
        <input type="number" name="pages" value={book.pages} onChange={handleInputChange} required />

        <label>Published Date:</label>
        <input type="date" name="publishedDate" value={book.publishedDate} onChange={handleInputChange} required />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditBook;
