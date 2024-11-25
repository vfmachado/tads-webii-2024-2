// npm init --yes
// "start": "node --watch src/server.js"
// npm run start        inicia a aplicacao rodando o comando start
// npm i express        instalo o express
// npm i                instala todas as dependencias
//  "type": "module",   no package.json para forcar o projeto para um modulo js

// const express = require('express');
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

import express, { query } from 'express';

import session  from 'express-session';

import bcrypt from 'bcrypt';
import { isAuth } from './middlewares/is-auth.js';
import { isAdmin } from './middlewares/is-admin.js';

const app = express();

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

    const isValid = bcrypt.compareSync(password, user.password);
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

app.listen(3000, () => console.log("Server iniciou na porta 3000"));
