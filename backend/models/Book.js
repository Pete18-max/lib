const db = require('../config/db');

const Book = {
    create: (title, author, genre, year, callback) => {
        const sql = 'INSERT INTO books (title, author, genre, year) VALUES (?, ?, ?, ?)';
        db.query(sql, [title, author, genre, year], callback);
    },
    update: (id, title, author, genre, year, callback) => {
        const sql = 'UPDATE books SET title = ?, author = ?, genre = ?, year = ? WHERE id = ?';
        db.query(sql, [title, author, genre, year, id], callback);
    },
    delete: (id, callback) => {
        const sql = 'DELETE FROM books WHERE id = ?';
        db.query(sql, [id], callback);
    },
    fetchAll: (page, limit, genre, author, callback) => {
        const sql = 'SELECT * FROM books WHERE genre LIKE ? AND author LIKE ? LIMIT ?, ?';
        db.query(sql, [`%${genre}%`, `%${author}%`, (page - 1) * limit, limit], callback);
    }
};

module.exports = Book;
