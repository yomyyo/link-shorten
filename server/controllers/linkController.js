//require models folder
const db = require("../models");

//export these functions
module.exports = {

    //findAll links in the database
    findAll: function(req, res) {
      db.Link.find(req.query)
        .then(dbLink => res.json(dbLink))
        .catch(err => res.status(422).json(err));
    },
  
    //find a link to check if exists
    findByUrl: function(req, res) {
      console.log(req.params.url)
      db.Link.findOne({url: req.params.url}, function(err, docs){ console.log(docs)})
        .then(dbLink => res.json(dbLink))
        .catch(err => res.status(422).json(err));
    },
  
    //create a new link
    create: function(req, res) {
      db.Link.create(req.body)
        .then(dbLink => res.json(dbLink))
        .catch(err => res.status(422).json(err));
    },
  };