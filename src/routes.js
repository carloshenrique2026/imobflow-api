import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import Imovel from './app/models/Imovel.js';

const router = Router();

// Configuração do armazenamento do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Listar todos os imóveis (GET)
router.get('/imoveis', async (req, res) => {
  try {
    const imoveis = await Imovel.findAll();
    return res.status(200).json(imoveis);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar imóveis.' });
  }
});

// Cadastrar um novo imóvel com Imagem (POST)
router.post('/imoveis', upload.single('imagem'), async (req, res) => {
  try {
    // Com o upload.single('imagem') rodando antes, req.body já preenche os campos de texto
    const { titulo, bairro, valor } = req.body;
    const imagem = req.file ? req.file.filename : null;

    const novoImovel = await Imovel.create({ 
      titulo, 
      bairro, 
      valor, 
      imagem 
    });

    return res.status(201).json(novoImovel);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao cadastrar imóvel.' });
  }
});

// Atualizar um imóvel existente (PUT)
router.put('/imoveis/:id', upload.single('imagem'), async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, bairro, valor } = req.body;

    const imovel = await Imovel.findByPk(id);

    if (!imovel) {
      return res.status(404).json({ error: 'Imóvel não encontrado.' });
    }

    const dadosAtualizados = { titulo, bairro, valor };
    
    if (req.file) {
      dadosAtualizados.imagem = req.file.filename;
    }

    await imovel.update(dadosAtualizados);

    return res.status(200).json({
      message: 'Imóvel atualizado com sucesso!',
      imovel
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar o imóvel.' });
  }
});

// Deletar um imóvel (DELETE)
router.delete('/imoveis/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const imovel = await Imovel.findByPk(id);

    if (!imovel) {
      return res.status(404).json({ error: 'Imóvel não encontrado.' });
    }

    await imovel.destroy();

    return res.status(200).json({ message: 'Imóvel deletado com sucesso!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao deletar o imóvel.' });
  }
});

export default router;