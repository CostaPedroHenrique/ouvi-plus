import router from "@/routes/index";
import { Hono } from "hono";
const app = new Hono();

app.route("/", router);

export default app;
