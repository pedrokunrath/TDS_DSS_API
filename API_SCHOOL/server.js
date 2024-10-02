// server.js

const express = require('express');
const schoolRoutes = require('./routes/school.router');

const app = express();
const port = 8080;

app.use(express.json());
app.use('/api', schoolRoutes);

app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}! 🚀`);
});
