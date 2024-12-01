const mongoose = require('mongoose');

const postItSchema = mongoose.Schema({
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu', // Relie le post-it à un menu spécifique
        required: true,
    },
    type: {
        type: String,
        enum: ['recette', 'total', 'ingrédients', 'autre'], // Différents types de post-its
        required: true,
    },
    content: {
        type: String, // Contenu texte du post-it
        required: true,
    },
    color: {
        type: String, // Couleur du post-it (exemple : #FF5733)
        default: '#FFD700', // Une couleur par défaut (jaune)
    },
    pattern: {
        type: String, // Motif du post-it (exemple : rayures, pois)
        default: 'plain', // Un motif par défaut
    },
    position: {
        x: { type: Number, default: 0 }, // Position X pour le drag-and-drop
        y: { type: Number, default: 0 }, // Position Y pour le drag-and-drop
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Date de la dernière modification
    },
}, { timestamps: true });

module.exports = mongoose.model('PostIt', postItSchema);
