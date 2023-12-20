import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/router';
import apiNotFound from './app/middelwares/apiNotFound';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Nayem! I am from Courses review');
});


// Handle Not Found Api 
app.use(apiNotFound)

export default app;
