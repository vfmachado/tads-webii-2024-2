# Trabalho II

Data de Entrega: 27/10/2024
Enviar via SIGAA o link para acesso a um repositório do Github.

**Implementação de CRUD de Usuários com NodeJS, Express e SQLite**

**Objetivo:**
Desenvolver uma aplicação web utilizando NodeJS, Express e SQLite que permita a gestão de usuários através de um CRUD (Create, Read, Update, Delete), utilizando HTML como template para as páginas. A aplicação deve atender aos requisitos de negócio especificados.

**Descrição do Sistema:**
O sistema deve permitir o gerenciamento de usuários e seus dados, seguindo as regras abaixo:

1. **Cadastro de Usuários:**
   - O CPF deve ser único para cada usuário.
   - O perfil do usuário (ADMIN ou CLIENTE) deve ser definido automaticamente no cadastro inicial (sem interferência do usuário).
   - A página de cadastro de usuários deve ser acessível através da rota `/addUser`.

2. **Listagem de Usuários:**
   - A listagem de usuários deve ser paginada, exibindo 5 usuários por página.
   - Deve ser possível filtrar os usuários pelo nome.
   - A listagem deve ser acessível pela rota `/users`.

3. **Detalhes do Usuário:**
   - A página de detalhes de um usuário deve exibir todas as informações pessoais (CPF, nome, perfil, etc.), além de múltiplos telefones e emails cadastrados para o usuário.
   - Apenas um telefone e um email podem ser marcados como principal.
   - A rota para acessar os detalhes de um usuário deve ser `/user/:id`.

4. **Exclusão de Usuários:**
   - O sistema deve permitir a exclusão de usuários, exceto aqueles com perfil ADMIN.
   - A exclusão deve ser acessada pela rota `/deleteUser/:id`.

5. **Atualização de Usuários:**
   - O sistema deve permitir a atualização dos dados dos usuários, exceto o CPF e o perfil (ADMIN/CLIENTE), que são imutáveis.
   - Todos os outros campos podem ser atualizados, incluindo telefones e emails, permitindo também a definição de um telefone e um email principal.
   - A atualização deve ser acessível pela rota `/updateUser/:id`.

6. **Multiplicidade de Telefones:**
   - Cada usuário deve poder ter múltiplos telefones, com apenas um marcado como principal (relação 1:N).

7. **Multiplicidade de Emails:**
   - Cada usuário deve poder ter múltiplos emails, com apenas um marcado como principal (relação 1:N).

**Requisitos Técnicos:**
- **Banco de Dados:** Utilize SQLite para persistir os dados.
- **Backend:** Utilize NodeJS com o framework Express para construir as rotas e lidar com as operações de CRUD.
- **Frontend:** Utilize HTML com templates (EJS) para renderizar as páginas de cadastro, listagem, detalhes e atualização de usuários.
- **Paginação e Filtro:** Implemente paginação na listagem de usuários e um filtro pelo nome dos usuários.

**Atividades:**
1. **Criar o Banco de Dados:**
   - Defina as tabelas para armazenar os usuários, seus telefones e emails.
   - Assegure que a tabela de usuários tenha uma coluna de CPF única e que o perfil seja definido na criação (ADMIN ou CLIENTE).

2. **Implementar as Rotas de CRUD:**
   - **Rota `/addUser`:** Exibir o formulário de cadastro de usuários e processar o cadastro.
   - **Rota `/users`:** Exibir a listagem de usuários com paginação e filtro por nome.
   - **Rota `/user/:id`:** Exibir os detalhes de um usuário específico, incluindo telefones e emails.
   - **Rota `/deleteUser/:id`:** Permitir a exclusão de usuários, com validação para impedir a exclusão de ADMINs.
   - **Rota `/updateUser/:id`:** Exibir o formulário de atualização de dados do usuário, exceto CPF e perfil, permitindo a edição de telefones e emails.

3. **Validar as Regras de Negócio:**
   - Implementar validações para garantir que o CPF seja único.
   - Certificar-se de que os perfis (ADMIN/CLIENTE) não possam ser alterados após o cadastro.
   - Garantir que a exclusão de usuários ADMIN seja bloqueada.


**Avaliação:**
O projeto será avaliado com base nos seguintes critérios:
- O trabalho pode ser realizado individualmente ou em dupla.
- Implementação correta das funcionalidades.
- Atendimento às regras de negócio.
- Qualidade do código (organização, clareza, boas práticas).
- Funcionalidade do sistema (correção de bugs e usabilidade).

