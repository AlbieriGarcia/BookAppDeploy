const Categories = require("../models/Categories");

exports.GetCategoriesList = (req, res, next) => {
  Categories.findAll()
    .then((result) => {
    
      const categories = result.map((result) => result.dataValues);


      res.render("categories/categories-list", {
        pageTitle: "Categorias",
        categoriesActive: true,
        categories: categories,
        hasCategories: categories.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetCreateCategories = (req, res, next) => {
  res.render("categories/save-categories", {
    pageTitle: "Create categorias",
    categoriesActive: true,
    editMode: false,
  });
};

exports.PostCreateCategories = (req, res, next) => {
  const categoryName = req.body.Name;
  const description = req.body.Description;

  Categories.create({ name: categoryName, description: description})
    .then((result) => {
      res.redirect("/categories");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetEditCategories = (req, res, next) => {
  const edit = req.query.edit;
  const categoryId = req.params.categoryId

  if (!edit) {
    return res.redirect("/categories");
  }

  Categories.findOne({where: {id: categoryId}})
    .then((result) => {

        const category = result.dataValues;

        if(!category){
            return res.redirect("/categories");
        }

        res.render("categories/save-categories", {
            pageTitle: "Editar categorias",
            categoriesActive: true,
            editMode: edit,
            category: category,
        });
        
    })
    .catch((err) => {
        console.log(err);
    });

};

exports.PostEditCategories = (req, res, next) => {
    const categoryName = req.body.Name;
    const description = req.body.Description;
    const categoryId = req.body.categoryId ;

    Categories.update({name: categoryName, description: description}, {where: {id: categoryId }})
    .then((result) => {

        return res.redirect("/categories");
        
    })
    .catch((err) => {
        console.log(err);
    });
  
};

exports.PostDeleteCategories = (req, res, next) => {
    const categoryId = req.body.categoryId;

    Categories.destroy({where:{id: categoryId}}) 
    .then((result) => {
        return res.redirect("/categories"); 
    })
    .catch((err) => {
        console.log(err);
    });
};


  
