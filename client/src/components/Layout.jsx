import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav>
        <ul className='navbar'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Search Books</Link></li>
          <li><Link to="/add-book">Add Book</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/delete">Delete</Link></li>
        </ul>
      </nav>
      {/* Page Content */}
      <div>
        {children}
      </div>
    </div> 
  );
};

export default Layout;
