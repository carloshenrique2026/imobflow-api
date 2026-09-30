import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';

const Imovel = sequelize.define(
  'Imovel',
  {
    titulo: { type: DataTypes.STRING, allowNull: false },
    descricao: { type: DataTypes.TEXT, allowNull: true },
    tipo: {
      type: DataTypes.ENUM('casa', 'apartamento', 'terreno', 'comercial'),
      allowNull: false,
      defaultValue: 'apartamento',
    },
    finalidade: {
      type: DataTypes.ENUM('venda', 'aluguel'),
      allowNull: false,
      defaultValue: 'venda',
    },
    status: {
      type: DataTypes.ENUM('disponivel', 'reservado', 'vendido', 'alugado'),
      allowNull: false,
      defaultValue: 'disponivel',
    },
    valor: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      get() {
        const v = this.getDataValue('valor');
        return v === null ? null : Number(v); // o pg devolve DECIMAL como texto
      },
    },
    area: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    quartos: { type: DataTypes.INTEGER, allowNull: true },
    banheiros: { type: DataTypes.INTEGER, allowNull: true },
    vagas: { type: DataTypes.INTEGER, allowNull: true },
    bairro: { type: DataTypes.STRING, allowNull: false },
    cidade: { type: DataTypes.STRING, allowNull: false, defaultValue: 'João Pessoa' },
    imagem: { type: DataTypes.STRING, allowNull: true },
    imagemUrl: {
      type: DataTypes.VIRTUAL,
      get() {
        const arquivo = this.getDataValue('imagem');
        const base = process.env.APP_URL || 'http://localhost:3001';
        return arquivo ? `${base}/uploads/${arquivo}` : null;
      },
    },
  },
  { tableName: 'imoveis' },
);

export default Imovel;