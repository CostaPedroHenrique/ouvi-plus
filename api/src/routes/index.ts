import { Hono } from "hono";

const router = new Hono();

router.get("/", (c) => c.text("Hello World!"));

router.get("/about", (c) => c.text("About Page"));

export default router;
