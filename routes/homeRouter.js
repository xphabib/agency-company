import express from 'express';
const router = express.Router();
import { homePage, aboutPage, addUser } from '../controllers/homeController';
import logger from "../utils/logger.js";

router.get('/', homePage);
router.get('/about', aboutPage);
router.post('/add-user', addUser);

router.post('/api/data', (req, res) => {
    const { name } = req.body;
    res.json({ message: `Hello, ${name}` });
});

export default router;