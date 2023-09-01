import mongoose from 'mongoose';

// Create a book schema that tells the mongodb what kind of 
// table to create in the database. In this schema we have 
// four columns title, author, publish year, and timestamps
const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Book = mongoose.model('Book', bookSchema);