import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import './models/Imovel.js'; // Garante que o model foi carregado
import imoveisRoutes from './routes/imoveis.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rota raiz de Teste
app.get('/', (req, res) => {
  res.json({ status: "ImobFlow API online e operacional 🚀" });
});

// Usando as rotas de imóveis
app.use(imoveisRoutes);

const PORT = process.env.PORT || 3001;

// Testa a conexão com o banco, sincroniza as tabelas e inicia o servidor
sequelize.authenticate()
  .then(() => {
    console.log('📦 Conexão com o PostgreSQL estabelecida com sucesso!');
    return sequelize.sync(); // Cria a tabela 'imoveis' no banco automaticamente se não existir
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT} com sucesso!`);
    });
  })
  .catch((err) => {
    console.error('❌ Não foi possível conectar ao banco de dados:', err);
  });