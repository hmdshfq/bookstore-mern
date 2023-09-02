import express from 'express';
import { PORT, MONGODB_URL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';

const app = express();

// Middleware
app.use(express.json());

// display the 'Welcome ...' message when the user visits the
// localhost:5555/ page
app.get('/', (req, res) => {
    return res.status(200).send('Welcome to MERN stack tutorial');
})

// Route to save a new book
// use Postman to send a request to http://localhost:5555 with body in raw json form
// For example, we can send the following object in the body
// {
//      "title": "Harry Potter and the Philosopher's Stone",
//      "author": "J.K. Rowling",
//      "publishYear": "1997"
// }
app.post('/books', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook);

        return res.status(200).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})


// Get all books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// Get a single book
app.get('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// Update a book
app.put('/books/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, and publishYear'
            })
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).send({message: 'Book not found!'})
        }
        return res.status(200).send({message: 'Book updated successfully!'});
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
})

// Delete a book
app.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Book not found!' });
        }
        return res.status(200).send({ message: 'Book deleted successfully!' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
})

// Connect to mongodb database
mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        })
    })
    .catch(error => console.log(error));