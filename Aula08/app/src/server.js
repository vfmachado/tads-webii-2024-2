// npm init --yes
// "start": "node --watch src/server.js"
// npm run start        inicia a aplicacao rodando o comando start
// npm i express        instalo o express
// npm i                instala todas as dependencias
//  "type": "module",   no package.json para forcar o projeto para um modulo js

// const express = require('express');

import dotenv from 'dotenv';
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'development') {
    console.log("Running in development mode");
    dotenv.config({ path: '.env.development' });
} else if (NODE_ENV === 'production') {
    console.log("Running in production mode");
    dotenv.config({ path: '.env.production' });
}

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

import session  from 'express-session';

import bcrypt from 'bcrypt';
import { isAuth } from './middlewares/is-auth.js';
import { isAdmin } from './middlewares/is-admin.js';

import multer from 'multer';
import { uploadFile } from './aws/S3.js';
const upload = multer({ dest: 'uploads/' })


const app = express();

app.use(express.static('uploads')); // torna a pasta de uploads estatica

app.use(express.json()); // trabalhando com apis
app.use(express.urlencoded({
    extended: false
})); // Server side rendering e sistemas web em geral

// numa aplicacao real, o storage deve ser externo (ex: redis)
// as sessions ocupam espaço na memoria do servidor
app.use(session({
    secret: 'keyboard cat', // deve ser transformado em uma variavel de ambiente
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// SALVAR TODAS AS ROTAS QUE O USUARIO ESTA ACESSANDO NA SESSAO
app.use((req, res, next) => {
    req.session.routes = req.session.routes ?? [];
    req.session.routes.push(req.url);
    next();
});

// meu MIDDLEWARE
app.use((req, res, next) => {
    if (NODE_ENV == 'production') return next();
    console.log('Middleware');
    console.log({
        url: req.url,
        method: req.method,
        body: req.body,
        query: req.query,
        sessionId: req.sessionID,
        session: req.session,
    })
    next();
});


app.set('view engine', 'ejs');  // seta a template engine
app.set('views', 'src/views');  // seta a pasta de views

app.get('/healthcheck', (req, res) => {
    res.send('OK');
});

app.get('/', (req, res) => res.redirect('/home'));

app.get('/home', (req, res) => {
    res.render('home', { user: req.session.user });
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

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
    // SQL PURO -> INSERT INTO users (name, email, password) VALUES (name, email, password);
    // TYPEORM  -> userRepository.create({ name, email, password });
    // KNEX     -> knex('users').insert({ name, email, password });
    res.redirect('/login');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
}); 

// ROTA PARA BUSCAR A PAGINA DE LOGIN
app.get('/login', (req, res) => {
    res.render('login');
});


app.get('/users', isAuth, isAdmin, async (req, res) => {
    const users = await prisma.user.findMany({
        select: {
            name: true,
            email: true,
        },
    });
    res.json(users);
});

app.get('/posts', isAuth, async (req, res) => {
    const posts = await prisma.post.findMany();
    res.json(posts);
});



/*
    req.body => corpo da requisicao
    req.params => parametros da requisicao (ex: /users/:id vinculado a URL)
    req.query => query params (ex: /users?name=vinicius)
*/
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

    const isValid = bcrypt.compareSync("CHAVE"+ password, user.password);
    if (!isValid) {
        return res.status(400).json({ error: 'invalid credentials' });
    }
 
    const userSession = {
        userId: user.id,
        email: user.email,
        role: user.role,
    };
    req.session.user = userSession
    // res.json({ user });
    res.redirect('/home');
});

// importar as rotas de usuario e adicionar ao meu app
// import usersRouter from './routes/users-routes.js';
// app.use('/users', usersRouter);

app.post('/publicar-foto', upload.single('foto'), async (req, res) => {
    console.log(req.file);

    const result = await uploadFile(req.file);
    console.log({ msg: "resultado do upload", result });

    // imageId = req.file.filename
    // authorId = req.session.user.userId
    // message = "NOVA FOTO"

    await prisma.post.create({
        data: {
            imageId: req.file.filename,
            authorId: req.session.user.userId,
            message: "NOVA FOTO",
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
    res.render('detalhar-usuario', { user });
});

// opcao 1 = criar uma rota que entrega um arquivo estatico
// opcao 2 = tornar toda pasta de uploads estatica

app.listen(3000, () => console.log("Server iniciou na porta 3000"));
