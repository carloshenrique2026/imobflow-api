# 🚀 ImobFlow API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18%2B-green?style=for-the-badge&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-4.x-black?style=for-the-badge&logo=express" alt="Express">
  <img src="https://img.shields.io/badge/Sequelize-ORM-blue?style=for-the-badge&logo=sequelize" alt="Sequelize">
  <img src="https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Biome.js-Linter-orange?style=for-the-badge" alt="Biome.js">
</p>

API RESTful desenvolvida para turbinar a plataforma imobiliária profissional, unindo tecnologia de ponta e o mercado imobiliário em João Pessoa - PB.

---

## 💡 Sobre o Projeto

O **ImobFlow** é uma plataforma moderna, escalável e de alta performance para gestão e exibição de imóveis. Este repositório concentra o backend completo construído com Node.js, focado em boas práticas de mercado, padronização de código e arquitetura limpa com banco de dados relacional.

---

## 🛠️ Tecnologias Utilizadas

* **Node.js** (com ES Modules e `--watch`)
* **Express** (Gerenciador de rotas e middlewares)
* **Sequelize ORM** (Mapeamento objeto-relacional)
* **PostgreSQL** (Banco de dados relacional executado via Docker)
* **CORS & Dotenv** (Segurança e variáveis de ambiente)
* **Biome.js** (Padronização e formatação de código)
* **PNPM** (Gerenciador de pacotes ultrarrápido)

---

## ⚙️ Funcionalidades da API (CRUD Operacional)

A API conta com persistência completa de dados para imóveis:

* `POST /imoveis`: Cadastro de novos imóveis na base de dados.
* `GET /imoveis`: Listagem de todos os imóveis cadastrados.
* `PUT /imoveis/:id`: Atualização de dados de um imóvel específico por ID.
* `DELETE /imoveis/:id`: Remoção segura de registros da base de dados.

---

## 📂 Arquitetura do Projeto

```text
src/
├── config/       # Configurações do banco de dados (Sequelize)
├── controllers/  # Lógica de controle das requisições
├── models/       # Definição dos modelos/tabelas do Sequelize
├── routes/       # Definição das rotas da API
└── server.js     # Ponto de entrada da aplicação
 O servidor estará rodando e respondendo na porta 3001 (http://localhost:3001).
git clone [https://github.com/carloshenrique2026/imobflow-api.git](https://github.com/carloshenrique2026/imobflow-api.git)
cd imobflow-api

pnpm install

PORT=3001
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=imobflow

pnpm dev

👨‍💻 Autor
Desenvolvido por Carlos Henrique da Silva Farias

Desenvolvedor Full Stack & Corretor de Imóveis (CRECI 13610)

[Portfólio](https://carloshenriqueprogramador.com.br/)
