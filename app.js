const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const homeRouter = require('./routes/homeRouter');
app.use('/', homeRouter);

// 404 page
app.use((req, res) => {
    res.status(404).send('Page not found!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

