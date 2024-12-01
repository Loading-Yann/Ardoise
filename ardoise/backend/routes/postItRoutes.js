const express = require('express');
const PostIt = require('../models/PostIt');
const router = express.Router();

// GET all post-its
router.get('/', async (req, res) => {
    try {
        const postIts = await PostIt.find();
        res.json(postIts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET post-its by menu ID
router.get('/menu/:menuId', async (req, res) => {
    try {
        const postIts = await PostIt.find({ menu: req.params.menuId });
        if (postIts.length === 0) {
            return res.status(404).json({ message: 'No post-its found for this menu' });
        }
        res.json(postIts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new post-it
router.post('/', async (req, res) => {
    const postIt = new PostIt(req.body);
    try {
        const newPostIt = await postIt.save();
        res.status(201).json(newPostIt);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PATCH an existing post-it
router.patch('/:id', async (req, res) => {
    try {
        const updatedPostIt = await PostIt.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedPostIt) {
            return res.status(404).json({ message: 'Post-it not found' });
        }
        res.json(updatedPostIt);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a post-it
router.delete('/:id', async (req, res) => {
    try {
        const deletedPostIt = await PostIt.findByIdAndDelete(req.params.id);
        if (!deletedPostIt) {
            return res.status(404).json({ message: 'Post-it not found' });
        }
        res.json({ message: 'Post-it deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
