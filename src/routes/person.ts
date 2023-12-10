import { Router } from "express";
import type { Request, Response } from "express";
import prisma from "../utils/db";
import { createPerson, deletePerson, getPerson, updatePerson } from "../aggregates/person";

const router = Router();

router.get("/awesome/applicant", async (req: Request, res: Response) => {
    const person = await getPerson({prisma});
    res.json(person);
});

router.post("/awesome/applicant", async (req: Request, res: Response) => {
    const body = req.body as Person;

    try {
        const person = await createPerson(body, {prisma});
        res.status(201).json(person);
    } catch(err) {
        res.status(400).json({
            errors: [
                {
                    message: err.message
                }
            ]
        });
    }
});

router.put("/awesome/applicant", async (req: Request, res: Response) => {
    const body = req.body as Person;
    
    try {
        const person = await updatePerson(body, {prisma});
        res.status(200).json(person);
    } catch(err) {
        res.status(400).json({
            errors: [
                {
                    message: err.message
                }
            ]
        });
    }
});

router.delete("/awesome/applicant", async (req: Request, res: Response) => {
    const body = req.body as Person;

    try {
        const person = await deletePerson(body, {prisma});
        res.status(200).json(person);
    } catch(err) {
        res.status(400).json({
            errors: [
                {
                    message: err.message
                }
            ]
        });
    }
});

export default router;