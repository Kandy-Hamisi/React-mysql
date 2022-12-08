const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// create and save a new tutorial

exports.create = (req, res) => {
    // validate request
    if(!req.body.title) {
        res.status(400).send([
            message: "content can not be empty!"
        ]);
        return;
    }

    // create a tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // save tutorial in the database
    Tutorial.create(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some Error occured while creating the tutorial."
            });
        });
};

// retrieve all tutorials from the database

exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some Error occured while retieving the tutorial."
            })
        })
};

// find a single tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Tutorial with id=${id}.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};


// update a tutorial by the id in the request

exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if(num === 1) {
                res.send({
                    message: "Tutorial was updated successfully"
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};


// delete a tutorial by the id in te request

exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where: { id: id }
    })
        .then(num => {
            if(num === 1) {
                res.send({
                    message: "Tutorial was deleted successfully"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};

// delete all the tutorials
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutorials were deleted successfully`});
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while removing all tutorials."
            });
        });
};

// find all published tutorials

exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true }})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials"
            });
        });
};