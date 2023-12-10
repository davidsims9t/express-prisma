import express from "express";
import type { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import prisma from "./db";

const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get("/awesome/applicant", async (req: Request, res: Response) => {
    const person = await prisma.person.findFirst();
    res.json(person);
});

app.post("/awesome/applicant", async (req: Request, res: Response) => {
    const body = req.body as Person;
    const person = await prisma.person.create({
        data: {
            hometown: body.hometown,
            name: body.name,
            birthday: new Date(body.birthday)
        }
    });
    res.status(201).json(person);
});

app.put("/awesome/applicant", async (req: Request, res: Response) => {
    const body = req.body as Person;
    const person = await prisma.person.update({
        where: { id: body.id },
        data: {
            hometown: body.hometown,
            name: body.name,
            birthday: new Date(body.birthday)
        }
    });
    res.status(200).json(person);
});

app.delete("/awesome/applicant", async (req: Request, res: Response) => {
    const person = await prisma.person.delete({
        where: {
            id: req.body.id
        }
    });
    res.status(200).json(person);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});