# Boas-vindas ao repositório do projeto API de Blogs!

Esse projeto foi para verificar meus aprendizados sobre o conteúdo do Bloco 24: Node.js: ORM e Autenticação conteúdos vistos anteriormente. 

<br />

# Entregáveis

<details>
  <summary><strong>👨‍💻 O que foi desenvolvido</strong></summary>

  Neste projeto desenvolvi uma API e um banco de dados para a produção de conteúdo para um blog! 

  Aplicação feita em `Node.js` usando o pacote `sequelize` para fazer `CRUD` de posts.

  1. Endpoints estão conectados ao seu banco de dados seguindo os princípios do REST;

  2. Para fazer um post é necessário usuário e login, portanto é trabalhada a **relação entre** `user` e `post`; 

  3. É utilizada categorias para os posts, trabalhando, assim, a **relação de** `posts` para `categories` e de `categories` para `posts`.

<br />
</details>

# Orientações

<details>
  <summary><strong>Rodando Localmente</strong></summary>

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`

  - **✨ Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.
  - **✨ Dica:** O avaliador espera que a versão do `node` utilizada seja a 16.

  <br/>
</details>

<details>
  <summary><strong>🎛 Linter</strong></summary>

  Para garantir a qualidade do código, usaremos o [ESLint](https://eslint.org/) para fazer a sua análise estática.

  Este projeto já vem com as dependências relacionadas ao _linter_ configuradas pela [Trybe](https://www.betrybe.com/) nos arquivos `package.json` nos seguintes caminhos:

  - `blogs-api/package.json`

<br />
</details>

<details>
  <summary  id="diagrama"><strong>🎲 Diagrama ER e Entidades</strong></summary>

  #### Diagrama de Entidade-Relacionamento

  Para orientar a construção das tabelas através do ORM, utilize o *DER* a seguir:

  ![DER](./public/der.png)

  ---

  #### Formato das entidades

  O seu projeto deverá usar o `ORM Sequelize` para criar e atualizar o seu banco de dados. 

  Os primeiros requisitos do projeto devem orientar a produção de suas migrations para gerar:

  - Uma tabela chamada **Users**, contendo dados com a seguinte estrutura:

    ```json
    {
      "id": 1,
      "displayName": "Brett Wiltshire",
      "email": "brett@email.com", // tem quer ser único
      "password": "123456",
      "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    }
    ```
  - Uma tabela chamada **Categories**, contendo dados com a seguinte estrutura:

    ```json
    {
      "id": 18,
      "name": "News"
    }
    ```

  - Uma tabela chamada **BlogPosts**, contendo dados com a seguinte estrutura:

    ```json
    {
      "id": 21,
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key",
      "userId": 14, // Chave estrangeira, referenciando o id de `Users`
      "published": "2011-08-01T19:58:00.000Z",
      "updated": "2011-08-01T19:58:51.947Z",
    }
    ```

  - Uma tabela chamada **PostCategories**, contendo uma **chave primária composta** utilizando os dois atributos da estrutura:

    ```json
    {
      "postId": 50, // Chave primária e estrangeira, referenciando o id de `BlogPosts`
      "categoryId": 20 // Chave primária e estrangeira, referenciando o id de `Categories`
    }
    ```
    *Os dados acima são fictícios, e estão aqui apenas como exemplo* 

    ---

    #### Scripts prontos

    - Deleta o banco de dados:
    ```json
    "drop": "npx sequelize-cli db:drop"
    ```

    - Cria o banco e gera as tabelas:
    ```json
    "prestart": "npx sequelize-cli db:create && npx sequelize-cli db:migrate"
    ```

    - Insere dados/Popula a tabela:
    ```json
    "seed": "npx sequelize-cli db:seed:all"
    ```

<br />
</details>
