import React, { useState } from 'react';
import axios from 'axios';
import './addEditBook.css';

const AddEditBook = ({ edit = false, bookId }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    pages: '',
    publishedDate: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = edit
      ? `http://localhost:3000/books/${bookId}`
      : 'http://localhost:3000/books';
    const method = edit ? 'put' : 'post';

    axios[method](url, formData)
      .then(() => alert('Book saved successfully!'))
      .catch(error => console.error('Error saving book:', error));
  };

  return (
    <div className="form-container">
      <h2>{edit ? 'Edit Book' : 'Add Book'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <input name="author" value={formData.author} onChange={handleChange} placeholder="Author" required />
        <input name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" />
        <input name="pages" value={formData.pages} onChange={handleChange} placeholder="Pages" type="number" />
        <input name="publishedDate" value={formData.publishedDate} onChange={handleChange} placeholder="Published Date" type="date" />
        <button type="submit">{edit ? 'Update Book' : 'Add Book'}</button>
      </form>
    </div>
  );
};

export default AddEditBook;
