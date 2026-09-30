import { Router } from 'express';
import { upload } from '../config/multer.js';
import { validate } from '../app/middlewares/validate.js';
import {
  criarImovelSchema,
  atualizarImovelSchema,
} from '../app/schemas/ImovelSchema.js';
import ImovelController from '../app/controllers/ImovelController.js';

const router = Router();

router.get('/imoveis', ImovelController.index);
router.get('/imoveis/:id', ImovelController.show);

router.post(
  '/imoveis',
  upload.single('imagem'),
  validate(criarImovelSchema),
  ImovelController.store,
);

router.put(
  '/imoveis/:id',
  upload.single('imagem'),
  validate(atualizarImovelSchema),
  ImovelController.update,
);

router.delete('/imoveis/:id', ImovelController.destroy);

export default router;