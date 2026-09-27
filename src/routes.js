import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ status: "ImobFlow API online e operacional 🚀" });
});

// Rota temporária para listar imóveis (depois conectamos com o Banco de Dados/Sequelize)
routes.get('/imoveis', (req, res) => {
  return res.json([
    { id: 1, titulo: "Apartamento em Valentina", bairro: "Valentina", valor: "R$ 250.000" },
    { id: 2, titulo: "Casa em Condomínio", bairro: "Altiplano", valor: "R$ 850.000" }
  ]);
});

export default routes;