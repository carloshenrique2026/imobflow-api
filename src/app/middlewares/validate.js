import fs from 'node:fs/promises';

export const validate = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.validate(req.body ?? {}, {
      abortEarly: false, // devolve todos os erros de uma vez
      stripUnknown: true, // descarta campos que não estão no schema
    });
    return next();
  } catch (err) {
    // Se a validação falhou, apaga a foto que o Multer já salvou
    if (req.file) await fs.unlink(req.file.path).catch(() => {});

    if (err.name !== 'ValidationError') return next(err);

    return res.status(400).json({
      error: 'Falha na validação',
      detalhes: err.inner.map((e) => ({ campo: e.path, mensagem: e.message })),
    });
  }
};