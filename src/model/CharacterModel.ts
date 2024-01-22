import database from 'database';
import { DataTypes, Model } from 'sequelize';

export default class CharacterModel extends Model {
  public id!: number;
  public name!: string;
  public avatarMax!: number;
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
    avatarMax: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'avatar_max',
    },
  },
  {
    sequelize: database,
    tableName: 'tb_character',
    freezeTableName: true,
    timestamps: false,
  }
);
