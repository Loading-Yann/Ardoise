const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    title: { type: String, required: true },
    items: [
        {
            name: { type: String, required: true },
            ingredients: [
                {
                    name: { type: String, required: true },
                    price: { type: Number, required: true },
                },
            ],
            quantityPerPerson: { type: Number, required: true },
        },
    ],
    totalPrice: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Menu', menuSchema);
