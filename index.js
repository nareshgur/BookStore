import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// SQLite Database Connection
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');

    // Create the books table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        genre TEXT,
        pages INTEGER,
        publishedDate TEXT
      )`,
      (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
        } else {
          console.log('Table created or already exists.');
        }
      }
    );
  }
});

// Home Route
app.get('/', (req, res) => {
  res.send('Welcome to the Book Management API!');
});

// GET /books - Retrieve all books
app.get('/books', (req, res) => {
  db.all('SELECT * FROM books', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// GET /books/:id - Retrieve a book by ID
app.get('/books/:id', (req, res) => {
  const query = 'SELECT * FROM books WHERE id = ?';
  db.get(query, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(row);
  });
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
  const { title, author, genre, pages, publishedDate } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  const query = `INSERT INTO books (title, author, genre, pages, publishedDate) VALUES (?, ?, ?, ?, ?)`;
  const params = [title, author, genre, pages, publishedDate];

  db.run(query, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// PUT /books/:id - Update a book
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author, genre, pages, publishedDate } = req.body;

  const query = `UPDATE books SET title = ?, author = ?, genre = ?, pages = ?, publishedDate = ? WHERE id = ?`;
  const params = [title, author, genre, pages, publishedDate, bookId];

  db.run(query, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book updated successfully' });
  });
});

// DELETE /books/:id - Delete a book
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  db.run(`DELETE FROM books WHERE id = ?`, [bookId], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: "Book not found" });
    res.json({ message: `Book with ID ${bookId} deleted successfully` });
  });
});


// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
