const express = require("express");

const router = express.Router();

const categoriesController = require("../controllers/CategoriesController");

router.get("/categories", categoriesController.GetCategoriesList);
router.get("/create-categories", categoriesController.GetCreateCategories);
router.post("/create-categories", categoriesController.PostCreateCategories);
router.get("/edit-categories/:categoryId", categoriesController.GetEditCategories);
router.post("/edit-categories", categoriesController.PostEditCategories);
router.post("/delete-categories", categoriesController.PostDeleteCategories);


module.exports = router;