const express = require("express");

const router = express.Router();

const editorialsController = require("../controllers/EditorialsController");

router.get("/editorials", editorialsController.GetEditorialsList);
router.get("/create-editorials", editorialsController.GetCreateEditorials);
router.post("/create-editorials", editorialsController.PostCreateEditorials);
router.get("/edit-editorials/:editorialId", editorialsController.GetEditEditorials);
router.post("/edit-editorials", editorialsController.PostEditEditorials);
router.post("/delete-editorials", editorialsController.PostDeleteEditorials);


module.exports = router;