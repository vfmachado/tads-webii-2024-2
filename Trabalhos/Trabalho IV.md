# Trabalho IV - TODO API

## Pode ser feito em dupla

## Objetivo do Trabalho
O objetivo deste trabalho é desenvolver uma API REST utilizando as tecnologias apresentadas em aula, visando consolidar os conhecimentos em desenvolvimento web backend. A aplicação deve permitir o gerenciamento de listas de tarefas (TODOs), categorias associadas e funcionalidades de compartilhamento entre usuários, garantindo uma implementação com boas práticas de código e usabilidade.

## Tecnologias e Ferramentas
A API deverá ser implementada utilizando as seguintes ferramentas e bibliotecas:
- **Framework:** ExpressJS
- **ORM e Banco de Dados:** Prisma + PostgreSQL ou SQLite
- **Validação de Dados:** JOI ou YUP
- **Autenticação:** JWT (JSON Web Token) - [jwt.io](https://jwt.io)
- **Documentação:** Swagger para a especificação e consulta da API
- **Ferramenta de Teste:** Collection pronta no Insomnia, Thunderclient ou Postman, com todos os endpoints configurados.

---

## Funcionalidades e Requisitos

1. **Cadastro de Usuário e Autenticação**
   - Implementar o cadastro de usuários com autenticação via JWT.
   - Validar o email do usuário através de um token enviado por email.
   - Disponibilizar rota de login com geração de token.
   - (1,0 ponto)

2. **Gestão de TODOs e Categorias**
   - **TODO List**
     - Cadastro de tarefas vinculadas ou não a categorias.
     - Dados mínimos exigidos: título, descrição, data prevista de conclusão e data de criação.
     - (0,5 ponto)
   - **Categorias**
     - Cadastro de categorias vinculadas aos usuários.
     - (0,5 ponto)

3. **Listagens**
   - Implementar endpoints para:
     - Listar categorias com suas respectivas TODOs (paginadas e ordenadas).
       - (1,0 ponto)
     - Listar apenas TODOs pendentes.
       - (0,5 ponto)
     - Listar TODOs atrasados.
       - (0,5 ponto)
     - Marcar TODOs como concluídos.
       - (1,0 ponto)

4. **Compartilhamento**
   - Implementar o compartilhamento de categorias com outros usuários.
     - (1,0 ponto)
   - Listar categorias e listagens compartilhadas com o usuário logado.
     - (1,0 ponto)

5. **Arquitetura e Segurança**
   - **Autorização:**
     - Garantir que os usuários possam acessar apenas suas categorias, listas e tarefas, protegendo endpoints com middlewares de autorização.
     - (1,0 ponto)
   - **Validação de Dados:**
     - Validar os corpos das requisições usando JOI ou YUP.
     - (1,0 ponto)
   - **Organização do Código:**
     - Garantir uma arquitetura organizada, legível e manutenível, conforme boas práticas discutidas em aula.
     - (1,0 ponto)

---

## Critérios de Avaliação
A pontuação total deste trabalho é de 10,0 pontos, distribuída conforme descrito acima. Será avaliada a implementação correta das funcionalidades, o uso adequado das ferramentas e bibliotecas, a qualidade do código, e o cumprimento dos requisitos de segurança e validação.

---

## Entrega
- Código-fonte em um repositório versionado (GitHub ou similar).
- Documentação da API gerada com Swagger.
- Collection de testes configurada no Insomnia, Thunderclient ou Postman.
- Prazo de entrega: 22/12/2024. 

Caso tenha dúvidas, entre em contato com o professor para esclarecimentos antes do prazo final.
