const Editorials = require("../models/Editorials");

exports.GetEditorialsList = (req, res, next) => {
  Editorials.findAll()
    .then((result) => {
    
      const editorials = result.map((result) => result.dataValues);


      res.render("editorials/editorials-list", {
        pageTitle: "Editoriales",
        editorialsActive: true,
        editorials: editorials,
        hasEditorials: editorials.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetCreateEditorials = (req, res, next) => {
  res.render("editorials/save-editorials", {
    pageTitle: "Create editoriales",
    editorialsActive: true,
    editMode: false,
  });
};

exports.PostCreateEditorials = (req, res, next) => {
  const editorialName = req.body.Name;
  const telefono = req.body.Telefono;
  const pais = req.body.Pais;

  Editorials.create({ name: editorialName, telefono: telefono, pais: pais})
    .then((result) => {
      res.redirect("/editorials");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetEditEditorials = (req, res, next) => {
  const edit = req.query.edit;
  const editorialId = req.params.editorialId

  if (!edit) {
    return res.redirect("/editorials");
  }

  Editorials.findOne({where: {id: editorialId}})
    .then((result) => {

        const editorial = result.dataValues;

        if(!editorial){
            return res.redirect("/editorials");
        }

        res.render("editorials/save-editorials", {
            pageTitle: "Editar editoriales",
            editorialsActive: true,
            editMode: edit,
            editorial: editorial,
        });
        
    })
    .catch((err) => {
        console.log(err);
    });

};

exports.PostEditEditorials = (req, res, next) => {
    const editorialName = req.body.Name;
    const telefono = req.body.Telefono;
    const pais = req.body.Pais;
    const editorialId = req.body.editorialId ;

    Editorials.update({name: editorialName, telefono: telefono, pais: pais}, {where: {id: editorialId }})
    .then((result) => {

        return res.redirect("/editorials");
        
    })
    .catch((err) => {
        console.log(err);
    });
  
};

exports.PostDeleteEditorials = (req, res, next) => {
    const editorialId = req.body.editorialId;

    Editorials.destroy({where:{id: editorialId}}) 
    .then((result) => {
        return res.redirect("/editorials"); 
    })
    .catch((err) => {
        console.log(err);
    });
};


  
