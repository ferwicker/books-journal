const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: false
    },
    snippet: {
        type: String,
        required: false
    },
    shelves: [String]
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;