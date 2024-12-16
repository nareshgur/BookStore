import React from "react";
import "./homePage.css";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="header">
        <h1>Welcome to the Book Management System</h1>
        <p>
          Effortlessly manage your book collection with our intuitive and user-friendly platform. 
          Add, edit, and delete books with ease!
        </p>
        <a href="/add-book" className="cta-button">
          Get Started
        </a>
      </header>

      <section className="features">
        <div className="feature-card">
          <h2>Add Books</h2>
          <p>Keep your book catalog updated by adding new titles, authors, and genres.</p>
        </div>
        <div className="feature-card">
          <h2>Edit Details</h2>
          <p>Update the book details anytime, ensuring accurate and up-to-date information.</p>
        </div>
        <div className="feature-card">
          <h2>Delete Books</h2>
          <p>Remove outdated or unnecessary books seamlessly from your collection.</p>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Book Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
