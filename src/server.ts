import cors from 'cors';
import CronJobService from 'service/CronjobService';
import database from 'database';
import errorMiddleware from 'middleware/errorMiddleware';
import express, { Request, Response } from 'express';
import HandlerSuccess from 'handler/HandlerSuccess';
import http from 'http';
import logger from 'utils/logger';
import rateLimit from 'express-rate-limit';
import routes from 'route';
import session from 'express-session';
import { configureSockets } from 'websocket';
import { errors } from 'celebrate';
import { instrument } from '@socket.io/admin-ui';
import { Server } from 'socket.io';

const app = express();

app.use(express.json());

const corsOriginUrls = process.env.CORS_ORIGIN_URLS as string;
const corsOriginUrlsArray = corsOriginUrls.split(',');

app.use(
  cors({
    origin: corsOriginUrlsArray,
    credentials: true,
  })
);

app.use(
  session({ secret: process.env.SESSION_SECRET as string, resave: true, saveUninitialized: true })
);

app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: true,
      message: 'Too many requests from this IP, please try again after 1 minute',
    },
  })
);

app.use(routes);

app.use(errors());

app.use(errorMiddleware);

app.use((request: Request, response: Response) => {
  logger.info(`Route ${request.url} not found`);
  return new HandlerSuccess('Rota não encontrada', 404).toJSON(response);
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: corsOriginUrlsArray,
    credentials: true,
  },
});

instrument(io, {
  auth: false,
});

configureSockets(io);

const port = process.env.PORT || 3000;
server.listen(port, async () => {
  await database.sync();
  CronJobService.start();
  logger.info(`Server is running on port ${port}`);
});
