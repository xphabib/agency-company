const logger = require('../utils/logger');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const homePage = async (req, res) => {
    try {
        logger.info(`Processing by UsersController#index as ${req.headers['accept'] || 'JSON'}`);
        logger.info(`  Parameters: ${JSON.stringify(req.query)}`);

        const users = await prisma.users.findMany({})
        // res.json(users);
        res.render('home/index', {title: 'Welcome to expressjs', users: users});

        logger.info('Completed 200 OK');
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        // console.error(error);
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
      const newUser = await prisma.users.create({
          data:{
              name,
              email,
              password
          }});
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