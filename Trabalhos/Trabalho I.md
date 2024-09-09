# Trabalho I

Exercícios com ExpressJS

## 1. **Instalação e Configuração do Express.js**
   - **Descrição:** Instale o Express.js em um projeto Node.js e configure uma rota GET que responda com uma mensagem de boas-vindas.
   - **Objetivo:** Familiarizar-se com a configuração do Express e rotas básicas.

## 2. **Rotas Dinâmicas**
   - **Descrição:** Crie uma rota dinâmica em Express que receba um parâmetro na URL, como o nome de um usuário, e retorne uma mensagem de saudação personalizada (e.g., "Olá, [nome]!").
   - **Objetivo:** Praticar rotas dinâmicas e parâmetros de URL.

## 3. **Middleware de Autenticação Fake**
   - **Descrição:** Implemente um middleware que simule a verificação de autenticação. Se um token for enviado no cabeçalho da requisição, a rota deve continuar, caso contrário, deve retornar um erro 401 (Não Autorizado).
   - **Objetivo:** Entender o conceito de middleware no Express.js.

## 4. **Manipulação de Dados com Query Params**
   - **Descrição:** Crie uma rota GET que receba parâmetros de consulta (query params) para filtrar uma lista de itens (ex.: produtos, usuários) e retorne a lista filtrada.
   - **Objetivo:** Praticar o uso de query params para manipulação de dados.

## 5. **Receber Dados com POST**
   - **Descrição:** Crie uma rota POST que receba um objeto JSON no corpo da requisição (ex.: dados de um novo produto) e o retorne na resposta, adicionando um ID único.
   - **Objetivo:** Entender como lidar com requisições POST e manipulação de dados enviados no corpo.

## 6. **Validação de Dados com Middleware**
   - **Descrição:** Adicione um middleware de validação de dados para uma rota POST. Valide que certos campos (ex.: nome, email) estejam presentes e sejam válidos, retornando erros adequados se os dados estiverem incorretos.
   - **Objetivo:** Praticar a criação de middlewares para validação de dados.

## 7. **Gerenciamento de Erros Globais**
   - **Descrição:** Implemente um middleware de tratamento de erros global no Express.js que capture erros lançados em qualquer rota e retorne uma resposta JSON adequada.
   - **Objetivo:** Entender como lidar com erros de forma centralizada em uma aplicação Express.

