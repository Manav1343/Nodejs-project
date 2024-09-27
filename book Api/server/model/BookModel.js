const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
    {
        book_name: {
            type: String,
            required: true,
            trim: true
        },
        book_codeNumber: {
            type: Number,
            required: true
        },
        book_auther: {
            type: String,
            unique: true,
            // require: false, //by default 
        },
        book_reting: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        book_prise: {
            type: String,
            unique: true,
            required: true
        }
    },
    { timestamps: true }
)

const Book = model('Book', bookSchema)
module.exports = Book