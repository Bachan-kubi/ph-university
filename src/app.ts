import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRouters } from './app/modules/student/student.router';
import { userRouters } from './app/modules/user/user.router';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFoundRoutes } from './app/middleware/notFoundRoutes';
import routers from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/', routers);

const test = async (req: Request, res: Response) => {
res.send('Hi!');
};
app.get('/', test);

// not found route
app.use(notFoundRoutes);
// global error hanldler 
app.use(globalErrorHandler);


export default app;
