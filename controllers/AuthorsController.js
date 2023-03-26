const Authors = require("../models/Authors");

exports.GetAuthorsList = (req, res, next) => {
  Authors.findAll()
    .then((result) => {
    
      const authors = result.map((result) => result.dataValues);


      res.render("authors/authors-list", {
        pageTitle: "Autores",
        authorsActive: true,
        authors: authors,
        hasAuthors: authors.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetCreateAuthors = (req, res, next) => {
  res.render("authors/save-authors", {
    pageTitle: "Create autores",
    authorsActive: true,
    editMode: false,
  });
};

exports.PostCreateAuthors = (req, res, next) => {
  const authorName = req.body.Name;
  const email = req.body.Email;

  Authors.create({ name: authorName, email: email})
    .then((result) => {
      res.redirect("/authors");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetEditAuthors = (req, res, next) => {
  const edit = req.query.edit;
  const authorId = req.params.authorId

  if (!edit) {
    return res.redirect("/authors");
  }

  Authors.findOne({where: {id: authorId}})
    .then((result) => {

        const author = result.dataValues;

        if(!author){
            return res.redirect("/authors");
        }

        res.render("authors/save-authors", {
            pageTitle: "Editar autores",
            authorsActive: true,
            editMode: edit,
            author: author,
        });
        
    })
    .catch((err) => {
        console.log(err);
    });

};

exports.PostEditAuthors = (req, res, next) => {
    const authorName = req.body.Name;
    const email = req.body.Email;
    const authorId = req.body.authorId ;

    Authors.update({name: authorName, email: email}, {where: {id: authorId }})
    .then((result) => {

        return res.redirect("/authors");
        
    })
    .catch((err) => {
        console.log(err);
    });
  
};

exports.PostDeleteAuthors = (req, res, next) => {
    const authorId = req.body.authorId;

    Authors.destroy({where:{id: authorId}}) 
    .then((result) => {
        return res.redirect("/authors"); 
    })
    .catch((err) => {
        console.log(err);
    });
};

