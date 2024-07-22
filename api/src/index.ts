import router from '@/routes/userRoutes';
import { Hono } from 'hono';
const app = new Hono();

app.route('/', router);

export default app;
