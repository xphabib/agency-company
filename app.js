import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { PrismaClient } from '@prisma/client';
import AdminJSPrisma from '@adminjs/prisma';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const prisma = new PrismaClient();
const app = express();
const port = 3000;

import morgan from 'morgan';
import logger from './utils/logger.js';



const admin = new AdminJS({})

const adminRouter = AdminJSExpress.buildRouter(admin)
app.use(admin.options.rootPath, adminRouter)


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

import homeRouter from 'routes/homeRouter';
app.use('/', homeRouter);

// 404 page
app.use((req, res) => {
    res.status(404).send('Page not found!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

