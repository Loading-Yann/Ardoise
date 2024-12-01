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

module.exports = router;
