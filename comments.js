// Create web server using express
// Description: Create, Read, Update, Delete comments

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Create comment
router.post('/', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        message: req.body.message
    });

    comment.save()
        .then(result => {
            res.status(201).json({
                message: 'Comment added successfully',
                comment: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

// Read all comments
router.get('/', (req, res) => {
    Comment.find()
        .exec()
        .then(result => {
            res.status(200).json({
                comments: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

// Read comment by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Comment.findById(id)
        .exec()
        .then(result => {
            res.status(200).json({
                comment: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

// Update comment
router.put('/:id', (req, res) => {
    const id = req.params.id;
    Comment.update({ _id: id }, { $set: req.body })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Comment updated successfully',
                comment: req.body
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

// Delete comment
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Comment.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Comment deleted successfully'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;