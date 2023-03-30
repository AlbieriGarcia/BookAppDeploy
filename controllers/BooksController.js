const Books = require("../models/Books");
const Categories = require("../models/Categories");
const Authors = require("../models/Authors");
const Editorials = require("../models/Editorials");
const { where } = require("sequelize");

exports.GetBooksList = (req, res, next) => {
  Books.findAll({
    include: [{ model: Categories }, { model: Authors }, { model: Editorials }],
  })
    .then((result) => {
      const books = result.map((result) => result.dataValues);
        Categories.findAll()
        .then((result) => {
          const categories = result.map((result) => result.dataValues);

        res.render("books/books-list", {
          pageTitle: "books",
          homeActive: true,
          books: books,
          categories: categories,
          hasBooks: books.length > 0,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetCreateBooks = (req, res, next) => {
  Categories.findAll()
    .then((result) => {
      const categories = result.map((result) => result.dataValues);

      Authors.findAll()
        .then((result) => {
          const authors = result.map((result) => result.dataValues);

          Editorials.findAll()
            .then((result) => {
              const editorials = result.map((result) => result.dataValues);

              res.render("books/save-books", {
                pageTitle: "Create libros",
                homeActive: true,
                editMode: false,
                categories: categories,
                authors: authors,
                editorials: editorials,
                hasCategories: categories.length > 0,
                hasAuthors: authors.length > 0,
                hasEditorials: editorials.length > 0,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostCreateBooks = (req, res, next) => {
  const bookName = req.body.Name;
  const bookImage = req.file; // esta propiedad la agrega multer no http
  const pubDate = req.body.PubDate;
  const bookCategories = req.body.Categories;
  const bookAuthors = req.body.Authors;
  const bookEditorials = req.body.Editorials;

  if (!bookImage){            // esto es una validación 
    return res.redirect("/");
  }

  Books.create({
    name: bookName,
    imagePath: "/" + bookImage.path, // este "/" que estoy concatenando es porque la ruta que me tira viene sin
    categoryId: bookCategories,      // el / atras, viene asi: images/image.jpg
    authorId: bookAuthors,
    editorialId: bookEditorials,
    pubDate: pubDate,
  })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetEditBooks = (req, res, next) => {
  const edit = req.query.edit;
  const bookId = req.params.bookId;

  if (!edit) {
    return res.redirect("/");
  }

  Books.findOne({ where: { id: bookId } })
    .then((result) => {
      const book = result.dataValues;

      if (!book) {
        return res.redirect("/");
      }

      Categories.findAll() //////ojo//////
        .then((result) => {
          const categories = result.map((result) => result.dataValues);

          Authors.findAll()
            .then((result) => {
              const authors = result.map((result) => result.dataValues);

              Editorials.findAll()
                .then((result) => {
                  const editorials = result.map((result) => result.dataValues);

                  res.render("books/save-books", {
                    pageTitle: "Editar libros",
                    homeActive: true,
                    editMode: edit,
                    book: book,
                    categories: categories,
                    authors: authors,
                    editorials: editorials,
                    hasCategories: categories.length > 0,
                    hasAuthors: authors.length > 0,
                    hasEditorials: editorials.length > 0,
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostEditBooks = (req, res, next) => {
  const bookName = req.body.Name;
  const bookImage = req.file;
  const pubDate = req.body.PubDate;
  const bookCategories = req.body.Categories;
  const bookAuthors = req.body.Authors;
  const bookEditorials = req.body.Editorials;
  const bookId = req.body.bookId;

  Books.findOne({where: {id: bookId}})
    .then((result) => {

      const book = result.dataValues;

      if(!book){
        return res.redirect("/");
      }

      const imagePath = bookImage ? "/" + bookImage.path : book.imagePath; /*esto es como un if 
                                                                      simplificado  llamado "Operador ternario" */
      Books.update(
        {
          name: bookName,
          imagePath: imagePath,
          categoryId: bookCategories,
          authorId: bookAuthors,
          editorialId: bookEditorials,
          pubDate: pubDate,
        },
        { where: { id: bookId } }
      )
        .then((result) => {
          return res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });

    }).catch((err) => {
      console.log(err);
    })
};

exports.PostBooksBySearch = (req, res, next) => {
  const search = req.body.Search;
  Books.findAll({
    include: [{ model: Categories }, { model: Authors }, { model: Editorials }],
    where: { name: search },
  })
    .then((result) => {
      const books = result.map((result) => result.dataValues);

      res.render("books/books-list", {
        pageTitle: "libros",
        homeActive: true,
        books: books,
        hasBooks: books.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostDeleteBooks = (req, res, next) => {
  const bookId = req.body.bookId;

  Books.destroy({ where: { id: bookId } })
    .then((result) => {
      console.log(bookId);
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
