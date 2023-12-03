const Books = require("../models/Books");
const Categories = require("../models/Categories");
const Authors = require("../models/Authors");
const Editorials = require("../models/Editorials");
const { where } = require("sequelize");
const {uploadImage, deleteImage} = require ("../util/cloudinary");
const fs = require("fs-extra")

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

exports.PostCreateBooks = async (req, res, next) => {
  const bookName = req.body.Name;
  const pubDate = req.body.PubDate;
  const bookCategories = req.body.Categories;
  const bookAuthors = req.body.Authors;
  const bookEditorials = req.body.Editorials;
  let imagePath = '';

  // si se envio una imagen ejecuta esta funcion para subir la imagen a cloudinary
  if (req.files?.Image) {
    imagePath = await uploadImage(req.files.Image.tempFilePath)
    console.log(imagePath)
  }

  await fs.unlink(req.files.Image.tempFilePath); // borra la imagen para que no se almacene en la app

  Books.create({
    name: bookName,
    public_id: imagePath.public_id,
    secure_url: imagePath.secure_url,
    categoryId: bookCategories,      
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

exports.PostEditBooks = async (req, res, next) => {
  const bookName = req.body.Name;
  const publicId = req.body.publicId;
  const pubDate = req.body.PubDate;
  const bookCategories = req.body.Categories;
  const bookAuthors = req.body.Authors;
  const bookEditorials = req.body.Editorials;
  const bookId = req.body.bookId;

  let imagePath = '';

  if (req.files?.Image) {
    await deleteImage(publicId);
  }
  
  Books.findOne({where: {id: bookId}})
    .then( async (result) => {

      const book = result.dataValues;

      if(!book){
        return res.redirect("/");
      }

      // const imagePath = bookImage ? "/" + bookImage.path : book.imagePath; 

      if (req.files?.Image) {
        imagePath = await uploadImage(req.files.Image.tempFilePath)
        console.log(imagePath)

        await fs.unlink(req.files.Image.tempFilePath);
      }
      
      Books.update(
        {
          name: bookName,
          public_id: imagePath.public_id,
          secure_url: imagePath.secure_url,
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
  const searchMode = false;

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
        searchMode: true,
        hasBooks: books.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostDeleteBooks = async (req, res, next) => {
  const bookId = req.body.bookId;
  const publicId = req.body.publicId;

  await deleteImage(publicId);

  Books.destroy({ where: { id: bookId } })
    .then((result) => {
      console.log(bookId);
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
