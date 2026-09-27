import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Imovel = sequelize.define('Imovel', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'imoveis',
  timestamps: true, // Cria automaticamente os campos createdAt e updatedAt
});

export default Imovel;