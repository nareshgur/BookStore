import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmDeleteBook = () => {
  const { id, title } = useParams(); // Get book ID and title from URL
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  // Fetch the book details when the component loads
  useEffect(() => {
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((response) => {
        if (response.data.title === title) {
          setBook(response.data);
        } else {
          setBook(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
        setBook(null); // Ensure no details are shown if book not found
      });
  }, [id, title]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      axios
        .delete(`http://localhost:3000/books/${id}`)
        .then(() => {
          alert("Book deleted successfully!");
          navigate("/"); // Redirect back to home page
        })
        .catch((error) => {
          console.error("Error deleting book:", error);
          alert("Failed to delete the book. Check the details and try again.");
        });
    }
  };

  const handleCancel = () => {
    navigate("/"); // Redirect back to home page
  };

  if (!book) return <p>Book not found or incorrect details provided.</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Are you sure you want to delete this book?</h2>
      <p><strong>Title:</strong> {book.title}</p>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Pages:</strong> {book.pages}</p>
      <p><strong>Published Date:</strong> {book.publishedDate}</p>
      <button onClick={handleDelete} style={{ marginRight: "10px", color: "white", backgroundColor: "red" }}>
        Confirm Delete
      </button>
      <button onClick={handleCancel} style={{ color: "white", backgroundColor: "gray" }}>
        Cancel
      </button>
    </div>
  );
};

export default ConfirmDeleteBook;
