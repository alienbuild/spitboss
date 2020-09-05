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
        const { name, description, price, mode } = fields;
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
