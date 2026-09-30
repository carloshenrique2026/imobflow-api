import multer from 'multer';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Caminho absoluto: funciona de qualquer pasta
export const uploadsDir = path.resolve(__dirname, '..', '..', 'uploads');

const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp'];

export const upload = multer({
  storage: multer.diskStorage({
    destination: uploadsDir,
    filename: (req, file, cb) => {
      const nome = crypto.randomBytes(12).toString('hex');
      cb(null, `${nome}${path.extname(file.originalname).toLowerCase()}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    if (tiposPermitidos.includes(file.mimetype)) return cb(null, true);
    cb(Object.assign(new Error('Envie apenas imagens JPG, PNG ou WEBP.'), { status: 400 }));
  },
});