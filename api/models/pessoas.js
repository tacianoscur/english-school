'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    static associate(models) {
      Pessoas.hasMany(models.Turmas, {
        foreignKey: 'docente_id'
      });
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id',
        scope: {
          status: 'confirmado'
        },
        as: 'aulasMatriculadas'
      });
    }
  };
  Pessoas.init({
    nome: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        validationFunction: function(data) {
          if (data.length < 3) {
            throw new Error('Nome deve ter mais que 3 caracteres!');
          }
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email recebido não é válido!'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    defaultScope: {
      where: {
        ativo: true
      }
    },
    scopes: {
      allPessoas: {
        where: {}
      }
    },
    modelName: 'Pessoas',
  });
  return Pessoas;
};