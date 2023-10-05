"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Artikel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Artikel.init(
    {
      judul: DataTypes.STRING,
      tgl_update: DataTypes.DATE,
      id_kategori: DataTypes.INTEGER,
      isi: DataTypes.TEXT,
      foto: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Artikel",
    }
  );
  Artikel.associate = (models) => {
    Artikel.belongsTo(models.Kategori, {
      foreignKey: "id_kategori",
      as: "kategori",
    });
  };
  return Artikel;
};
