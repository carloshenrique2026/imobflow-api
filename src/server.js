import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from './config/database.js';
import './app/models/Imovel.js';
import imoveisRoutes from './routes/imoveis.routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Tornar a pasta 'uploads' acessível publicamente para exibir as imagens
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rota raiz de Teste
app.get('/', (req, res) => {
  res.json({ status: "ImobFlow API online e operacional 🚀" });
});

// Usando as rotas de imóveis
app.use(imoveisRoutes);

const PORT = process.env.PORT || 3001;

// Testa a conexão com o banco, sincroniza as tabelas (com alter: true para atualizar a coluna de imagem) e inicia o servidor
sequelize.authenticate()
  .then(() => {
    console.log('📦 Conexão com o PostgreSQL estabelecida com sucesso!');
    return sequelize.sync({ alter: true }); // Atualiza a tabela adicionando colunas novas se faltarem
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT} com sucesso!`);
    });
  })
  .catch((err) => {
    console.error('❌ Não foi possível conectar ao banco de dados:', err);
  });