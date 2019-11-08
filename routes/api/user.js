const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const validateUserInput = require('../../validation/user');

// Load User Model
const User = require('../../models/User');

// @route   GET api/user
// @desc    Get user
// @access  Public
router.get('/', (req, res) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(error => res.status(404).json(error))
});

// @route   POST api/routine
// @desc    Create or update routine
// @access  Private
router.post('/', (req, res) => {


    // // Validate
    // const {errors, isValid} = validateUserInput(req.body);
    //
    // // Check Validation
    // if (!isValid) {
    //     return res.status(200).json({errors});
    // }

    User.findOne(
        {name: req.body.name}
    )
        .then(user => {
            if (user) {
                return res.status(200).json(user)
            } else {
                // Add new user
                const newUser = new User({
                    name: req.body.name,
                });
                newUser
                    .save()
                    .then(user => {
                            return res.status(200).json(user);
                        }
                    )
                    .catch(err => console.log(err));
            }
        });

});

module.exports = router;