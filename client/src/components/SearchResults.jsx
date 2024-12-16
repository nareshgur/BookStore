import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './searchResults.css';

const SearchResults = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <ul className="book-list">
        {books.map(book => (
          <li key={book.id} className="book-card">
            <div>
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
            </div>
            <a href={`/books/${book.id}`}>Details</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
