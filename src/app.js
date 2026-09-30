import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import imoveisRoutes from './routes/imoveis.routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(',')
      : '*',
  }),
);
app.use(express.json());

// Fotos dos imóveis acessíveis publicamente
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/', (req, res) => {
  res.json({ status: 'ImobFlow API online e operacional 🚀' });
});

app.use(imoveisRoutes);

// 404 em JSON
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Tratamento central de erros (o Express 5 já encaminha erros de rotas async para cá)
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: status === 500 ? 'Erro interno do servidor' : err.message,
  });
});

export default app;