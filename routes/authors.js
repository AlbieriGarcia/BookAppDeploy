const express = require("express");

const router = express.Router();

const authorsController = require("../controllers/AuthorsController");

router.get("/authors", authorsController.GetAuthorsList);
router.get("/create-authors", authorsController.GetCreateAuthors);
router.post("/create-authors", authorsController.PostCreateAuthors);
router.get("/edit-authors/:authorId", authorsController.GetEditAuthors);
router.post("/edit-authors", authorsController.PostEditAuthors);
router.post("/delete-authors", authorsController.PostDeleteAuthors);


module.exports = router;