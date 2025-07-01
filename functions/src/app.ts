import express, { type Express } from 'express';
import morgan from 'morgan';
import router from './routes/index.js';
import { HttpError } from './classes/HttpError.js';
import { handleError } from './utils/index.js';

export const app: Express = express();

app.use(express.json());
app.use('/', router);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((_req, _res, next) => {
  next(new HttpError(404, 'Path not found'));
});

// error handler
const errorHandler: express.ErrorRequestHandler = (err, _req, res) => {
  handleError(err, res);
};

app.use(errorHandler);
