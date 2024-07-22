import { Hono } from 'hono';
import {
  createUserHandler,
  getUsers,
  loginUserHandler,
} from '../controllers/userController';

const userRouter = new Hono();

userRouter.get('/users/', getUsers);
userRouter.post('/users/', createUserHandler);
userRouter.post('/users/login/', loginUserHandler);

export default userRouter;
