
## ENV

## EXISTEM ALGUNS TIPOS DE AUTENTICACAO

- TOKEN JWT

- SESSION
    - a logica de autenticacao fica no servidor
    - o servidor mantem as sessoes dos usuarios (o que ocupa memoria se nao for externo)
    - o servidor manda um cookie para o cliente, e o cliente manda de volta o cookie
                            id de sessao

- BASIC AUTH
    normalmente, eles te dao uma chave de acesso, e voce usa ela para acessar um recurso

- OAUTH
    https://datatracker.ietf.org/doc/html/rfc6749
    login com google, facebook, etc



frontend vs backend


php, ejs, django ... a gente ta trabalhando com SERVER SIDE RENDERING
    - o servidor monta a pagina e manda pro cliente

existe um outro conjunto de aplicacoes que sao CLIENT SIDE RENDERING
    um sistema para o frontend  <---  http  --->   um sistema para o backend
                                      jwt

## ORM

- Object Relational Mapping
    Mapeamento de banco de dados para objetos JS