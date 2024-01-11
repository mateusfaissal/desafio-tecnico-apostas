import express, { json, Request, Response } from 'express'
import cors from 'cors'
import 'express-async-errors'
import httpStatus from 'http-status'
import participantsRouter from './routers/participants.routes'
import errorHandlingMiddleware from './middlewares/error-handler'

const app = express()

app.use(cors())
app.use(json())

app.get('/health', (req: Request, res: Response) => {
    return res.status(httpStatus.OK).send("I'm ok!");
  });

app.use('/participants', participantsRouter);

app.use(errorHandlingMiddleware);
  
  export default app;

