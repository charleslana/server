import database from 'database';
import { DataTypes, Model } from 'sequelize';

export default class CharacterModel extends Model {
  public id!: number;
  public name!: string;
}

CharacterModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: 'tb_character',
    freezeTableName: true,
    timestamps: false,
  }
);
