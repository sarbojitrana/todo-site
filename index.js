const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const todoRoutes = require('./routes/todo');

app.use(express.json());
app.use(logger);

app.use('/todos', todoRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
