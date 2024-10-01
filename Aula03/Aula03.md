# MVC PATTERN

## Detalhamento sobre Arquiteturas: **MVC**, **MVVM** e **MVP**


## 1. **MVC (Model-View-Controller)**

### Conceito

O **MVC** é um dos padrões arquiteturais mais antigos e populares. Ele divide a aplicação em três componentes principais:

- **Model**: Representa os dados e a lógica de negócio da aplicação. Ele não interage diretamente com a interface do usuário, mas sim com o **Controller**.
- **View**: Responsável pela apresentação e interação com o usuário. Exibe os dados ao usuário e captura as interações, como cliques e entradas de texto.
- **Controller**: Atua como intermediário entre o **Model** e a **View**. Recebe as requisições do usuário através da **View**, interage com o **Model** para obter ou manipular dados, e envia os resultados de volta à **View**.

### Fluxo de Interação

1. O **usuário** interage com a **View** (clicando em um botão, por exemplo).
2. A **View** delega o controle da ação para o **Controller**.
3. O **Controller** processa a solicitação e interage com o **Model**.
4. O **Model** realiza operações de negócio ou recupera dados, retornando os resultados para o **Controller**.
5. O **Controller** atualiza a **View** com os dados que o **Model** retornou.

### Vantagens do MVC

- **Separação de responsabilidades**: Cada componente tem sua função bem definida, o que facilita a manutenção e a escalabilidade.
- **Reutilização de código**: As **Views** podem ser reutilizadas, e os **Models** podem ser usados em diferentes **Controllers**.
- **Organização**: Facilita o gerenciamento de grandes projetos ao separar claramente as preocupações.

### Desvantagens do MVC

- **Comunicação complexa**: A comunicação entre o **Controller**, **Model** e **View** pode ficar complexa em grandes aplicações.
- **Atualizações manuais na View**: Dependendo da implementação, pode ser necessário atualizar a **View** manualmente sempre que o **Model** mudar.

### Exemplo de Implementação

Usando o exemplo em **Node.js** com **Express**, temos o fluxo:

1. O **Controller** recebe uma requisição HTTP.
2. O **Controller** chama o **Model** para buscar ou manipular dados.
3. O **Controller** passa os dados para a **View** (usando um template como EJS) para renderizar a resposta.

---

## 2. **MVVM (Model-View-ViewModel)**

### Conceito

O **MVVM** foi popularizado principalmente pelo desenvolvimento de interfaces gráficas ricas, como em **WPF** (Windows Presentation Foundation) e **JavaScript frameworks** (Angular, Vue.js). Ele é uma variação do **MVC**, mas com uma abordagem mais voltada à separação da lógica de apresentação (ViewModel) e ligação bidirecional entre a **View** e o **ViewModel**.

- **Model**: Similar ao **MVC**, o **Model** contém os dados e a lógica de negócio.
- **View**: A interface gráfica ou página web que o usuário vê e com a qual interage.
- **ViewModel**: Atua como um intermediário entre a **View** e o **Model**. Ele armazena o estado da **View** e os dados a serem exibidos, além de manipular eventos. O **ViewModel** expõe propriedades e comandos que a **View** consome.

### Fluxo de Interação

1. O **usuário** interage com a **View**, que está vinculada ao **ViewModel**.
2. A **View** envia eventos diretamente para o **ViewModel** (em vez de passar pelo **Controller** como no MVC).
3. O **ViewModel** interage com o **Model** para buscar ou atualizar dados.
4. Qualquer mudança no **ViewModel** é refletida automaticamente na **View** através de **data binding** (ligação de dados).
5. O **ViewModel** manipula a lógica de apresentação sem alterar diretamente a **View**.

### Vantagens do MVVM

- **Data binding**: A **View** é automaticamente atualizada quando o **ViewModel** muda, reduzindo a necessidade de manipulação manual da interface.
- **Separação clara**: A lógica de apresentação e a lógica de negócios ficam separadas.
- **Testabilidade**: Como o **ViewModel** contém a lógica de apresentação, ele pode ser testado de maneira isolada, sem a necessidade de testar a **View**.

### Desvantagens do MVVM

- **Complexidade**: O padrão pode adicionar complexidade, especialmente em sistemas pequenos, por causa da necessidade de implementar o **data binding**.
- **Performance**: Em aplicações grandes, o **data binding** pode impactar a performance se não for otimizado corretamente.

### Exemplo de Implementação

Frameworks como **Angular** e **Vue.js** são grandes exemplos de **MVVM** em aplicações web, onde as propriedades do **ViewModel** são refletidas automaticamente na interface gráfica através de **binding** de dados.

---

## 3. **MVP (Model-View-Presenter)**

### Conceito

O **MVP** é um padrão similar ao **MVC**, mas com algumas diferenças importantes. O foco do **MVP** está em melhorar o desacoplamento entre a **View** e a lógica de apresentação, de modo que a **View** não contenha nenhuma lógica de negócio e apenas delegue todas as ações para o **Presenter**.

- **Model**: Contém a lógica de negócios e os dados da aplicação.
- **View**: Responsável pela exibição de informações, mas sem conter lógica de negócio. Geralmente, é uma interface que o **Presenter** utiliza para manipular a interface gráfica.
- **Presenter**: O **Presenter** manipula a lógica de apresentação e interage diretamente com a **View** através de uma interface. Ele manipula eventos da **View**, acessa o **Model** e atualiza a **View**.

### Fluxo de Interação

1. O **usuário** interage com a **View**.
2. A **View** notifica o **Presenter** de que uma ação foi realizada.
3. O **Presenter** processa a ação, interage com o **Model** e atualiza a **View**.

### Vantagens do MVP

- **Desacoplamento**: A **View** e o **Presenter** são completamente desacoplados, permitindo que a **View** seja modificada ou testada independentemente.
- **Testabilidade**: O **Presenter** pode ser testado facilmente sem a necessidade da **View** real.
- **Simplicidade na View**: A lógica da **View** fica extremamente simples, apenas executando comandos e atualizando a interface.

### Desvantagens do MVP

- **Comunicação extra**: A **View** e o **Presenter** precisam se comunicar frequentemente, o que pode adicionar complexidade à medida que a aplicação cresce.
- **Mais código boilerplate**: Implementar interfaces para a **View** e o **Presenter** pode resultar em código repetitivo.

### Exemplo de Implementação

O padrão **MVP** é frequentemente usado em aplicações desktop ou móveis, como **Android**, onde o **Presenter** manipula a lógica e a interface gráfica é um simples elemento de exibição.

---

## Comparação Entre **MVC**, **MVVM** e **MVP**

| **Característica**        | **MVC**                                        | **MVVM**                                              | **MVP**                                        |
|---------------------------|------------------------------------------------|-------------------------------------------------------|------------------------------------------------|
| **Responsabilidade da View**    | Reage às interações do usuário e exibe dados        | Exibe os dados fornecidos pelo ViewModel via binding   | Exibe os dados e notifica o Presenter de eventos|
| **Responsabilidade do Controller/Presenter/ViewModel** | **Controller**: Manipula ações e interage com Model   | **ViewModel**: Liga a View e o Model, manipula eventos | **Presenter**: Manipula a lógica de apresentação|
| **Data binding**           | Não é usado diretamente                        | Usado para sincronizar a View e o ViewModel           | Não há data binding automático                   |
| **Testabilidade**          | Médio (controller pode ser testado isoladamente)| Alto (ViewModel pode ser testado isoladamente)         | Alto (Presenter pode ser testado isoladamente)  |
| **Complexidade**           | Moderada                                       | Alta (binding pode adicionar complexidade)             | Moderada, mas pode crescer com o tamanho da aplicação |
| **Exemplos comuns**        | Web frameworks como Rails, Express.js          | Angular, Vue.js, frameworks com data binding           | Aplicações Android, Windows Forms, etc.         |

---


## Exemplos dos Padrões

### 1. **MVC (Model-View-Controller)**

O padrão **MVC** separa a aplicação em três camadas: **Model**, **View**, e **Controller**. O **Controller** recebe as requisições, interage com o **Model**, e envia os dados processados para a **View**.

#### Estrutura do projeto:
```
project/
│
├── controllers/
│   └── userController.js
├── models/
│   └── userModel.js
├── views/
│   └── userView.ejs
├── routes/
│   └── userRoutes.js
├── app.js
└── package.json
```

#### userController.js
```javascript
const UserModel = require('../models/userModel');

exports.getUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.render('userView', { user });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
```

#### userModel.js
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
```

#### userView.ejs
```html
<html>
  <body>
    <h1><%= user.name %></h1>
    <p>Email: <%= user.email %></p>
  </body>
</html>
```

#### userRoutes.js
```javascript
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/user/:id', userController.getUser);

module.exports = router;
```

#### app.js
```javascript
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(userRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

---

### 2. **MVVM (Model-View-ViewModel)**

No padrão **MVVM**, o **ViewModel** serve como uma ponte entre o **Model** e a **View**. A lógica de apresentação fica no **ViewModel** e a **View** escuta e reage às mudanças do **ViewModel**.

#### Estrutura do projeto:
```
project/
│
├── viewmodels/
│   └── userViewModel.js
├── models/
│   └── userModel.js
├── views/
│   └── userView.ejs
├── routes/
│   └── userRoutes.js
├── app.js
└── package.json
```

#### userViewModel.js
```javascript
const UserModel = require('../models/userModel');

exports.getUserData = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        // Simulando a transformação dos dados no ViewModel
        const viewModel = {
            displayName: `${user.name} (ID: ${user._id})`,
            email: user.email,
        };
        res.render('userView', { viewModel });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
```

#### userModel.js
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
```

#### userView.ejs
```html
<html>
  <body>
    <h1><%= viewModel.displayName %></h1>
    <p>Email: <%= viewModel.email %></p>
  </body>
</html>
```

#### userRoutes.js
```javascript
const express = require('express');
const router = express.Router();
const userViewModel = require('../viewmodels/userViewModel');

router.get('/user/:id', userViewModel.getUserData);

module.exports = router;
```

#### app.js
```javascript
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(userRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

---

### 3. **MVP (Model-View-Presenter)**

No padrão **MVP**, o **Presenter** coordena a interação entre a **View** e o **Model**. A lógica fica no **Presenter**, enquanto a **View** é mais passiva, esperando os dados serem passados a ela.

#### Estrutura do projeto:
```
project/
│
├── presenters/
│   └── userPresenter.js
├── models/
│   └── userModel.js
├── views/
│   └── userView.ejs
├── routes/
│   └── userRoutes.js
├── app.js
└── package.json
```

#### userPresenter.js
```javascript
const UserModel = require('../models/userModel');

exports.presentUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        // Passa os dados prontos para a view
        res.render('userView', { name: user.name, email: user.email });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
```

#### userModel.js
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
```

#### userView.ejs
```html
<html>
  <body>
    <h1><%= name %></h1>
    <p>Email: <%= email %></p>
  </body>
</html>
```

#### userRoutes.js
```javascript
const express = require('express');
const router = express.Router();
const userPresenter = require('../presenters/userPresenter');

router.get('/user/:id', userPresenter.presentUser);

module.exports = router;
```

#### app.js
```javascript
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(userRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```


# MVC - Exemplo em aula


## Estrutura Atualizada do Projeto

```
project/
│
├── controllers/
│   └── userController.js
├── models/
│   ├── userDAO.js
│   └── userModel.js
├── views/
│   └── userView.ejs
├── routes/
│   └── userRoutes.js
├── db/
│   └── users.json  
├── app.js
└── package.json
```


## EJS 



#### 1. **O que é EJS?**

**EJS** (Embedded JavaScript) é uma engine de templates para Node.js que permite a geração de **HTML** dinâmica com código JavaScript embutido. Com EJS, você pode inserir lógica de programação dentro de templates HTML para renderizar páginas de forma dinâmica, como exibir listas de dados, personalizar conteúdo com base no contexto ou incluir condicionais e loops.

EJS é muito popular em aplicações **Express.js** por sua simplicidade e integração com essa biblioteca. Ele permite que você mantenha a lógica do front-end separada da lógica do back-end, facilitando a manutenção do código e a modularização das páginas.

---

#### 2. **Instalação e Configuração**

Primeiro, você precisa ter **Node.js** e **Express** instalados. Para instalar o **EJS** e configurá-lo em um projeto Express, siga os seguintes passos:

1. **Inicialize um novo projeto Node.js**:
   ```bash
   mkdir projeto-ejs
   cd projeto-ejs
   npm init -y
   ```

2. **Instale as dependências**:
   ```bash
   npm install express ejs
   ```

3. **Configuração do Express com EJS**:
   Crie o arquivo `app.js` para configurar o servidor Express e utilizar EJS como a engine de templates.

   ```javascript
   const express = require('express');
   const app = express();

   // Configurando a view engine EJS
   app.set('view engine', 'ejs');

   // Rota principal
   app.get('/', (req, res) => {
       const nome = "Aluno";
       const hobbies = ['Programar', 'Jogar', 'Ler'];
       res.render('index', { nome, hobbies });
   });

   // Iniciando o servidor
   app.listen(3000, () => {
       console.log('Servidor rodando na porta 3000');
   });
   ```

---

#### 3. **Criando Templates EJS**

Os arquivos **EJS** são criados com a extensão `.ejs` e ficam geralmente dentro de uma pasta chamada **views** no projeto.

1. **Estrutura do projeto**:

   ```
   projeto-ejs/
   │
   ├── views/
   │   └── index.ejs
   ├── app.js
   └── package.json
   ```

2. **Exemplo de um arquivo EJS (`index.ejs`)**:

   ```html
   <!DOCTYPE html>
   <html lang="pt-br">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Página Principal</title>
   </head>
   <body>
       <h1>Bem-vindo, <%= nome %>!</h1>

       <h2>Seus hobbies:</h2>
       <ul>
           <% hobbies.forEach(function(hobby) { %>
               <li><%= hobby %></li>
           <% }) %>
       </ul>
   </body>
   </html>
   ```

   - **`<%= nome %>`**: Esse código JavaScript exibe o valor da variável `nome`, passada pelo servidor Express para o template.
   - **`<% %>`**: Usado para lógica de controle, como loops ou condicionais (não exibe nada na tela).

---

#### 4. **Sintaxe do EJS**

EJS permite inserir código JavaScript dentro do HTML utilizando as seguintes sintaxes:

1. **Interpolação de variáveis**: Exibe o valor de uma variável ou expressão.

   ```html
   <h1>Olá, <%= nome %>!</h1>
   ```

2. **Códigos de controle (loops, condicionais)**: Permite executar lógica como loops, ifs, etc., sem imprimir nada diretamente.

   - **Loops**:
     ```html
     <ul>
       <% frutas.forEach(function(fruta) { %>
         <li><%= fruta %></li>
       <% }) %>
     </ul>
     ```

   - **Condicionais**:
     ```html
     <% if (usuario) { %>
       <h1>Bem-vindo, <%= usuario %>!</h1>
     <% } else { %>
       <h1>Você não está logado.</h1>
     <% } %>
     ```

3. **Incluir arquivos parciais**: Você pode incluir partes de HTML reutilizáveis, como cabeçalhos e rodapés, usando `include`.

   ```html
   <% include partials/header.ejs %>
   <h1>Conteúdo da página</h1>
   <% include partials/footer.ejs %>
   ```

---

#### 5. **Passando Dados para o Template**

Você pode passar dados do servidor para os templates **EJS** ao renderizar a página. No exemplo abaixo, estamos passando um objeto com variáveis para o template:

```javascript
app.get('/', (req, res) => {
   const usuario = {
       nome: 'João',
       idade: 30,
       profissao: 'Desenvolvedor'
   };
   res.render('index', { usuario });
});
```

No **index.ejs**, você pode acessar as variáveis passadas:

```html
<h1>Nome: <%= usuario.nome %></h1>
<p>Idade: <%= usuario.idade %> anos</p>
<p>Profissão: <%= usuario.profissao %></p>
```

---

#### 6. **Usando Layouts e Partials**

Em projetos maiores, é comum ter layouts e componentes repetidos, como cabeçalhos e rodapés. EJS facilita a reutilização de trechos de código com **partials**.

- **Partial de Cabeçalho (`views/partials/header.ejs`)**:
  
  ```html
  <header>
      <h1>Meu Site</h1>
      <nav>
          <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/sobre">Sobre</a></li>
          </ul>
      </nav>
  </header>
  ```

- **Partial de Rodapé (`views/partials/footer.ejs`)**:
  
  ```html
  <footer>
      <p>Copyright © 2024 Meu Site</p>
  </footer>
  ```

- **Template principal (`views/index.ejs`)**:

  ```html
  <% include partials/header.ejs %>
  <h2>Bem-vindo à página principal!</h2>
  <% include partials/footer.ejs %>
  ```

---

#### 7. **Lidando com Condicionais e Loops no EJS**

O EJS permite que você use estruturas condicionais e loops diretamente dentro do template.

##### **Exemplo de condicional**:

```html
<% if (usuario) { %>
  <h1>Bem-vindo, <%= usuario.nome %>!</h1>
<% } else { %>
  <h1>Bem-vindo, visitante!</h1>
<% } %>
```

##### **Exemplo de loop**:

```html
<ul>
  <% produtos.forEach(function(produto) { %>
    <li><%= produto.nome %> - R$ <%= produto.preco.toFixed(2) %></li>
  <% }) %>
</ul>
```

---

#### 8. **Formulários e EJS**

Você pode facilmente integrar formulários HTML com o **EJS**, passando dados para o servidor Express através de requisições POST ou GET.

##### **Exemplo de um formulário EJS**:

```html
<form action="/usuario" method="POST">
    <label for="nome">Nome:</label>
    <input type="text" id="nome" name="nome">
    <button type="submit">Enviar</button>
</form>
```

No servidor, você captura os dados do formulário com o **Express**:

```javascript
app.post('/usuario', (req, res) => {
    const nome = req.body.nome;
    res.send(`Nome enviado: ${nome}`);
});
```

---

#### 9. **Uso Prático: Renderizando Dados de um Banco de Dados**

Uma das aplicações mais comuns do EJS é renderizar dados vindos de um banco de dados (por exemplo, MongoDB). Imagine que você tenha uma coleção de usuários em um banco de dados:

##### **Rota no Express**:

```javascript
app.get('/usuarios', async (req, res) => {
    const usuarios = await User.find(); // Consulta ao banco de dados
    res.render('usuarios', { usuarios });
});
```

##### **Template EJS para listar usuários**:

```html
<h1>Lista de Usuários</h1>
<ul>
    <% usuarios.forEach(function(usuario) { %>
        <li><%= usuario.nome %> - <%= usuario.email %></li>
    <% }) %>
</ul>
```

---

#### 10. **Vantagens do EJS**

- **Simplicidade**: A curva de aprendizado do EJS é baixa, pois ele utiliza sintaxe de JavaScript.
- **Flexibilidade**: Permite usar JavaScript diretamente no HTML, o que facilita a criação de páginas dinâmicas.
- **Integração com Express**: EJS se integra muito bem com o Express.js, o que é comum em aplicações Node.js.
- **Manutenção**:
