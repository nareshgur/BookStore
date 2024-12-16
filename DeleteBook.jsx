import React, { useState } from "react";
import "./deleteBook.css";

const DeleteBook = () => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");

  const handleDeleteClick = async () => {
    if (!id || !title) {
      alert("Please enter both Book ID and Title to delete.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Book with ID ${id} deleted successfully.`);
        setId("");
        setTitle("");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("An error occurred while deleting the book.");
    }
  };

  return (
    <div className="delete-container">
      <h3>Delete Book</h3>
      <input
        type="text"
        placeholder="Book ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleDeleteClick}>Delete Book</button>
    </div>
  );
};

export default DeleteBook;
