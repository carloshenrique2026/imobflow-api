import { Router } from 'express';
import Imovel from '../models/Imovel.js';

const router = Router();

// Rota para Cadastrar um Novo Imóvel (POST)
router.post('/imoveis', async (req, res) => {
  try {
    const { titulo, bairro, valor } = req.body;

    // Validação simples
    if (!titulo || !bairro || !valor) {
      return res.status(400).json({ error: "Preencha todos os campos obrigatórios (titulo, bairro, valor)." });
    }

    // Cria o registro no PostgreSQL via Sequelize
    const novoImovel = await Imovel.create({
      titulo,
      bairro,
      valor
    });

    return res.status(201).json({
      message: "Imóvel cadastrado com sucesso!",
      imovel: novoImovel
    });
  } catch (error) {
    console.error("Erro ao cadastrar imóvel:", error);
    return res.status(500).json({ error: "Erro interno no servidor ao cadastrar imóvel." });
  }
});

// Rota para Listar todos os Imóveis do Banco (GET)
router.get('/imoveis', async (req, res) => {
  try {
    const imoveis = await Imovel.findAll();
    return res.json(imoveis);
  } catch (error) {
    console.error("Erro ao buscar imóveis:", error);
    return res.status(500).json({ error: "Erro interno ao buscar imóveis." });
  }
});

// Rota para Atualizar um Imóvel (PUT)
router.put('/imoveis/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, bairro, valor } = req.body;

    const imovel = await Imovel.findByPk(id);

    if (!imovel) {
      return res.status(404).json({ error: "Imóvel não encontrado." });
    }

    // Atualiza os dados
    await imovel.update({
      titulo: titulo || imovel.titulo,
      bairro: bairro || imovel.bairro,
      valor: valor || imovel.valor
    });

    return res.json({
      message: "Imóvel atualizado com sucesso!",
      imovel
    });
  } catch (error) {
    console.error("Erro ao atualizar imóvel:", error);
    return res.status(500).json({ error: "Erro interno ao atualizar imóvel." });
  }
});

// Rota para Deletar um Imóvel (DELETE)
router.delete('/imoveis/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const imovel = await Imovel.findByPk(id);

    if (!imovel) {
      return res.status(404).json({ error: "Imóvel não encontrado." });
    }

    await imovel.destroy();

    return res.json({ message: "Imóvel excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar imóvel:", error);
    return res.status(500).json({ error: "Erro interno ao deletar imóvel." });
  }
});

export default router;