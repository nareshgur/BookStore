import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './bookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Replaced useHistory with useNavigate
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((response) => setBook(response.data))
      .catch((error) => console.error('Error fetching book details:', error));
  }, [id]);

  const handleEditClick = () => {
    navigate(`/edit-book/${id}`); // Updated to use navigate
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="book-details-container">
      <h2>{book.title}</h2>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre}
      </p>
      <p>
        <strong>Pages:</strong> {book.pages}
      </p>
      <p>
        <strong>Published Date:</strong> {book.publishedDate}
      </p>
      <button className="edit-button" onClick={handleEditClick}>
        Edit Book
      </button>
    </div>
  );
};

export default BookDetails;
