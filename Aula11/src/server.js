import express from 'express';

const app = express();

import swaggerJSDoc from'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WEB II',
      version: '0.0.1-SNAPSHOT',
    },
  },
  apis: ['./src/*.js'], // files containing annotations as above
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
app.get('/', (req, res) => {
    res.send('Hello World');
});

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

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Cria um usuario
 *     description: Cria um usuario
 *     parameters:
 *       - in: body
 *         name: user
 *         description: O objeto do usuario
 *         schema:
 *           type: object
 *           properties:
 *             cpf:
 *                  type: string
 *                  example: abcde
 *             email:
 *                  type: string
 *                  example: abcde
 *             name:
 *                  type: string
 *                  example: abcde
 *             password:
 *                  description: senha do usuario deve conter no minimo 6 caracteres
 *                  type: string
 *                  example: abcde
 *                  minLength: 6
 *             birthdate:
 *                  type: string
 *                  example: abcde
 *             role:
 *                  type: string
 *                  example: abcde
 *             indicacao:
 *                  type: string
 *                  example: abcde
 *     responses:
 *       200:
 *         description: Return o objeto do usuario criado
 */
app.post('/users', validate(userSchema), async (req, res) => {
    // await sendWelcomeEmail(req.body.email, req.body.name);
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