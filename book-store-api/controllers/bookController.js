const Book = require('../models/bookModel');
const { validateBookInput } = require('../utils/validateInput');

const createBook = async (req, res) => {
    const { error } = validateBookInput(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const { title, author, genre, publishedDate } = req.body;
    try {
        const book = new Book({
            title,
            author,
            genre,
            publishedDate,  
        });
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getBooks = async (req, res) => {
    const { title, author, genre, page, pageSize } = req.query;
    const query = {};

    if (title) query.title = new RegExp(title, 'i');
    if (author) query.author = new RegExp(author, 'i');
    if (genre) query.genre = new RegExp(genre, 'i');

    try {
        const books = await Book.find(query)
            .skip((page - 1) * pageSize)
            .limit(parseInt(pageSize));

        const totalBooks = await Book.countDocuments(query);
        const totalPages = Math.ceil(totalBooks / pageSize);

        res.json({
            books,
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.status(200).json({book});
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const updateBook = async (req, res) => {
    try {
        const { error } = validateBookInput(req.body);
    
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.status(200).json({book});
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { createBook, getBooks, getBookById, updateBook, deleteBook };
