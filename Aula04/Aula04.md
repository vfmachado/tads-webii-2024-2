# Aula 04 

## DAO vs Repository

### **1. O que é o DAO (Data Access Object)?**

O **DAO** é um padrão de design que encapsula a lógica de acesso ao banco de dados em um único objeto ou classe. Ele é responsável por interagir diretamente com a fonte de dados (como um banco de dados relacional ou NoSQL) e oferece métodos específicos para realizar operações CRUD (Create, Read, Update, Delete).

#### Características do DAO:
- **Foco no banco de dados**: O DAO se concentra em expor as operações que refletem as tabelas e as entidades do banco de dados. Por exemplo, um `UserDAO` poderia ter métodos como `findUserById()`, `saveUser()`, `updateUser()` e `deleteUser()`.
- **Operações específicas**: Cada DAO é, em geral, específico para uma entidade (por exemplo, `UserDAO`, `ProductDAO`). Ele lida com a conversão de objetos de aplicação (como um `User`) para os formatos aceitos pelo banco de dados (linhas de tabelas, por exemplo).
- **Abstração direta do banco**: O DAO oculta os detalhes das operações SQL ou de outra forma de acesso aos dados, mas o foco ainda é muito centrado em como a entidade é mapeada e manipulada no banco.

#### Exemplo de DAO (Node.js com SQLite):
```javascript
const db = require('../db/database');
const User = require('../models/userModel');

class UserDAO {
    getAllUsers() {
        const stmt = db.prepare('SELECT * FROM users');
        return stmt.all();
    }

    getUserById(id) {
        const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
        return stmt.get(id);
    }

    createUser(user) {
        const stmt = db.prepare('INSERT INTO users (name, email, age) VALUES (?, ?, ?)');
        return stmt.run(user.name, user.email, user.age);
    }

    updateUser(user) {
        const stmt = db.prepare('UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?');
        return stmt.run(user.name, user.email, user.age, user.id);
    }

    deleteUser(id) {
        const stmt = db.prepare('DELETE FROM users WHERE id = ?');
        return stmt.run(id);
    }
}

module.exports = new UserDAO();
```

---

### **2. O que é o Repository?**

O **Repository** é um padrão que abstrai e encapsula o acesso aos dados de uma maneira que representa um **repositório de objetos de domínio**. Ele vai além de expor operações CRUD básicas e busca encapsular mais a lógica de negócio. O **Repository** oferece uma camada de abstração que não está diretamente ligada ao banco de dados, mas sim aos **objetos de domínio** da aplicação.

#### Características do Repository:
- **Foco na lógica de domínio**: O **Repository** foca em expor métodos que façam sentido no contexto do domínio da aplicação. Por exemplo, em vez de ter métodos estritamente CRUD, ele pode ter métodos mais específicos, como `findActiveUsers()`, `findUsersByRole()`, etc.
- **Abstração maior**: O **Repository** pode ser implementado para suportar múltiplas fontes de dados ou formas de persistência (um banco de dados SQL, NoSQL, um serviço REST, etc.) sem que a camada de domínio ou de aplicação precise conhecer os detalhes.
- **Pode usar DAO internamente**: Muitas vezes, um **Repository** usa um ou mais DAOs internamente para gerenciar os detalhes de persistência e conversão de dados.

#### Exemplo de Repository (Node.js com SQLite):
```javascript
const UserDAO = require('../dao/userDAO');
const User = require('../models/userModel');

class UserRepository {
    getAllActiveUsers() {
        const users = UserDAO.getAllUsers();
        return users.filter(user => user.isActive);
    }

    getUserById(id) {
        return UserDAO.getUserById(id);
    }

    createUser(user) {
        if (!user.isValid()) {
            throw new Error('Usuário inválido');
        }
        return UserDAO.createUser(user);
    }

    updateUser(user) {
        if (!user.isValid()) {
            throw new Error('Usuário inválido');
        }
        return UserDAO.updateUser(user);
    }

    deleteUser(id) {
        return UserDAO.deleteUser(id);
    }
}

module.exports = new UserRepository();
```

> **Nota**: No exemplo acima, o **UserRepository** usa o **UserDAO** para acessar diretamente o banco de dados, mas ele poderia facilmente ser adaptado para trabalhar com outra fonte de dados, como um serviço web ou uma API.

---

### **3. Principais Diferenças entre DAO e Repository**

| **Aspecto**                 | **DAO**                                               | **Repository**                                        |
|----------------------------|-------------------------------------------------------|-------------------------------------------------------|
| **Foco**                   | Operações específicas de banco de dados para uma entidade. | Lógica de domínio e persistência de objetos de domínio.|
| **Abstração**              | Menos abstrato, mais próximo do banco de dados.       | Mais abstrato, pode usar DAOs internamente.           |
| **Escopo**                 | Geralmente específico para uma entidade (ex: UserDAO).| Pode ser mais amplo, agregando lógica de várias entidades.|
| **Flexibilidade**          | Restrito ao banco de dados e operações CRUD.          | Flexível para usar múltiplas fontes de dados.         |
| **Dependência de SQL**     | Frequente uso de SQL ou APIs específicas do banco.    | Abstrai detalhes de persistência, não necessariamente expõe SQL.|
| **Quando usar**            | Quando você precisa de uma camada simples para gerenciar entidades e persistência. | Quando você precisa encapsular lógica de domínio e lidar com diferentes fontes de dados. |

---

### **4. Quando Usar DAO e Quando Usar Repository?**

- **Use DAO quando**:
  - Você tem uma aplicação simples e deseja apenas encapsular o acesso ao banco de dados sem adicionar muita complexidade.
  - Sua aplicação está diretamente ligada a um único banco de dados e as operações são simples CRUD.
  - Você quer um nível de abstração mais próximo da estrutura do banco, como tabelas e colunas.

- **Use Repository quando**:
  - Você precisa de uma abstração mais alta que encapsule não apenas operações CRUD, mas também lógica de domínio.
  - Sua aplicação pode mudar de forma de persistência no futuro (ex: de SQL para NoSQL) e você quer evitar que essa mudança afete outras camadas do sistema.
  - Você tem múltiplas fontes de dados e precisa unificar o acesso a elas em um único ponto, escondendo os detalhes de implementação.

---

### **Conclusão**

**DAO** e **Repository** são padrões poderosos, mas cada um tem seu contexto e propósito. O **DAO** é mais simples e mais diretamente ligado ao banco de dados, ideal para aplicações menores ou com complexidade reduzida. O **Repository**, por outro lado, é mais flexível e se encaixa melhor em cenários onde a lógica de domínio precisa ser abstraída e manipulada de forma independente da persistência dos dados.

A escolha entre DAO e Repository depende da complexidade da aplicação, da necessidade de abstração.



## Padrão **Repository** com **SQLite**, **Node.js** e **Express**

O padrão **Repository** é um padrão arquitetural utilizado para separar a lógica de acesso aos dados da lógica de negócio, fornecendo uma camada intermediária entre a aplicação e o banco de dados. Essa abordagem facilita a manutenção, testabilidade e reutilização de código, e é muito útil em projetos que envolvem bancos de dados relacionais como o **SQLite**.

---

### 1. **O que é o Padrão Repository?**

O **Repository** age como uma **abstração** sobre as operações de acesso aos dados (CRUD - Create, Read, Update, Delete). Ele oferece uma interface para as camadas superiores da aplicação (por exemplo, o Controller) para interagir com os dados sem precisar conhecer os detalhes de implementação do banco de dados.

- **Model**: Representa os dados e as regras de negócios.
- **Repository**: Manipula os dados (consultas, inserções, atualizações, exclusões) através do banco de dados.
- **Controller**: Utiliza o **Repository** para acessar os dados e direcionar a lógica da aplicação.

---

### 2. **Instalação e Configuração do Projeto**

1. **Inicialize um novo projeto Node.js**:
   ```bash
   mkdir repository-pattern-example
   cd repository-pattern-example
   npm init -y
   ```

2. **Instale as dependências**:
   ```bash
   npm install express better-sqlite3
   ```

3. **Estrutura do Projeto**:
   ```
   repository-pattern-example/
   │
   ├── controllers/
   │   └── userController.js
   ├── models/
   │   └── userModel.js
   ├── repositories/
   │   └── userRepository.js
   ├── db/
   │   ├── database.js
   ├── routes/
   │   └── userRoutes.js
   ├── app.js
   └── package.json
   ```

---

### 3. **Configuração do Banco de Dados (SQLite)**

Vamos usar **better-sqlite3**, uma biblioteca que permite acesso síncrono ao SQLite, para simplificar nosso exemplo.

#### `db/database.js`

```javascript
const Database = require('better-sqlite3');

// Conectando ou criando o banco de dados SQLite
const db = new Database('users.db');

// Criando a tabela de usuários se não existir
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    age INTEGER NOT NULL
  );
`);

module.exports = db;
```

---

### 4. **Model: Representando os Dados**

O Model é responsável por representar a entidade que vamos manipular na aplicação.

#### `models/userModel.js`

```javascript
class User {
    constructor(id, name, email, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
    }
}

module.exports = User;
```

---

### 5. **Repository: Implementando o Padrão Repository**

O **Repository** encapsula a lógica de interação com o banco de dados, fornecendo métodos para manipulação dos dados sem expor os detalhes das queries SQL diretamente na camada de controle.

#### `repositories/userRepository.js`

```javascript
const db = require('../db/database');
const User = require('../models/userModel');

class UserRepository {
    // Pega todos os usuários
    getAll() {
        const stmt = db.prepare('SELECT * FROM users');
        const users = stmt.all();
        return users.map(user => new User(user.id, user.name, user.email, user.age));
    }

    // Pega um usuário pelo ID
    getById(id) {
        const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
        const user = stmt.get(id);
        return user ? new User(user.id, user.name, user.email, user.age) : null;
    }

    // Cria um novo usuário
    create(user) {
        const stmt = db.prepare('INSERT INTO users (name, email, age) VALUES (?, ?, ?)');
        const result = stmt.run(user.name, user.email, user.age);
        return new User(result.lastInsertRowid, user.name, user.email, user.age);
    }

    // Atualiza um usuário
    update(user) {
        const stmt = db.prepare('UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?');
        const result = stmt.run(user.name, user.email, user.age, user.id);
        return result.changes > 0 ? user : null;
    }

    // Exclui um usuário pelo ID
    delete(id) {
        const stmt = db.prepare('DELETE FROM users WHERE id = ?');
        const result = stmt.run(id);
        return result.changes > 0;
    }
}

module.exports = new UserRepository();
```

---

### 6. **Controller: Interagindo com o Repository**

O **Controller** é responsável por receber as requisições, chamar o **Repository** para acessar os dados, e devolver a resposta adequada ao cliente.

#### `controllers/userController.js`

```javascript
const UserRepository = require('../repositories/userRepository');
const User = require('../models/userModel');

// Exibe todos os usuários
exports.getAllUsers = (req, res) => {
    try {
        const users = UserRepository.getAll();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Exibe um usuário pelo ID
exports.getUserById = (req, res) => {
    try {
        const user = UserRepository.getById(req.params.id);
        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Cria um novo usuário
exports.createUser = (req, res) => {
    try {
        const { name, email, age } = req.body;
        const newUser = new User(null, name, email, age);
        const createdUser = UserRepository.create(newUser);
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Atualiza um usuário
exports.updateUser = (req, res) => {
    try {
        const { name, email, age } = req.body;
        const updatedUser = new User(req.params.id, name, email, age);
        const result = UserRepository.update(updatedUser);
        if (!result) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Exclui um usuário
exports.deleteUser = (req, res) => {
    try {
        const deleted = UserRepository.delete(req.params.id);
        if (!deleted) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.send('Usuário excluído com sucesso');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
```

---

### 7. **Rotas: Configuração das Rotas no Express**

As rotas conectam as requisições HTTP às funções no **Controller**, que então interagem com o **Repository** para acessar os dados.

#### `routes/userRoutes.js`

```javascript
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rotas para os usuários
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
```

---

### 8. **Configuração da Aplicação (app.js)**

Aqui configuramos o Express.js para usar as rotas, middleware para parsing de JSON e iniciar o servidor.

#### `app.js`

```javascript
const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware para parsing de JSON
app.use(express.json());

// Usar as rotas
app.use(userRoutes);

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
```

---

### 9. **Testando a Aplicação**

1. **Inicializar o servidor**:
   ```bash
   node app.js
   ```

2. **Testar as rotas**:
   - `GET /users`: Lista todos os usuários.
   - `POST /users`: Cria um novo usuário.
   - `GET /users/:id`: Exibe um usuário específico.
   - `PUT /users/:id`: Atualiza um usuário existente.
   - `DELETE /users/:id`: Exclui um usuário.

---

