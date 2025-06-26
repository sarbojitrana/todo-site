const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());

app.use(logger);

const todoRoutes = require('./routes/todo');
app.use('/todos', todoRoutes);

app.use(notFound);
app.use(errorHandler);

// Port
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });
