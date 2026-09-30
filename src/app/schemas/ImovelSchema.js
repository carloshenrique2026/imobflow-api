import * as yup from 'yup';

// Formulários enviam campo vazio como "" (texto), e o Yup
// entenderia isso como número inválido. Aqui "" vira "não informado".
const vazioParaUndefined = (valor, original) =>
  original === '' ? undefined : valor;

const numeroOpcional = (mensagem) =>
  yup.number().transform(vazioParaUndefined).typeError(mensagem);

export const criarImovelSchema = yup.object({
  titulo: yup
    .string()
    .trim()
    .min(3, 'Título muito curto')
    .max(120, 'Título muito longo')
    .required('Título é obrigatório'),

  descricao: yup.string().trim().max(2000, 'Descrição muito longa'),

  tipo: yup
    .string()
    .oneOf(['casa', 'apartamento', 'terreno', 'comercial'], 'Tipo inválido'),

  finalidade: yup
    .string()
    .oneOf(['venda', 'aluguel'], 'Finalidade inválida'),

  status: yup
    .string()
    .oneOf(['disponivel', 'reservado', 'vendido', 'alugado'], 'Status inválido'),

  valor: yup
    .number()
    .typeError('Valor deve ser um número')
    .positive('Valor deve ser maior que zero')
    .required('Valor é obrigatório'),

  area: numeroOpcional('Área deve ser um número').positive('Área deve ser maior que zero'),
  quartos: numeroOpcional('Quartos deve ser um número').integer('Quartos deve ser inteiro').min(0),
  banheiros: numeroOpcional('Banheiros deve ser um número').integer('Banheiros deve ser inteiro').min(0),
  vagas: numeroOpcional('Vagas deve ser um número').integer('Vagas deve ser inteiro').min(0),

  bairro: yup.string().trim().required('Bairro é obrigatório'),
  cidade: yup.string().trim(),
});

// No PUT, todos os campos viram opcionais, mas mantêm as regras
export const atualizarImovelSchema = criarImovelSchema.partial();