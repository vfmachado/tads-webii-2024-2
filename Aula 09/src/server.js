// npm init --yes
// "start": "node --watch src/server.js"
// npm run start        inicia a aplicacao rodando o comando start
// npm i express        instalo o express
// npm i                instala todas as dependencias
//  "type": "module",   no package.json para forcar o projeto para um modulo js

// const express = require('express');

import dotenv from 'dotenv';
dotenv.config();
// const NODE_ENV = process.env.NODE_ENV;

// if (NODE_ENV === 'development') {
//     console.log("Running in development mode");
//     dotenv.config({ path: '.env.development' });
// } else if (NODE_ENV === 'production') {
//     console.log("Running in production mode");
//     dotenv.config({ path: '.env.production' });
// }

console.log({
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    APP_SECRET: process.env.APP_SECRET,
    HASH_SECRET: process.env.HASH_SECRET,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
})

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

import express, { query } from 'express';

import bcrypt from 'bcrypt';
import { isAuth } from './middlewares/is-auth.js';

import multer from 'multer';
import { uploadFile } from './aws/S3.js';
import jsonwebtoken from 'jsonwebtoken';
const upload = multer({ dest: 'uploads/' })


const app = express();

app.use(express.json()); // trabalhando com apis
app.use(express.urlencoded({
    extended: false
})); // Server side rendering e sistemas web em geral

import cors from 'cors';
app.use(cors());


app.get('/healthcheck', (req, res) => {
    res.send('OK');
});


/*
app.post('/users', async (req, res) => {
    const { name, email, password } = req.body;


    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields name, email and password' });
    }

    // DICA: ENCRIPTAR A SENHA UTILIZANDO UM SALT ALTO (>= 10)
    // COMBINAR A SENHA COM UMA VARIAVEL DE AMBIENTE IMPEDE A MUDANÇA DIRETA NO BANCO SEM A CHAVE
    const encrypted = bcrypt.hashSync("CHAVE" + password, 10);
    // hashSync => sincrono
    // hash => assincrono
    console.log({ encrypted });

    await prisma.user.create({
        data: {
            name,
            email,
            password: encrypted,
        },
    });

    res.status(201).send();
});
*/

import { usersRoutes } from './users/users.routes.js';
app.use('/users', usersRoutes);


app.get('/users', isAuth, async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    
    const users = await prisma.user.findMany({
        skip: (page - 1) * limit,
        take: +limit,
        select: {
            name: true,
            email: true,
        },
    });

    const count = await prisma.user.count();
    res.json({count, users});
});


app.get('/my-posts', isAuth, async (req, res) => {
    const posts = await prisma.post.findMany({
        where: {
            authorId: req.user.id,
        },
    });
    return res.json(posts);
});    

// para acessar posts, adicionamos um middleware que verifica se o usuario está logado
app.get('/posts', isAuth, async (req, res) => {
    
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const posts = await prisma.post.findMany({
        skip: (page - 1) * limit,
        take: +limit,
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                },
            }
        }
    });

    const count = await prisma.post.count();

    const url = (id) => `https://tads-2024-webii.s3.us-east-1.amazonaws.com/${id}`;
    posts.forEach(post => {
        post.imageId = url(post.imageId);
    });

    res.json({count, posts});
});



// ROTA PARA A AÇÃO DE LOGIN
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password });

    // retorna 1 objeto ou null
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        // return res.status(400).json({ error: 'invalid credentials' });
        return res.status(404).json({ error: 'User not found' });
    }

    console.log({ user })

    // DAR UMA OLHADA BCRYPT
    const isValid = bcrypt.compareSync("CHAVE"+ password, user.password);
    if (!isValid) {
        return res.status(400).json({ error: 'invalid credentials' });
    }
 
    // gera jwt
    const jwt = jsonwebtoken.sign(user, process.env.APP_SECRET, { expiresIn: '1d' });

    return res.json({ user, jwt });
});


app.post('/posts', isAuth, upload.single('foto'), async (req, res) => {
    
    const { title, content } = req.body;
    console.log(req.file);

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!title || !content) {
        return res.status(400).json({ error: 'Missing required fields title and content' });
    }

    req.file.filename = req.file.filename + "." + req.file.originalname.split('.').pop();
    const result = await uploadFile(req.file);
    console.log({ msg: "resultado do upload", result });

    await prisma.post.create({
        data: {
            imageId: req.file.filename,
            authorId: req.user.id,
            title,
            content,
        },
    });

    res.status(201).send();
});


app.delete('/posts/:id', isAuth, async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    if (post.authorId !== req.user.id) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    await prisma.post.delete({
        where: {
            id: parseInt(id),
        },
    });

    res.send('OK');
});


app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            posts: true,
        },
    });
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
});


app.use((req, res, next) => {
    res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});


app.listen(3000, () => console.log("Server iniciou na porta 3000"));
