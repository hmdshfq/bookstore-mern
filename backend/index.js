import express from 'express';
import { PORT, MONGODB_URL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';

const app = express();

// Middleware
app.use(express.json());
app.use('/books', booksRoute);

// display the 'Welcome ...' message when the user visits the
// localhost:5555/ page
app.get('/', (req, res) => {
    return res.status(200).send('Welcome to MERN stack tutorial');
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