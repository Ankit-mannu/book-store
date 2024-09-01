const express = require('express');
const { createBook, getBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController');
const { authorization } = require('../middlewares/authMiddleware');
const router = express.Router();



{/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * security:
 *   - bearerAuth: []
 *
 * /api/books/:
 *   post:
 *     summary: Create a new book
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Great Gatsby"
 *               author:
 *                 type: string
 *                 example: "F. Scott Fitzgerald"
 *               genre:
 *                 type: string
 *                 example: "Fiction"
 *               publishedDate:
 *                 type: string
 *                 format: date
 *                 example: "1925-04-10"
 *     responses:
 *       200:
 *         description: Successfully created a new book.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "5f5b5f5b5f5b5f5b5f5b5f5b"
 *                 title:
 *                   type: string
 *                   example: "The Great Gatsby"
 *                 author:
 *                   type: string
 *                   example: "F. Scott Fitzgerald"
 *                 genre:
 *                   type: string
 *                   example: "Fiction"
 *                 publishedDate:
 *                   type: string
 *                   format: date
 *                   example: "1925-04-10"
 *       401:
 *         description: Authorization error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No token, authorization denied"
 */

router.route('/').post(authorization, createBook);

/**
     * @swagger
     * /api/books/:
     *   get:
     *     summary: Get a list of books.
     *     description: Retrieve books based on title, author, genre, and apply pagination.
     *     parameters:
     *       - in: query
     *         name: title
     *         schema:
     *           type: string
     *         description: The title of the book.
     *         example: Science
     *       - in: query
     *         name: author
     *         schema:
     *           type: string
     *         description: The author of the book.
     *         example: John Doe
     *       - in: query
     *         name: genre
     *         schema:
     *           type: string
     *         description: The genre of the book.
     *         example: Fiction
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *           default: 1
     *         description: The page number for pagination.
     *         example: 1
     *       - in: query
     *         name: pageSize
     *         schema:
     *           type: integer
     *           default: 10
     *         description: The number of books per page.
     *         example: 10
     *     responses:
     *       200:
     *         description: A list of books with pagination details.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 books:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       _id:
     *                         type: string
     *                         description: The book ID.
     *                       title:
     *                         type: string
     *                         description: The title of the book.
     *                       author:
     *                         type: string
     *                         description: The author of the book.
     *                       genre:
     *                         type: string
     *                         description: The genre of the book.
     *                       description:
     *                         type: string
     *                         description: A brief description of the book.
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: Server error
     */
    router.route('/').get(getBooks);


/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Retrieve a book by ID
 *     description: Fetches a book's details using its unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the book.
 *         schema:
 *           type: string
 *           example: "60c72b2f4f1a4f9d2d6d3d6c"
 *     responses:
 *       200:
 *         description: Successfully retrieved the book details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60c72b2f4f1a4f9d2d6d3d6c"
 *                   description: The unique identifier of the book.
 *                 title:
 *                   type: string
 *                   example: "The Great Gatsby"
 *                   description: The title of the book.
 *                 author:
 *                   type: string
 *                   example: "F. Scott Fitzgerald"
 *                   description: The author of the book.
 *                 genre:
 *                   type: string
 *                   example: "Fiction"
 *                   description: The genre of the book.
 *                 publishedDate:
 *                   type: string
 *                   format: date
 *                   example: "1925-04-10"
 *                   description: The published date of the book.
 *       404:
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Book not found"
 *                   description: The error message when the book with the specified ID does not exist.
 *       400:
 *         description: Invalid ID format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid book ID format"
 *                   description: The error message when the ID format is invalid.
 */

router.route('/:id').get(getBookById);


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * security:
 *   - bearerAuth: []
 *
 * /api/books/{id}:
 *   put:
 *     summary: Update an existing book
 *     description: Updates the details of a book identified by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the book to be updated.
 *         schema:
 *           type: string
 *           example: "60c72b2f4f1a4f9d2d6d3d6c"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Great Gatsby"
 *                 description: "The title of the book."
 *               author:
 *                 type: string
 *                 example: "F. Scott Fitzgerald"
 *                 description: "The author of the book."
 *               genre:
 *                 type: string
 *                 example: "Fiction"
 *                 description: "The genre of the book."
 *               publishedDate:
 *                 type: string
 *                 format: date
 *                 example: "1925-04-10"
 *                 description: "The published date of the book in YYYY-MM-DD format."
 *     responses:
 *       200:
 *         description: Successfully updated the book.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60c72b2f4f1a4f9d2d6d3d6c"
 *                   description: "The unique identifier of the book."
 *                 title:
 *                   type: string
 *                   example: "The Great Gatsby"
 *                   description: "The title of the book."
 *                 author:
 *                   type: string
 *                   example: "F. Scott Fitzgerald"
 *                   description: "The author of the book."
 *                 genre:
 *                   type: string
 *                   example: "Fiction"
 *                   description: "The genre of the book."
 *                 publishedDate:
 *                   type: string
 *                   format: date
 *                   example: "1925-04-10"
 *                   description: "The published date of the book."
 *       400:
 *         description: Invalid ID or request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request data"
 *                   description: "The error message when the ID format is incorrect or the request body is invalid."
 *       401:
 *         description: Authorization error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No token, authorization denied"
 *                   description: "The error message when no valid authorization token is provided."
 *       404:
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Book not found"
 *                   description: "The error message when the book with the specified ID does not exist."
 */

router.route('/:id').put(authorization, updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Retrieve a book by ID
 *     description: Fetches a book's details using its unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the book.
 *         schema:
 *           type: string
 *           example: "60c72b2f4f1a4f9d2d6d3d6c"
 *     responses:
 *       200:
 *         description: Successfully retrieved the book details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60c72b2f4f1a4f9d2d6d3d6c"
 *                   description: The unique identifier of the book.
 *                 title:
 *                   type: string
 *                   example: "The Great Gatsby"
 *                   description: The title of the book.
 *                 author:
 *                   type: string
 *                   example: "F. Scott Fitzgerald"
 *                   description: The author of the book.
 *                 genre:
 *                   type: string
 *                   example: "Fiction"
 *                   description: The genre of the book.
 *                 publishedDate:
 *                   type: string
 *                   format: date
 *                   example: "1925-04-10"
 *                   description: The published date of the book.
 *       404:
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Book not found"
 *                   description: The error message when the book with the specified ID does not exist.
 *       400:
 *         description: Invalid ID format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid book ID format"
 *                   description: The error message when the ID format is invalid.
 */

router.route('/:id').delete(authorization, deleteBook);

module.exports = router;
}
