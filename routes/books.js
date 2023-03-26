const express = require("express");

const router = express.Router();

const booksController = require("../controllers/BooksController");

router.get("/", booksController.GetBooksList);
router.get("/create-books", booksController.GetCreateBooks);
router.post("/create-books",booksController.PostCreateBooks);
router.get("/edit-books/:bookId",booksController.GetEditBooks);
router.post("/edit-books",booksController.PostEditBooks);
router.post("/delete-books",booksController.PostDeleteBooks);

router.post("/search", booksController.PostBooksBySearch);



module.exports = router;