const path = require("path");
const express = require("express");
const { engine } = require("express-handlebars");
const sequelize = require("./context/database");
const Books = require("./models/Books");
const Categories = require("./models/Categories");
const Authors = require("./models/Authors");
const Editorials = require("./models/Editorials");
const User = require("./models/User");
const multer = require("multer");
const {v4: uuidv4} = require("uuid");
const session = require("express-session");
const flash = require("connect-flash");

const errorController = require("./controllers/ErrorController");

const app = express();

const compareHelpers = require("./util/helpers/hbs/compare");

app.engine(
    "hbs",
    engine({
      layoutsDir: "views/layouts",
      defaultLayout: "main-layout",
      extname: "hbs",
      helpers:{
        equalValue: compareHelpers.EqualValue,
      }
    })
);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public"))); // folder static
app.use("/images",express.static(path.join(__dirname, "images")));

app.use(session({secret:"anything", resave: true, saveUninitialized: false}));

app.use(flash());

app.use((req, res, next)=>{
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
});


const imageStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,"images");
    },
    filename: (req,file,cb) =>{
        cb(null,`${uuidv4()}-${file.originalname}`);
    }
})

app.use(multer({storage: imageStorage}).single("Image"));

const booksRouter = require("./routes/books");
const categoriesRouter = require("./routes/categories");
const authorsRouter = require("./routes/authors");
const editorialsRouter = require("./routes/editorials");
const authRouter = require("./routes/auth");

app.use(booksRouter);
app.use(categoriesRouter);
app.use(authorsRouter);
app.use(editorialsRouter);
app.use(authRouter);

app.use(errorController.Get404);

Books.belongsTo(Categories,{constraint: true,onDelete:"CASCADE"});
Categories.hasMany(Books);

Books.belongsTo(Authors,{constraint: true,onDelete:"CASCADE"});
Authors.hasMany(Books);

Books.belongsTo(Editorials,{constraint: true,onDelete:"CASCADE"});
Editorials.hasMany(Books);

Books.belongsTo(User,{constraint: true,onDelete:"CASCADE"});
User.hasMany(Books);

sequelize.sync()
.then((result) => {
    app.listen(3000);
})
.catch((err) => {
    console.log(err);
});