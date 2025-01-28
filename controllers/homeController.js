const { User } = require('../models');
const homePage = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
    // res.render('index', {title: 'Welcome to expressjs'})
};
  
const aboutPage = (req, res) => {
    res.send('This is the About page.');
};

const addUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const newUser = await User.create({ name, email, password });
      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create user' });
    }
};

module.exports = {
    homePage,
    aboutPage,
    addUser
}