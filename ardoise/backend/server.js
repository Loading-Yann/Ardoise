const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/menus', require('./routes/menuRoutes'));

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start the server only if successful
const startServer = async () => {
    try {
        await connectDB(); // Attendre que la connexion soit établie
        app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Failed to connect to MongoDB:', error.message);
        process.exit(1); // Arrêter le processus en cas d'échec
    }
};

startServer();
