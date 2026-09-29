import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';

const Imovel = sequelize.define('Imovel', {
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
  imagem: {
    type: DataTypes.STRING,
    allowNull: true, // A imagem é opcional
  }
});

export default Imovel;