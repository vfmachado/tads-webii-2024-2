# Aula 04 - ORMs e Relações

#### 1. **O que é um ORM (Object-Relational Mapping)?**

O **ORM (Object-Relational Mapping)** é uma técnica que permite a conversão de dados entre um sistema de banco de dados relacional (como PostgreSQL, MySQL, SQLite, etc.) e objetos da aplicação. Em outras palavras, um **ORM** mapeia tabelas de um banco de dados em classes ou modelos da linguagem de programação, tornando mais fácil a manipulação e persistência de dados sem a necessidade de escrever SQL manualmente.

##### Principais benefícios do ORM:
- **Abstração**: Não é necessário escrever queries SQL complexas, o ORM gera as queries automaticamente.
- **Produtividade**: Facilita o desenvolvimento, pois o foco fica no modelo de negócio e não no banco de dados.
- **Segurança**: Ao gerar queries, os ORMs ajudam a mitigar injeções de SQL, melhorando a segurança.
- **Portabilidade**: Um ORM pode facilitar a troca de um banco de dados por outro sem mudanças significativas no código.

---

#### 2. **Exemplos de ORMs em JavaScript com Node.js**

Existem diversos ORMs populares para uso com Node.js. Vamos destacar alguns deles:

1. **Sequelize**:
   - Um dos ORMs mais populares no ecossistema JavaScript, que suporta múltiplos bancos de dados relacionais como PostgreSQL, MySQL e SQLite.
   - Integração completa com migrações e transações.
   - Fácil de usar, com suporte a validações e associações entre tabelas.

2. **TypeORM**:
   - Um ORM baseado em TypeScript que pode ser usado tanto com bancos de dados relacionais como NoSQL.
   - Suporta entidades com classes TypeScript/JavaScript e possui funcionalidades de migração e transação.

3. **Prisma**:
   - Um ORM moderno, que simplifica o acesso a dados e oferece uma interface poderosa para trabalhar com SQL.
   - Suporta bancos como PostgreSQL, MySQL, MariaDB, SQLite e SQL Server.
   - Prisma se destaca pela integração de **transações**, **migrações** e **seeds** de maneira muito intuitiva.

---

#### 3. **Diferença entre ORM e Query Builder**

- **ORM**: Oferece um nível de abstração mais alto, permitindo mapear tabelas para objetos e manipular dados através de classes e métodos. Ele gera queries SQL em segundo plano sem necessidade de escrever SQL manualmente.
  
  **Exemplo (Prisma ORM)**:
  ```javascript
  const user = await prisma.user.create({
    data: {
      name: 'John',
      email: 'john@example.com',
    },
  });
  ```

- **Query Builder**: Permite a construção de queries SQL de forma programática, mas sem a abstração completa que um ORM oferece. Você ainda escreve as queries manualmente, mas de uma maneira mais flexível.

  **Exemplo (Knex.js Query Builder)**:
  ```javascript
  const users = await knex('users')
    .select('*')
    .where('email', 'john@example.com');
  ```

**Diferenças chave**:
- O **ORM** abstrai totalmente o SQL, mapeando dados para objetos e permitindo manipulação via métodos nativos da linguagem.
- O **Query Builder** oferece uma maneira mais flexível de escrever queries, mas sem o mesmo nível de abstração do ORM.

---

#### 4. **Prisma ORM: Transações, Migrações, Seeds**

O **Prisma** é um ORM moderno e poderoso, que facilita o trabalho com bancos de dados relacionais em **Node.js**. Ele oferece suporte completo a transações, migrações de banco de dados e seeds.

##### 4.1. **Transações no Prisma**
As **transações** permitem que várias operações sejam executadas de forma atômica, ou seja, ou todas as operações dentro da transação são aplicadas com sucesso, ou nenhuma delas é.

**Exemplo de transação com Prisma**:
```javascript
const prisma = require('@prisma/client');

async function transferFunds(senderId, receiverId, amount) {
  const result = await prisma.$transaction(async (prisma) => {
    const sender = await prisma.user.update({
      where: { id: senderId },
      data: { balance: { decrement: amount } },
    });

    const receiver = await prisma.user.update({
      where: { id: receiverId },
      data: { balance: { increment: amount } },
    });

    return { sender, receiver };
  });

  return result;
}
```
Neste exemplo, ou ambas as operações (decremento e incremento de saldo) ocorrem, ou nenhuma delas é aplicada, garantindo consistência.

##### 4.2. **Migrações no Prisma**
As **migrações** são usadas para aplicar mudanças no esquema do banco de dados de forma controlada. Isso é crucial quando você precisa modificar a estrutura de tabelas.

**Gerar uma migração**:
1. Defina o modelo no arquivo `prisma/schema.prisma`.
2. Execute:
   ```bash
   npx prisma migrate dev --name initial_migration
   ```

##### 4.3. **Seeds no Prisma**
Seeds são usados para popular o banco de dados com dados iniciais ou de teste. O Prisma permite criar seeds facilmente.

**Exemplo de seed no Prisma**:
1. Crie o arquivo `prisma/seed.js`:
   ```javascript
   const { PrismaClient } = require('@prisma/client');
   const prisma = new PrismaClient();

   async function main() {
     await prisma.user.create({
       data: {
         name: 'John Doe',
         email: 'john@example.com',
         balance: 1000,
       },
     });
   }

   main()
     .catch((e) => {
       console.error(e);
       process.exit(1);
     })
     .finally(async () => {
       await prisma.$disconnect();
     });
   ```

2. Execute o seed:
   ```bash
   npx prisma db seed
   ```

---

### 5. **Exemplo Completo de Aplicação com Prisma e Node.js**

Vamos criar uma aplicação simples onde usuários podem se cadastrar e trocar mensagens entre si.

#### Estrutura do projeto:

```
project/
│
├── prisma/
│   ├── schema.prisma       # Definição do esquema do Prisma
│   ├── seed.js             # Script para seed de dados
│
├── controllers/
│   └── userController.js    # Controller dos usuários
│   └── messageController.js # Controller das mensagens
│
├── routes/
│   └── userRoutes.js        # Rotas dos usuários
│   └── messageRoutes.js     # Rotas das mensagens
│
├── app.js                   # Configuração principal do Express
├── package.json             # Dependências do projeto
└── ...
```

#### 5.1. **Definição do Esquema Prisma (`prisma/schema.prisma`)**

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id       Int      @id @default(autoincrement())
  name     String
  email    String   @unique
  password String
  messages Message[]
}

model Message {
  id         Int      @id @default(autoincrement())
  content    String
  createdAt  DateTime @default(now())
  senderId   Int
  receiverId Int
  sender     User     @relation("SentMessages", fields: [senderId], references: [id])
  receiver   User     @relation("ReceivedMessages", fields: [receiverId], references: [id])
}
```

#### 5.2. **Rotas de Cadastro e Mensagens**

##### **Rotas de Usuários (`routes/userRoutes.js`)**

```javascript
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Cadastro de usuário
router.post('/register', userController.register);

module.exports = router;
```

##### **Rotas de Mensagens (`routes/messageRoutes.js`)**

```javascript
const express = require('express');
const messageController = require('../controllers/messageController');
const router = express.Router();

// Enviar mensagem
router.post('/send', messageController.sendMessage);

// Obter mensagens de um usuário
router.get('/inbox/:userId', messageController.getInbox);

module.exports = router;
```

#### 5.3. **Controladores**

##### **Controlador de Usuários (`controllers/userController.js`)**

```javascript
const prisma = require('../prisma/client'); // Prisma Client

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email, password },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

##### **Controlador de Mensagens (`controllers/messageController.js`)**

```javascript
const prisma = require('../prisma/client');

exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  try {
    const message = await prisma.message.create({
      data: { senderId, receiverId, content },
    });
    res.status
````

Para filtrar mensagens de um usuário específico pelo conteúdo, podemos usar a funcionalidade de **filtros** oferecida pelo Prisma no modelo **Message**. Vamos adaptar a função de busca de mensagens de um usuário para que seja possível buscar apenas as mensagens que contenham um determinado texto no conteúdo.


Vamos adicionar um filtro na função `getInbox` para que possamos filtrar as mensagens de um determinado usuário pelo conteúdo.

```javascript
const prisma = require('../prisma/client');

// Buscar as mensagens de um usuário filtradas por conteúdo
exports.getInbox = async (req, res) => {
  const { userId } = req.params;
  const { search } = req.query;  // Parâmetro de busca (texto para filtrar no conteúdo)

  try {
    // Consulta Prisma para buscar as mensagens recebidas por um usuário específico
    const messages = await prisma.message.findMany({
      where: {
        receiverId: parseInt(userId),  // Filtra as mensagens do usuário especificado
        content: {
          contains: search || '',      // Filtra pelo conteúdo usando o parâmetro de busca (se fornecido)
          mode: 'insensitive',         // Torna a busca insensível a maiúsculas/minúsculas
        },
      },
      include: {
        sender: true,  // Inclui os detalhes do remetente
      },
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

#### 2. **Explicação do Código**

- **where**: Estamos filtrando as mensagens onde o `receiverId` corresponde ao ID do usuário, ou seja, todas as mensagens que o usuário recebeu.
- **content.contains**: O filtro `contains` é usado para buscar uma correspondência parcial no campo `content` da mensagem. O `search` é um parâmetro de query que será enviado na URL.
  - **mode: 'insensitive'**: Faz com que a busca seja insensível a maiúsculas e minúsculas.
- **include**: O campo `sender` está sendo incluído para que possamos ver os detalhes do remetente de cada mensagem.

#### 3. **Rota de Mensagens com Filtro de Conteúdo**

##### **Rotas de Mensagens (`routes/messageRoutes.js`)**

Agora podemos buscar as mensagens de um usuário específico e filtrar pelo conteúdo fornecido na query string.

```javascript
const express = require('express');
const messageController = require('../controllers/messageController');
const router = express.Router();

// Obter mensagens recebidas de um usuário, com a opção de filtrar pelo conteúdo
router.get('/inbox/:userId', messageController.getInbox);

module.exports = router;
```

#### 4. **Exemplo de Requisição para Filtrar Mensagens**

Para buscar todas as mensagens recebidas pelo usuário com ID `1` que contenham o texto "hello" no conteúdo, a requisição seria feita da seguinte forma:

```
GET /inbox/1?search=hello
```

Isso retornaria todas as mensagens que o usuário de ID `1` recebeu e que contenham a palavra "hello" no conteúdo, ignorando maiúsculas e minúsculas.

---

Para carregar os dados de um usuário, incluindo suas mensagens enviadas e recebidas, você pode usar o recurso de **relacionamentos** do Prisma e o método **`include`** para obter os dados relacionados. Vamos criar uma consulta que traga o usuário, suas mensagens enviadas e recebidas, tudo em uma única chamada ao banco de dados.

### Exemplo: Carregar Usuário com Mensagens Enviadas e Recebidas

#### 1. **Controlador de Usuários (`controllers/userController.js`)**

Vamos criar uma função para buscar um usuário pelo ID e carregar as mensagens enviadas e recebidas.

```javascript
const prisma = require('../prisma/client');

// Buscar um usuário e carregar suas mensagens enviadas e recebidas
exports.getUserWithMessages = async (req, res) => {
  const { userId } = req.params;

  try {
    // Consulta Prisma para buscar o usuário pelo ID e incluir as mensagens enviadas e recebidas
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: {
        messages: { // Mensagens enviadas (campo 'messages' vem do modelo 'Message')
          include: { receiver: true },  // Incluir dados do destinatário
        },
        receivedMessages: { // Mensagens recebidas
          include: { sender: true },    // Incluir dados do remetente
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

#### 2. **Explicação do Código**

- **findUnique**: Estamos buscando um usuário único pelo seu ID.
- **include**: Usamos o `include` para incluir os relacionamentos:
  - **messages**: Refere-se às mensagens que o usuário enviou.
  - **receivedMessages**: Refere-se às mensagens que o usuário recebeu.
  - Para cada relacionamento, usamos o `include` para incluir os dados do remetente (para mensagens recebidas) e do destinatário (para mensagens enviadas).
  
No modelo `Message` que criamos no **Prisma** anteriormente, o usuário possui dois relacionamentos:
- **messages**: As mensagens que ele enviou.
- **receivedMessages**: As mensagens que ele recebeu.

Esses relacionamentos são configurados no modelo Prisma da seguinte forma:

```prisma
model User {
  id              Int       @id @default(autoincrement())
  name            String
  email           String    @unique
  password        String
  messages        Message[] @relation("SentMessages") // Mensagens enviadas
  receivedMessages Message[] @relation("ReceivedMessages") // Mensagens recebidas
}

model Message {
  id         Int      @id @default(autoincrement())
  content    String
  createdAt  DateTime @default(now())
  senderId   Int
  receiverId Int
  sender     User     @relation("SentMessages", fields: [senderId], references: [id])
  receiver   User     @relation("ReceivedMessages", fields: [receiverId], references: [id])
}
```

#### 3. **Rota para Carregar Dados do Usuário e suas Mensagens**

##### **Rotas de Usuários (`routes/userRoutes.js`)**

Vamos criar uma rota para chamar a função `getUserWithMessages` no controlador.

```javascript
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Obter dados do usuário com mensagens enviadas e recebidas
router.get('/user/:userId/messages', userController.getUserWithMessages);

module.exports = router;
```

#### 4. **Exemplo de Requisição**

Para buscar os dados de um usuário com ID `1`, incluindo as mensagens que ele enviou e recebeu, faça uma requisição GET:

```
GET /user/1/messages
```

#### 5. **Resposta JSON Esperada**

A resposta JSON incluirá o usuário com suas mensagens enviadas e recebidas. Veja um exemplo de como os dados podem ser estruturados:

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password",
  "messages": [
    {
      "id": 1,
      "content": "Olá, como você está?",
      "createdAt": "2024-01-01T12:00:00.000Z",
      "receiver": {
        "id": 2,
        "name": "Jane Doe",
        "email": "jane@example.com"
      }
    }
  ],
  "receivedMessages": [
    {
      "id": 2,
      "content": "Estou bem, obrigado!",
      "createdAt": "2024-01-02T14:00:00.000Z",
      "sender": {
        "id": 2,
        "name": "Jane Doe",
        "email": "jane@example.com"
      }
    }
  ]
}
```
