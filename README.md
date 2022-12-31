# Blogs API

### Seja bem vindo ao projeto Blogs API!

----

Este é um projeto desenvolvido por mim, **Lucas Bitencourt**, durante meu curso pela [Trybe](https://www.betrybe.com/).

O projeto consiste na criação de uma API para um blog, utilizando o padrão REST.

<br>

## Sumário

- [Blogs API](#blogs-api)
    - [Seja bem vindo ao projeto Blogs API!](#seja-bem-vindo-ao-projeto-blogs-api)
  - [Sumário](#sumário)
      - [Objetivo](#objetivo)
      - [Resultado](#resultado)
      - [Instalação](#instalação)
        - [Clonando o repositório localmente](#clonando-o-repositório-localmente)
  - [Endpoints](#endpoints)
  - [Conclusão](#conclusão)

#### Objetivo

O objetivo deste projeto, foi avaliar as seguintes habilidades:

- Criação de API no padrão REST
- Utilização de banco de dados relacional
- Utilização de tokens para autenticação
- Validação de dados

#### Resultado

Este projeto está disponível para visualização e testes após o clone deste repositório. Para isso, siga as instruções abaixo.


---

#### Instalação

##### Clonando o repositório localmente

1. Clone o repositório
     - `git clone git@github.com:xlucasbitencourt/tp-blogs-api.git`
     - Entre na pasta do repositório que você acabou de clonar:
     - `cd tp-blogs-api`    
  <br>

<details>

<summary><strong>Para rodar o projeto com Docker:</strong></summary>

2. Inicialize o container com o comando:
    - `docker-compose up -d --build` 
3. Utilize o comando abaixo para acessar o container:
    - `docker exec -it tp-blogs-api bash`
4. Instale as dependências e inicialize o projeto
    - `npm install`
    - `npm run dev`
5. Acesse o projeto em:
    - `http://localhost:4000`
  
O projeto ao rodar no Docker, utilizará as seguintes configurações:

* Porta API: 4000
* Porta MySQL: 3456
* Usuário MySQL: root
* Senha MySQL: password

Mude o campo environment no arquivo docker-compose.yml para alterar as configurações, caso necessário.
</details>
<br/>
<details>
<summary><strong>Para rodar o projeto sem Docker:</strong></summary>

É necessário ter instalado em sua máquina o MySQL e o Node.js.
  
1. Instale as dependências
    - `npm install`

2. Crie o arquivo .env de acordo com o arquivo .env.example
    - `cp .env.example .env`
    - Atenção especial a porta e credenciais do MySQL

3. Inicialize o projeto
    - `npm run dev`

4. Acesse o projeto em:
    - `http://localhost:4000`
  
</details>

<br/>

## Endpoints

A API possui os seguintes endpoints:

<h3>/login </h3>

<details>
<summary><strong>POST /login</strong></summary>
<h5>Requisição para realizar login</h5>
Espera que tenha os campos "email" e "password"
<br /> <br />

<h6>Resultado OK:</h6>

* Código: 200
* Resposta:
```json
{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxld2lzaGFtaWx0b25AZ21haWwuY29tIiwiaWF0IjoxNjcyMzU4MzQzLCJleHAiOjE2NzI5NjMxNDN9.AwOP4ht8haHcZsOdTYPnAVSAMhxAfxmV_f9Bj-oMnPg" }
```
<br />

<h6>Erros:</h6>

* Body sem "email" e/ou "password":
  * Código: 400
  * Resposta:
```json 
      {
        "message": "Some required fields are missing"
      }
```

* Campo "email" e "password" não correspondem ao banco de dados:
  * Código: 400
  * Resposta:
```json
      {
        "message": "Invalid fields"
      }
```
</details>

  

<h3>/user</h3>
<details>
<summary><strong>POST /user</strong></summary>
<h5>Requisição para criar um novo usuário</h5>
Espera que tenha os seguintes campos:
<li><strong>"displayName"</strong>: Nome do usuário com pelo menos 8 caracteres</li>
<li><strong>"email"</strong>: E-mail do usuário no formato válido</li>
<li><strong>"password"</strong>: Senha do usuário coom no mínimo 6 caracteres</li>
<li><strong>"image"</strong>: Link da imagem do usuário (Campo opicional)</li>

<br />

<h6>Resultado OK:</h6>

* Código: 201
* Resposta:
```json
   {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyZXR0QGVtYWlsLmNvbSIsImlhdCI6MTY3MjM1OTkxNywiZXhwIjoxNjcyOTY0NzE3fQ.mkx_y25_GT9L7D-6_N5_hqBS2R-CkaRhqLvaZBsNUCA"
    }
```

<h6>Erros:</h6>

* Campo "displayName" menor que 8 caracteres:
  * Código: 400
  * Resposta:
```json
   {
      "message": "\"displayName\" length must be at least 8 characters long"
    }
```

* Campo "email" com formato inválido:
  * Código: 400
  * Resposta:
```json
   {
      "message": "\"email\" must be a valid email"
    }
```

* Campo "password" menor que 8 caracteres:
  * Código: 400
  * Resposta:
```json
   {
      "message": "\"password\" length must be at least 6 characters long"
    }
```

* E-mail já cadastrado
  * Código: 409
  * Resposta:
```json
  {
      "message": "User already registered"
  }
```
</details>
<br />
<details>
<summary><strong>GET /user</strong></summary>
<h5>Requisição para buscar todos os usuários</h5>
Espera que tenha o token de autenticação no header da requisição.

<h6>Resultado OK:</h6>

* Código: 200
* Resposta:
```json
[
  {
    "id": 1,
    "displayName": "Lewis Hamilton",
    "email": "lewishamilton@gmail.com",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
},
//...
]
```

<h6>Erros:</h6>

* Token inválido:
  * Código: 401
  * Resposta:
```json
  {
      "message": "Expired or invalid token"
  }
```

* Token não enviado:
  * Código: 401
  * Resposta:
```json
  {
      "message": "Token not found"
  }
```
</details>
<br />

<details>
<summary><strong>GET /user/:id</strong></summary>
<h5>Requisição para buscar um usuário específico</h5>
Espera que tenha o token de autenticação no header da requisição.

<h6>Resultado OK:</h6>

* Código: 200
* Resposta:
```json
{
    "id": 1,
    "displayName": "Lewis Hamilton",
    "email": "lewishamilton@gmail.com",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
}
```

<h6>Erros:</h6>

* Token inválido:
  * Código: 401
  * Resposta:
```json
  {
      "message": "Expired or invalid token"
  }
```

* Token não enviado:
  * Código: 401
  * Resposta:
```json
  {
      "message": "Token not found"
  }
```

* Usuário não encontrado:
  * Código: 404
  * Resposta:
```json
  {
      "message": "User does not exist"
  }
```
</details>
<br />
<details>
<summary><strong>DELETE /user/me</strong></summary>
<h5>Requisição para deletar o usuário logado</h5>
Espera que tenha o token de autenticação no header da requisição.

<h6>Resultado OK:</h6>

* Código: 204
* Sem resposta

<h6>Erros:</h6>

* Token inválido:
  * Código: 401
  * Resposta:
```json
  {
      "message": "Expired or invalid token"
  }
```

* Token não enviado:
  * Código: 401
  * Resposta:
```json
  {
      "message": "Token not found"
  }
```

* Usuário não encontrado:
  * Código: 404
  * Resposta:
```json
  {
      "message": "User does not exist"
  }
```
</details>

<br />

<h3>/categories</h3>

<details>
<summary><strong>POST /categories</strong></summary>
<h5>Requisição para criar uma nova categoria</h5>
Espera que tenha o token de autenticação no header da requisição.
<br />
Espera que tenha os seguintes campos:
<li><strong>"name"</strong>: Nome da categoria</li>

<br />

<h6>Resultado OK:</h6>

* Código: 201
* Resposta:
```json
   {
      "id": 1,
      "name": "Inovação"
    }
```

<h6>Erros:</h6>

* Requisição sem campo "name":
  * Código: 400
  * Resposta:
```json
   {
      "message": "\"name\" is required"
    }
```

* Nome já cadastrado
  * Código: 409
  * Resposta:
```json
  {
      "message": "Category already exists"
  }
```
</details>
<br />

<details>
<summary><strong>GET /categories</strong></summary>
<h5>Requisição para buscar todas as categorias</h5>
Espera que tenha o token de autenticação no header da requisição.

<h6>Resultado OK:</h6>

* Código: 200
* Resposta: 
```json
[
    {
        "id": 1,
        "name": "Inovação"
    },
    {
        "id": 2,
        "name": "Escola"
    }
]
```

<h6>Erros:</h6>

* Token inválido:
  * Código: 401
  * Resposta:
```json
  {
      "message": "Expired or invalid token"
  }
```

* Token não enviado:
  * Código: 401
  * Resposta:
```json
  {
      "message": "Token not found"
  }
```
</details>
<br />

<h3>/post</h3>

<details>
<summary><strong>POST /post</strong></summary>
<h5>Requisição para criar um novo post</h5>
Espera que tenha o token de autenticação no header da requisição.
<br />
Espera que tenha os seguintes campos:
<li><strong>"title"</strong>: Título do post</li>
<li><strong>"content"</strong>: Conteúdo do post</li>
<li><strong>"categoryIds"</strong>: Array com os ids das categorias</li>

<br />

<h6>Resultado OK:</h6>

* Código: 201
* Resposta:
```json
   {
      "id": 1,
      "title": "Título do post",
      "content": "Conteúdo do post",
      "userId": 1,
      "published": "2021-03-01T00:00:00.000Z",
      "updated": "2021-03-01T00:00:00.000Z"
    }
```

<h6>Erros:</h6>

* Requisição sem algum campo obrigatório:
  * Código: 400
  * Resposta:
```json
   {
    "message": "Some required fields are missing"
    }
```

* Requisição com alguma categoria inexistente no banco de dados:
  * Código: 400
  * Resposta:
```json
  {
    "message": "\"categoryIds\" not found"
  }
```
</details>
<br/>

<details>
<summary><strong>GET /post</strong></summary>
<h5>Requisição para buscar todos os posts</h5>
Espera que tenha o token de autenticação no header da requisição.

<h6>Resultado OK:</h6>

* Código: 200
* Resposta: 
```json
[
    {
        "id": 1,
        "title": "Título do post",
        "content": "Conteúdo do post",
        "userId": 1,
        "published": "2021-03-01T00:00:00.000Z",
        "updated": "2021-03-01T00:00:00.000Z"
    },
    {
        "id": 2,
        "title": "Título do post 2",
        "content": "Conteúdo do post 2",
        "userId": 1,
        "published": "2021-03-01T00:00:00.000Z",
        "updated": "2021-03-01T00:00:00.000Z"
    }
]
```

<h6>Erros:</h6>

* Token inválido:
  * Código: 401
  * Resposta:
```json
  {
      "message": "Expired or invalid token"
  }
```

* Token não enviado:
  * Código: 401
  * Resposta:
```json
  {
      "message": "Token not found"
  }
```
</details>
<br />

<details>
<summary><strong>GET /post/:id</strong></summary>
<h5>Requisição para buscar um post específico</h5>
Espera que tenha o token de autenticação no header da requisição.

<h6>Resultado OK:</h6>

* Código: 200
* Reposta: 
```json
{
    "id": 1,
    "title": "Título do post",
    "content": "Conteúdo do post",
    "userId": 1,
    "published": "2021-03-01T00:00:00.000Z",
    "updated": "2021-03-01T00:00:00.000Z"
}
```

<h6>Erros:</h6>

* Token inválido:
  * Código: 401
  * Resposta:
```json
  {
      "message": "Expired or invalid token"
  }
```

* Token não enviado:
  * Código: 401
  * Resposta:
```json
  {
      "message": "Token not found"
  }
```

* Post não encontrado:
  * Código: 404
  * Resposta:
```json
  {
      "message": "Post does not exist"
  }
```
</details>
<br/>

<details>
<summary><strong>GET /post/search?q=:searchTerm</strong></summary>
<h5>Requisição para buscar posts que contenham o termo pesquisado</h5>
Espera que tenha o token de autenticação no header da requisição.

<h6>Resultado OK:</h6>

* Código: 200
* Resposta: 
```json
[
    {
        "id": 1,
        "title": "Título do post",
        "content": "Conteúdo do post",
        "userId": 1,
        "published": "2021-03-01T00:00:00.000Z",
        "updated": "2021-03-01T00:00:00.000Z"
    },
    {
        "id": 2,
        "title": "Título do post 2",
        "content": "Conteúdo do post 2",
        "userId": 1,
        "published": "2021-03-01T00:00:00.000Z",
        "updated": "2021-03-01T00:00:00.000Z"
    }
]
```

<strong>OU</strong>

```json
[]
```

<h6>Erros:</h6>

* Token inválido:
  * Código: 401
  * Resposta:
```json
  {
      "message": "Expired or invalid token"
  }
```

* Token não enviado:
  * Código: 401
  * Resposta:
```json
  {
      "message": "Token not found"
  }
```
</details>
<br/>

<details>
<summary><strong>PUT /post/:id</strong></summary>
<h5>Requisição para editar um post específico</h5>
Espera que tenha o token de autenticação no header da requisição.
<br />
Espera que tenha os seguintes campos:
<li><strong>"title"</strong>: Título do post</li>
<li><strong>"content"</strong>: Conteúdo do post</li>

<br />

<h6>Resultado OK:</h6>

* Código: 200
* Resposta:
```json
   {
    "id": 3,
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "userId": 3,
    "published": "2022-12-30T21:32:57.000Z",
    "updated": "2022-12-30T22:22:52.000Z",
    "user": {
        "id": 3,
        "displayName": "Brett Wiltshire",
        "email": "brett@email.com",
        "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    },
    "categories": [
        {
            "id": 1,
            "name": "Inovação"
        },
        {
            "id": 2,
            "name": "Escola"
        }
    ]
}
```

<h6>Erros:</h6>

* Requisição sem algum campo obrigatório:
  * Código: 400
  * Resposta:
```json
   {
    "message": "Some required fields are missing"
    }
```

* Token inválido:
  * Código: 401
  * Resposta:
```json
  {
      "message": "Expired or invalid token"
  }
```

* Token não enviado:
  * Código: 401
  * Resposta:
```json
  {
      "message": "Token not found"
  }
```

* Post não encontrado:
  * Código: 404
  * Resposta:
```json
  {
      "message": "Post does not exist"
  }
```

* Post não é do usuário logado:
  * Código: 401
  * Resposta:
```json
  {
      "message": "Unauthorized user"
  }
```
</details>
<br/>

<details>
<summary><strong>DELETE /post/:id</strong></summary>
<h5>Requisição para deletar um post específico</h5>
Espera que tenha o token de autenticação no header da requisição.

<h6>Resultado OK:</h6>

* Código: 204
* Sem resposta

<h6>Erros:</h6>

* Token inválido:
  * Código: 401
  * Resposta:
```json
  {
      "message": "Expired or invalid token"
  }
```

* Token não enviado:
  * Código: 401
  * Resposta:
```json
  {
      "message": "Token not found"
  }
```

* Post não encontrado:
  * Código: 404
  * Resposta:
```json
  {
      "message": "Post does not exist"
  }
```

* Post não é do usuário logado:
  * Código: 401
  * Resposta:
```json
  {
      "message": "Unauthorized user"
  }
```
</details>

## Conclusão

Este é um projeto desenvolvido para aprendizado. Caso queira contribuir com algum feedback, sinta-se a vontade para comentar, ou entre em contato comigo:

<a href="https://www.linkedin.com/in/lucasbitencourt/"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a> <a href="mailto:klucasbitencourt@gmail.com"><img alt="E-mail" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" /></a> 



