module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'le nom ne peut pas etre vide'},
          notNull: {msg: 'les point de vie sont une propriété requise.'}
         }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie'},
          min: {
            args: [0],
            msg: 'les points de vie doivent etre superieur ou égale a 0.'
          },
          max: {
            args: [999],
            msg: 'les points de vie doivent etre inferieur ou égale a 999.'
          },
         notNull: {msg: 'les points de vies sont une propriété requises'}
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de degat'},
          min: {
            args: [0],
            msg: 'les points de dégat doivent etre inferieur ou égale a 0.'
          },
          max: {
            args: [99],
            msg: 'les points de vie doivent etre inferieur ou égale a 99.'
          },
          notNull: {msg: 'les points de vies sont une propriété requises'}
         }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: 'Utilisez uniquement dune url valide pour l\'image'},
          notNull: {msg: 'l\'image est une propriété requises'}
         }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split(',')
        },
        set (types) {
          this.setDataValue('types', types.join())
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }