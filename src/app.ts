import express, { json, Request, Response } from 'express'
import cors from 'cors'
import 'express-async-errors'
import httpStatus from 'http-status'
import participantsRouter from './routers/participants.routes'
import errorHandlingMiddleware from './middlewares/error-handler'
import gamesRouter from './routers/games.routes'
import betRouter from './routers/bets.routes'

const app = express()

app.use(cors())
app.use(json())

app.get('/health', (req: Request, res: Response) => {
    return res.status(httpStatus.OK).send("I'm ok!");
  });

app.use('/participants', participantsRouter);
app.use('/games', gamesRouter);
app.use('/bets', betRouter);

app.use(errorHandlingMiddleware);
  
  export default app;

