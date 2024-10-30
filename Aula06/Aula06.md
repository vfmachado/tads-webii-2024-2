# Exercicios

1. Ajustar para o padrão MVC
    rotas de criacao de conta e login em routes/controllers diferentes do usuario
        /auth/login
        /auth/logout
        /users/register

2. Separar os MIDDLEWARES em arquivos distintos

3. CRIAR PERMISSOES POR ROTA
    criar uma tabela de permissoes
    criar uma tabela de users-permissoes

    admin pode tudo
    e os USERS (comuns) sao associados a permissoes

        /users      PERMISSAO LISTAR_USUARIOS
        /users/:id  PERMISSAO DETALHE_USUARIOS

    o admin tem acesso a uma rota para associar a permissao ao usuario
        Id do usuario e ID da permissao concedida / removida


