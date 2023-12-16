import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/router';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Nayem! I am from Courses review');
});


export default app;
