const express = require('express');
const Menu = require('../models/Menu');
const router = express.Router();

// GET all menus
router.get('/', async (req, res) => {
    try {
        const menus = await Menu.find();
        res.json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a single menu by ID
router.get('/:id', async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) return res.status(404).json({ message: 'Menu not found' });
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new menu
router.post('/', async (req, res) => {
    const menu = new Menu(req.body);
    try {
        const newMenu = await menu.save();
        res.status(201).json(newMenu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PATCH an existing menu
router.patch('/:id', async (req, res) => {
    try {
        const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedMenu) return res.status(404).json({ message: 'Menu not found' });
        res.json(updatedMenu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a menu
router.delete('/:id', async (req, res) => {
    try {
        const menu = await Menu.findByIdAndDelete(req.params.id);
        if (!menu) return res.status(404).json({ message: 'Menu not found' });
        res.json({ message: 'Menu deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
