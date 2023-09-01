import express from 'express';
import { PORT, MONGODB_URL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';

const app = express();

// display the 'Welcome ...' message when the user visits the
// localhost:5555/ page
app.get('/', (req, res) => {
    return res.status(200).send('Welcome to MERN stack tutorial');
})

// Route to save a new book
app.post('/books', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
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