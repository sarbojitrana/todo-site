const express = require('express');
const app = express();
const mongoose = require('mongoose')
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const path = require('path');


app.use(express.static(path.join(__dirname, 'public')));

const todoRoutes = require('./routes/todo');

app.use(express.json());
app.use(logger);

app.use('/todos', todoRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = 3000;
mongoose.connect('mongodb://127.0.0.1:27017/todo_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // kill the server if DB doesn't connect
});