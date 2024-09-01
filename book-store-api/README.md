# Bookstore API

## Overview

A simple RESTful API for managing a bookstore, built using Express.js and MongoDB. The API supports CRUD operations for books, user authentication, and provides search and pagination functionality.

## Features

- **CRUD Operations** for books
- **User Authentication** with JWT
- **Search & Filtering** by title, author, genre
- **Pagination** for listing books

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Ankit-mannu/book-store.git
    ```

2. Navigate to the project directory:

    ```bash
    cd bookstore-api
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add your environment variables:

    ```plaintext
    PORT=5000
    MONGO_URI="mongodb://127.0.0.1:27017/bookstore"
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    ```

5. Start the server:

    ```bash
    npm start
    ```

## Running Tests

To run the tests using Jest:

```bash
npm test

api - documentation also created with swagger

http://localhost:5000/api-docs
