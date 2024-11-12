const Book = require('../models/Book');

exports.addBook = (req, res) => {
    const { title, author, genre, year } = req.body;
    Book.create(title, author, genre, year, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Book added!', id: result.insertId });
    });
};

exports.updateBook = (req, res) => {
    const { id } = req.params;
    const { title, author, genre, year } = req.body;
    Book.update(id, title, author, genre, year, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({ message: 'Book updated!' });
    });
};

exports.deleteBook = (req, res) => {
    const { id } = req.params;
    Book.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({ message: 'Book deleted!' });
    });
};

exports.getBooks = (req, res) => {
    const { page = 1, limit = 10, genre = '', author = '' } = req.query;
    Book.fetchAll(page, limit, genre, author, (err, books) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json(books);
    });
};
