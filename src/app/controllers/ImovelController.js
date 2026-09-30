import fs from 'node:fs/promises';
import path from 'node:path';
import { Op } from 'sequelize';
import Imovel from '../models/Imovel.js';
import { uploadsDir } from '../../config/multer.js';

const naoEncontrado = () =>
  Object.assign(new Error('Imóvel não encontrado.'), { status: 404 });

// Apaga uma foto da pasta uploads sem dar erro se ela não existir
const removerArquivo = (nome) =>
  nome ? fs.unlink(path.join(uploadsDir, nome)).catch(() => {}) : Promise.resolve();

export default {
  // GET /imoveis?bairro=&tipo=&finalidade=&status=&precoMin=&precoMax=&page=&limit=
  async index(req, res) {
    const { bairro, tipo, finalidade, status, precoMin, precoMax } = req.query;
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 12, 1), 50);

    const where = {};
    if (bairro) where.bairro = { [Op.iLike]: `%${bairro}%` };
    if (tipo) where.tipo = tipo;
    if (finalidade) where.finalidade = finalidade;
    if (status) where.status = status;
    if (precoMin || precoMax) {
      where.valor = {};
      if (precoMin) where.valor[Op.gte] = Number(precoMin);
      if (precoMax) where.valor[Op.lte] = Number(precoMax);
    }

    const { count, rows } = await Imovel.findAndCountAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']],
    });

    return res.json({
      data: rows,
      meta: { total: count, page, limit, totalPages: Math.ceil(count / limit) },
    });
  },

  // GET /imoveis/:id
  async show(req, res) {
    const imovel = await Imovel.findByPk(req.params.id);
    if (!imovel) throw naoEncontrado();
    return res.json(imovel);
  },

  // POST /imoveis
  async store(req, res) {
    try {
      const imovel = await Imovel.create({
        ...req.body,
        imagem: req.file?.filename ?? null,
      });
      return res.status(201).json(imovel);
    } catch (err) {
      await removerArquivo(req.file?.filename); // não deixa foto órfã
      throw err;
    }
  },

  // PUT /imoveis/:id
  async update(req, res) {
    const imovel = await Imovel.findByPk(req.params.id);

    if (!imovel) {
      await removerArquivo(req.file?.filename);
      throw naoEncontrado();
    }

    const imagemAntiga = imovel.imagem;
    const dados = { ...req.body };
    if (req.file) dados.imagem = req.file.filename;

    await imovel.update(dados);
    if (req.file) await removerArquivo(imagemAntiga); // troca a foto: apaga a velha

    return res.json(imovel);
  },

  // DELETE /imoveis/:id
  async destroy(req, res) {
    const imovel = await Imovel.findByPk(req.params.id);
    if (!imovel) throw naoEncontrado();

    await imovel.destroy();
    await removerArquivo(imovel.imagem);

    return res.status(204).send();
  },
};