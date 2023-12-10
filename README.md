# Vivacity Full-Stack App

## Stack:

- Prisma (ORM)
- Express
- Jest
- TypeScript

## How to Run

`npm start`

## How to Build

`npm run build`

## How to setup PostgreSQL

Setup a Postgres server locally and create a database. Get the database URL which will look something like this: `DATABASE_URL=postgres://davidsims:@127.0.0.1:5432/davidsims` and past it into your .env file. Then run `npx prisma migrate dev`.

Reference this article if you're having difficulties with the migrations or setup:
https://www.prisma.io/docs/orm/prisma-migrate/getting-started

## Difficulties

I ran over on time slightly in my video so I didn't get to talk about the challenges I had, but the challenges I had in this project was mostly around setting up Jest properly and there was also a TypeScript error that I ran into while running my tests.
Specifically it was this error: https://github.com/prisma/prisma/issues/10203.

It was an easy fix though, I just needed to move strictNullChecks to compiler options. The Jest error I ran into was setting up to work properly with Typescript and modules.
I'm used to using Vitest which works out of the box so I had to spend a little bit of time figuring out how to setup Jest.
