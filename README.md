# 🚀 ImobFlow API

> API RESTful desenvolvida para turbinar a plataforma imobiliária profissional, unindo tecnologia de ponta e o mercado imobiliário em João Pessoa - PB.

## 💡 Sobre o Projeto
O **ImobFlow** é uma plataforma moderna, escalável e de alta performance para gestão e exibição de imóveis. Este repositório concentra o backend completo construído com Node.js, focado em boas práticas de mercado, padronização de código e arquitetura limpa com banco de dados relacional.

## 🛠️ Tecnologias Utilizadas
* **Node.js** (com ES Modules e `--watch`)
* **Express** (Gerenciador de rotas e middlewares)
* **Sequelize ORM** (Mapeamento objeto-relacional)
* **PostgreSQL** (Banco de dados relacional executado via Docker)
* **CORS & Dotenv** (Segurança e variáveis de ambiente)
* **Biome.js** (Padronização e formatação de código)
* **PNPM** (Gerenciador de pacotes ultrarrápido)

## ⚙️ Funcionalidades da API (CRUD Operacional)
A API conta com persistência completa de dados para imóveis:
* **POST `/imoveis`**: Cadastro de novos imóveis na base de dados[cite: 1].
* **GET `/imoveis`**: Listagem de todos os imóveis cadastrados[cite: 1].
* **PUT `/imoveis/:id`**: Atualização de dados de um imóvel específico por ID[cite: 1].
* **DELETE `/imoveis/:id`**: Remoção segura de registros da base de dados[cite: 1].

## 🚀 Como Executar o Projeto

Siga os passos abaixo para rodar o projeto localmente na sua máquina:

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/SEU-USUARIO/imobflow-api.git](https://github.com/SEU-USUARIO/imobflow-api.git)

 cd imobflow-api

 pnpm install

 pnpm dev

 O servidor estará rodando e respondendo na porta 3001 (http://localhost:3001).

👨‍💻 Autor
Desenvolvido por Carlos Henrique da Silva Farias

Desenvolvedor Full Stack & Corretor de Imóveis (CRECI 13610)

[Portfólio](https://carloshenriqueprogramador.com.br/)