const Book = require('../model/BookModel');

//POST BOOK DATA
const store = async (req, res) => {
    try {
        const { book_name, book_codeNumber, book_auther, book_reting, book_prise } = req.body;
        const user = await Book.create({
            book_name, book_codeNumber, book_auther, book_reting, book_prise
        })
        if (user) {
            res.json({
                success: true,
                message: ' Book record has been inserted 👌'
            })
        } else {
            res.json({
                success: false,
                message: "something wrong 😒"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

//GET BOOK DATA
const index = async (req, res) => {
    try {
        const user = await Book.find()
        if (user) {
            res.json({
                success: true,
                user
            })
        } else {
            res.json({
                success: false,
                records: "no recordes"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

//PUT BOOK DATA
const update = async (req, res) => {
    try {
        // const id = req.params.id;
        const { id } = req.params;
        const { book_name, book_codeNumber, book_auther, book_reting, book_prise } = req.body;
        const user = await Book.findByIdAndUpdate(
            {
                _id: id
            },
            {
                book_name, book_codeNumber, book_auther, book_reting, book_prise
            }
        )
        if (user) {
            res.json({
                success: true,
                message: "record has been updated"
            })
        } else {
            res.json({
                success: false,
                message: "Book Record not found"
            })
        }
    } catch (error) {
        res.json(error.message)
    }
}

//DELETE BOOK DATA
const trash = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Book.findByIdAndDelete(id)
        if (user) {
            res.json({
                success: true,
                message: " Book Record deleted 😢"
            })
        } else {
            res.json({
                success: false,
                message: "Book Record not found 🤷‍♀️"
            })
        }
    } catch (error) {
        res.json(error.message)
    }
}

//GET SINGLE BOOK DATA
const single = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Book.findById(id)
        if (user) {
            res.json({
                success: true,
                user
            })
        } else {
            res.json({
                success: false,
                message: "Book Record not found"
            })
        }
    } catch (error) {
        res.json(error.message)
    }
}

module.exports = { store, index, update, trash, single }