import express from "express";
import type { Express } from "express";
import bodyParser from "body-parser";
import personRoutes from "./routes/person";

const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.use(personRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});