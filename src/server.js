import 'dotenv/config'; // sempre o primeiro import
import app from './app.js';
import { sequelize } from './config/database.js';

const PORT = process.env.PORT || 3001;

try {
  await sequelize.authenticate();
  console.log('📦 Conexão com o PostgreSQL estabelecida com sucesso!');

  // Só sincroniza se você pedir explicitamente (apenas em desenvolvimento)
  if (process.env.DB_SYNC === 'true') {
    await sequelize.sync({ alter: true });
    console.log('🔄 Tabelas sincronizadas');
  }

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
} catch (err) {
  console.error('❌ Não foi possível iniciar a API:', err);
  process.exit(1);
}