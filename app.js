const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const morgan = require('morgan');
const logger = require('./utils/logger');

// Middleware to log HTTP requests in a Rails-like format
app.use((req, res, next) => {
    const start = Date.now();
    logger.info(`Started ${req.method} "${req.originalUrl}" for ${req.ip} at ${new Date().toISOString()}`);
  
    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.info(
        `Completed ${res.statusCode} ${res.statusMessage} in ${duration}ms`
      );
    });
  
    next();
});
  
  // Morgan for detailed logs
app.use(
    morgan('dev', {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    })
);

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

