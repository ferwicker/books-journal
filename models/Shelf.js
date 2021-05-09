const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ShelfSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    books: [String]
});

const Shelf = mongoose.model("Shelf", ShelfSchema);

module.exports = Shelf;