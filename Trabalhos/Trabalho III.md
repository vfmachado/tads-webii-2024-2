# Trabalho III

DATA DE ENTREGA: 09/DEZ


## Desenvolvimento de Sistema de Controle de Acesso com Módulos Fixos

**Objetivo:**  
Implementar um sistema web com **Express**, **Prisma** e **SQLite** para gerenciar permissões de acesso a módulos fixos. Este trabalho visa desenvolver as regras de negócio, estrutura de banco de dados e funcionalidades de backend, **não sendo foco o desenvolvimento de frontend.** O sistema deve contemplar controle de acesso, permissões personalizadas, criação de usuários, criptografia de senhas, uploads de imagens e listagem de dados.

---

#### **Requisitos do Sistema:**

1. **Módulos Fixos e Acesso:**
   - O sistema deve conter **quatro módulos fixos**:
     - **Gestão de Usuários**: Acessível apenas por administradores e superusuário.
     - **Módulo de Perfil**: Todos os usuários podem acessar seu próprio perfil. O módulo de perfil deve permitir a edição da sua imagem.
     - **Módulo Financeiro**: Acessível por superusuário, administradores e usuários com permissão explícita.
     - **Módulo de Relatórios**: Acessível por superusuário, administradores e usuários com permissão explícita.
     - **Módulo de Produtos**: Acessível por superusuário, administradores e usuários com permissão explícita.

   - O acesso aos módulos deve ser controlado pelo backend:
     - Usuários sem permissão devem ser redirecionados para uma página de erro: **"SEM PERMISSÃO PARA ACESSAR O MÓDULO X"**.

   - Deve existir uma tela inicial depois de logado que lista todos (super, admin, users) os usuários com suas imagens, papel e, os módulos que cada usuário tem acesso. E os atalhos para os módulos a qual o usuário (logado) tem acesso (se quiser mostrar todos módulos, está ok também).

2. **Controle de Usuários e Permissões:**
   - Deve existir um **superusuário** gerado automaticamente (hardcoded) ao iniciar a aplicação (caso ainda não exista).
     - O superusuário pode criar outros usuários e administradores.
   - Administradores podem:
     - Criar novos usuários (não administradores).
     - Configurar permissões de acesso aos módulos para outros usuários.
   - Usuários comuns podem acessar apenas os módulos para os quais possuem permissão explícita.
   - Um usuário pode ter acesso a múltiplos módulos.

   - Todas URLs acessadas por um usuário logado devem ser salvas no banco, indicando se o acesso foi concedido ou negado.

   

3. **Banco de Dados:**
   - Os alunos devem propor a **estrutura do banco de dados** para gerenciar:
     - Usuários, papéis (superusuário, administrador, usuário comum).
     - Módulos e permissões de acesso.
   
   - Utilizar o ORM **Prisma** para modelar e gerenciar o banco de dados.

4. **Funcionalidades Específicas:**
   - **Autenticação e Criptografia de Senhas:**
     - Implementar login com autenticação de usuários.
     - Utilizar criptografia (ex.: bcrypt) para armazenar senhas.
   
   - **Gestão de Permissões:**
     - Criar endpoints para configurar quais usuários têm acesso a quais módulos.
     - Implementar middleware para verificar permissões antes de acessar os módulos. Consultem o banco em tempo real.

5. **Regras de Negócio:**
   - As páginas dos módulos são simples (um h1), apenas indicando se o acesso foi permitido.
   - Caso o usuário não tenha permissão para acessar um módulo, ele deve ser redirecionado para a página de erro correspondente.

---

- **Tecnologias Obrigatórias:**
  - **Node.js** com **Express** para o desenvolvimento do backend.
  - **Prisma** para o gerenciamento do banco de dados.
  - **SQLite** como banco de dados local.

- **Entrega e Avaliação:**
  - O código deve ser bem documentado, explicando as regras de negócio implementadas.
  - A estrutura do banco de dados e o fluxo de permissões serão avaliados.
  - Padrão MVC - Inclusive para os módulos "pequenos"
    Um controller/route/views para 
        - Autenticacao
        - Usuarios
        - Financeiro
        - Relatorio
        - Produtos
