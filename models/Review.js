const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    bookid: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    reviewText: {
        type: String
    }
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;