import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

/*
    id -> auto gerado
    
    cpf         obrigatorio
    email       obrigatorio
    name        obrigatorio
    password    obrigatorio
    birthdate   obrigatorio
    role        opcional (default = 'user')
    indicacao   opcional

    created_at  -> auto gerado
    updated_at  -> auto gerado
*/

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

const validaUsuario = (req, res, next) => {
    if (!req.body.cpf) {
        return res.status(400).json({ error: 'cpf is required' });
    }

    if (!req.body.email) {
        return res.status(400).json({ error: 'email is required' });
    }

    if (!validateEmail(req.body.email)) {
        return res.status(400).json({ error: 'email is invalid' });
    }

    if (!req.body.name) {
        return res.status(400).json({ error: 'name is required' });
    }
    // alfanumerico, minimo 6 caracteres


    if (!req.body.password) {
        return res.status(400).json({ error: 'password is required' });
    }

    if (!req.body.birthdate) {
        return res.status(400).json({ error: 'birthdate is required' });
    }

    next();
}

// SEM USAR O YUP
// app.post('/users', validaUsuario, (req, res) => {
//     try {
//         if (!req.body.cpf) {
//             return res.status(400).json({ error: 'cpf is required' });
//         }
//         // se tem cpf, preciso validar que isso é um cpf
//         // se não for cpf, retornar erro 400

//         if (!req.body.email) {
//             return res.status(400).json({ error: 'email is required' });
//         }

//         res.json({ body: req.body })
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     } 
// });

import yup from 'yup';

import { sendWelcomeEmail } from './send-welcome-email.js';

const searchUserSchema = yup.object({
    query: yup.object({
        name: yup.string().min(3).optional(),
        page: yup.number().default(1),
        limit: yup.number().default(10),    
    })
});

const userByIdSchema = yup.object({
    params: yup.object({
        id: yup.number().required("id é obrigatório"),
    })
});

const userSchema = yup.object({
    // TODO REGRA DO CPF
    cpf: yup.string().required(),
    email: yup.string().email().required(),
    name: yup.string().min(6, "nome deve ser completo").required(),
    password: yup.string().min(6).required(),
    birthdate: yup.date().required(),
    role: yup.string().default('user'),
    indicacao: yup.string().optional(),
});

const postSchema = yup.object({
    title: yup.string().required(),
    content: yup.string().required(), 
    user_id: yup.number().required(),
});

const validateRequest = (schema) => (req, res, next) => {
    try {
        schema.validateSync({
            body: req.body,
            query: req.query,
            params: req.params,
        }, {
            abortEarly: false,
        });
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.errors });
    }
};

const validate = (schema) => (req, res, next) => {
    try {
        schema.validateSync(req.body, {
            abortEarly: false,
        });
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.errors });
    }
};

app.post('/users', validate(userSchema), async (req, res) => {
    await sendWelcomeEmail(req.body.email, req.body.name);
    res.json({ user: req.body });
});

app.get('/users', validateRequest(searchUserSchema), (req, res) => {
    res.json({ 
        users: [],
        query: req.query 
    });
});

app.get('/users/:id', validateRequest(userByIdSchema), (req, res) => {
    res.json({ 
        user: req.params.id 
    });
});

app.post('/posts', validate(postSchema), (req, res) => {
    try {
        

        const post = postSchema.validateSync(req.body, {
            abortEarly: false,
        });

        res.json({ post });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.errors });
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});