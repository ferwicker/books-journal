const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TagSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    books: [String]
});

const Tag = mongoose.model("Tag", TagSchema);

module.exports = Tag;