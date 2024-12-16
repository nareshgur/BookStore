import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import SearchResults from './components/SearchResults';
import BookDetails from './components/BookDetails';
import AddEditBook from './components/AddEditBook';
import DeleteBook from './components/DeleteBook';
import EditBook from './components/EditBook';
// import ConfirmDeleteBook from './components/ConfirmDeleteBook';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/add-book" element={<AddEditBook />} />
          <Route path="/delete" element={<DeleteBook />} />
          <Route path="/about" element={<h2>About Page</h2>} />
          <Route path="/edit-book/:id" element={<EditBook />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
