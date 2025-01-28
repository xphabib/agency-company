const express = require('express');
const router = express.Router();
const { homePage, aboutPage, addUser } = require('../controllers/homeController');

router.get('/', homePage);
router.get('/about', aboutPage);
router.post('/add-user', addUser);

router.post('/api/data', (req, res) => {
    const { name } = req.body;
    res.json({ message: `Hello, ${name}` });
});

module.exports = router;