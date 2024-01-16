import CharacterModel from './CharacterModel';
import database from 'database';
import UserCharacterFactionEnum from 'enum/UserCharacterFactionEnum';
import UserModel from './UserModel';
import { DataTypes, HasOneGetAssociationMixin, Model, Sequelize } from 'sequelize';

export default class UserCharacterModel extends Model {
  public id!: string;
  public name!: string;
  public level!: number;
  public faction!: UserCharacterFactionEnum;
  public userId!: string;
  public characterId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly character!: CharacterModel;
  public getCharacter!: HasOneGetAssociationMixin<CharacterModel>;
}

UserCharacterModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    faction: {
      type: DataTypes.ENUM(...Object.values(UserCharacterFactionEnum)),
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: UserModel,
        key: 'id',
      },
      field: 'user_id',
    },
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: CharacterModel,
        key: 'id',
      },
      field: 'character_id',
    },
  },
  {
    sequelize: database,
    tableName: 'tb_user_character',
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

UserCharacterModel.belongsTo(CharacterModel, {
  as: 'character',
  foreignKey: 'characterId',
});
