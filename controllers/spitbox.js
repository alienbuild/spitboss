const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Spitbox = require('../models/spitbox');
const { errorHandler } = require('../helpers/dbErrorHandler');

// Create product
exports.create = (req, res) => {
    console.log('Doing something in spitbox controller');
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err, fields) => {
        console.log('Ok parsing form...');
        // Handle errors
        if (err){
            return res.status(400).json({
                error: 'Something went wrong.'
            })
        }
        // Check fields have values
        const { name, description, price, mode } = fields; // TODO: Check/add/remove fields
        // if (!name || !description || !price || !mode){
        //     return res.status(400).json({
        //         error: 'All fields are required.'
        //     })
        // }
        // Handle fields
        let room = new Spitbox(fields);
        // Create/Save Spitbox Room
        room.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result);
        })
    })
};


// List spitbox rooms
exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    let offset = req.query.offset ? parseInt(req.query.offset) : 0;

    Spitbox.find()
        .sort([[sortBy, order]])
        .limit(limit)
        .skip(offset)
        .exec((err, rooms) => {
            if (err){
                return res.status(400).json({
                    error: 'Spitbox rooms not found.'
                })
            }
            res.json(rooms)
        })

};

// Find product by ID
exports.read = (req, res) => {
    Spitbox.findById(req.params.id)
        .exec((err, spitbox) => {
            if (err || !spitbox){
                return res.status(400).json({
                    error: 'Product not found.'
                })
            }
            res.json(spitbox)
        })
};
