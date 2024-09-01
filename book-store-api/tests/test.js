const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/userModel');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});
let token;
describe('Auth API', () => {
    it('should register a user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ username: 'testuser', password: 'testpassword' });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    it('should login a user', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'testpassword' });
            token = response.body.token;
            // console.log(response)
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    });
    let bookId;
    it('should create a book', async () => {
        const response = await request(app)
            .post('/api/books')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test Book', author: 'Test Author', genre: 'Test Genre',publishedDate: '2000-10-10' });
            bookId = response.body._id
            // console.log(bookId)
        expect(response.status).toBe(201);
        expect(bookId).toBeDefined();
    });
    
    it('should get all books', async () => {
        const response = await request(app).get('/api/books');
        expect(response.status).toBe(200);
       
    });
    it('should get books filtered by title', async () => {
        const title = 'Science';
        const response = await request(app).get(`/api/books?title=${title}`);
        expect(response.status).toBe(200);
    });
    it('should get books filtered by author', async () => {
        const author = 'John Doe';
        const response = await request(app).get(`/api/books?author=${author}`);
        expect(response.status).toBe(200);
    });
    it('should get books filtered by genre', async () => {
        const genre = 'Fiction';
        const response = await request(app).get(`/api/books?genre=${genre}`);
        expect(response.status).toBe(200);
    });
                
    it('should get book details by id', async () => {
        const response = await request(app)
            .get(`/api/books/${bookId}`)

        expect(response.status).toBe(200);
    });
    it('should update an existing book', async () => {
        const response = await request(app)
            .put(`/api/books/${bookId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'The Great Gatsby - Updated',
                author: 'F. Scott Fitzgerald',
                genre: 'Classic',
                publishedDate: '1925-04-11'
            });

        expect(response.status).toBe(200);
    });
    it('should delete a book', async () => {
        const response = await request(app)
            .delete(`/api/books/${bookId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Book deleted successfully');
    });
});
