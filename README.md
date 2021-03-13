<h1 align="center">Navedex-API</h1>

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Apresenta%C3%A7%C3%A3o%20do%20Projeto.PNG)

<p align="center">
  <a href="#-Tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Como Executar">Como Executar</a>&nbsp;&nbsp;&nbsp;
</p>

<br>

## :book: Sobre
Projeto de desenvolvimento da API da navedex, uma plataforma com cadastro de usuário para acessar seus navers e projetos em que participa. Utilizando JWT para controle de sessão.


## ✨ Tecnologias

Esse projeto utiliza as seguintes tecnologias:

- [Nodejs](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [JsonWebToken](https://jwt.io/)
- [Jest](https://jestjs.io/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Express-async-errors](https://www.npmjs.com/package/express-async-errors)
- [Insomnia](https://insomnia.rest/)
- [Sqlite3](https://www.sqlite.org/index.html)
- [TypeORM](https://typeorm.io/)
- [UUID](https://www.npmjs.com/package/uuid)
- [YUP](https://www.npmjs.com/package/yup)

## 💻 Projeto

<p align="center"> O projeto teve o objetivo de construir uma API que permita o cadastro de usuário a partir de sua senha e email, além de um controle de sessões que é realizado
por intermédio de um Token JWT que é cedido ao usuário após ele inserir suas credenciais de email e senha e autenticar esses dados com os que estão no banco de dados. De posse 
do token o usuário poderá entrar no sistema e realizar as funcionalidades do mesmo, o sistema possui um CRUD de Naver(representação de um funcionário) e o CRUD de Projetos, é 
importante ressaltar que as rotas de leitura são acessiveis a qualquer usuário que possua um token JWT válido, porém as rotas de Alteração e Deleção de um usuário estão disponíveis
somente ao usuário que criou tal informação(Naver ou Project), como pode ser visto na imagem abaixo. 

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Modelagem%20do%20Projeto.PNG)

Para realização desse sistema foi necessário a ligação entre as entidades do BD, de forma a tornar possível tanto a identificação de usuários com permissão para 
deleção/alteração, quanto para a partir de um busca de projetos, reconhecer quem o criou e quais os Navers ligados a ele, além de ser
possível realizar o processo inverso. 

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Modelagem%20do%20BD.PNG)

## 🚀 Como Executar

<h1>Configurações iniciais</h1>

- Clone esse repositório

- Use o `npm install` para instalar todas as dependências

- Crie um arquivo .env e insira a sua Hash_jwt dentro do arquivo no padrão chave valor, dessa forma: HASH_JWT = sua hash

<h1>Inicializando as Migrations</h1>

- Use o script "migrations" para rodar as migrations do projeto, assim, criando o banco de dados Sqlite de acordo com as configurações do projeto, use `npm run migrations`

<h1> :mag: Testes Automatizados </h1>

  Foram desenvolvido testes automatizados de integração para as funcionalidades de cadastros de usuário e login na ferramenta para geração de token JWT

<h1>Configurações iniciais</h1>

- Use o `npm run test` para executar os testes automatizados utilizando Jest. 

<h1>Rodando a aplicação</h1>

- Use `npm run dev` para rodar a aplicação.

- Entre no insomnia, crie as rotas como será mostrado abaixo para utilizar as funcionalidades, serão apresentadas cada uma funcionalidades no formado sucesso e falha para melhor
exemplificar o funcionamento do sistema, com excessão das rotas de Index, onde serão apresentados dois exemplos de sucesso, um com a aplicação dos filtros e outro sem a aplicação
dos mesmos.

- Signup (Rota de cadastro)

###Sucesso

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Create%20user%201.PNG)

###Falha

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Create%20user%202.PNG)


- Login (Rota para logar no sistema)

###Sucesso

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Create%20session%201.PNG)

###Falha

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Create%20user%202.PNG)

- Navers Index (Rota para listagem dos Navers)

###Sucesso com filtros

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Index%20Naver%201.PNG)

###Sucesso sem filtros

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Index%20Naver%202.PNG)

- Navers Show (Rota para detalhar informações de um único naver através de seu identificador)

###Sucesso

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Show%20Naver%201.PNG)

###Falha

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Show%20Naver%202.PNG)

- Navers Store (Rota de Criação de Naver)

###Sucesso

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Create%20Naver%201.PNG)

###Falha

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Create%20Naver%202.PNG)


- Navers Update (Rota Para Atualização de Naver)

###Sucesso

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Update%20Naver%201.PNG)

###Falha de autorização

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Update%20Naver%202%20notAuthorized.PNG)


-Navers Delete (Rota Para Deletar um Naver)

###Sucesso

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Delete%20Naver%201.PNG)

###Falha de autorização

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Delete%20Naver%202%20notAuthorized.PNG)


- Project Index (Rota para listagem dos Projetos)

###Sucesso com filtros

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Index%20Project%201.PNG)

###Sucesso sem filtros

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Index%20Project%202.PNG)

- Projects Show (Rota para detalhar informações de um único projeto através de seu identificador)

###Sucesso

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Show%20Project%201.PNG)

###Falha

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Show%20Project%202.PNG)

- Project Store (Rota de Criação de projeto)

###Sucesso

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Create%20Project%201.PNG)

###Falha

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Create%20Project%202.PNG)


- Project Update (Rota Para Atualização de projeto)

###Sucesso

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Update%20Project%201.PNG)

###Falha de autorização

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Update%20Project%202%20notAuthorized.PNG)


-Project Delete (Rota Para Deletar um projeto)

###Sucesso

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Delete%20Project%201.PNG)

###Falha de autorização

![alt text](https://github.com/ianCamposs/navedex-API/blob/main/images/Delete%20Project%202%20notAuthorized.PNG)

:tada: I hope you enjoy my journey :tada:
