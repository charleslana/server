import CharacterModel from './CharacterModel';
import database from 'database';
import UserCharacterBreedEnum from 'enum/UserCharacterBreedEnum';
import UserCharacterClassEnum from 'enum/UserCharacterClassEnum';
import UserCharacterFactionEnum from 'enum/UserCharacterFactionEnum';
import UserCharacterSeaEnum from 'enum/UserCharacterSeaEnum';
import UserModel from './UserModel';
import { DataTypes, HasOneGetAssociationMixin, Model, Sequelize } from 'sequelize';
import { UserCharacterService } from 'service/UserCharacterService';

export default class UserCharacterModel extends Model {
  public id!: string;
  public name!: string;
  public level!: number;
  public faction!: UserCharacterFactionEnum;
  public sea!: UserCharacterSeaEnum;
  public breed!: UserCharacterBreedEnum;
  public class!: UserCharacterClassEnum;
  public avatar!: number;
  public coin!: number;
  public experience!: number;
  public experienceMax!: number;
  public hp!: number;
  public hpMax!: number;
  public mp!: number;
  public mpMax!: number;
  public stamina!: number;
  public staminaMax!: number;
  public score!: number;
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
    sea: {
      type: DataTypes.ENUM(...Object.values(UserCharacterSeaEnum)),
      allowNull: false,
    },
    breed: {
      type: DataTypes.ENUM(...Object.values(UserCharacterBreedEnum)),
      allowNull: false,
    },
    class: {
      type: DataTypes.ENUM(...Object.values(UserCharacterClassEnum)),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    coin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5500,
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    experienceMax: {
      type: DataTypes.VIRTUAL(DataTypes.INTEGER, ['experienceMax']),
      get: function () {
        return UserCharacterService.calculateExperienceMax(this.get('level'));
      },
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 130,
    },
    hpMax: {
      type: DataTypes.VIRTUAL(DataTypes.INTEGER, ['hpMax']),
      get: function () {
        return UserCharacterService.calculateHPMax(this.get('level'));
      },
    },
    mp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 160,
    },
    mpMax: {
      type: DataTypes.VIRTUAL(DataTypes.INTEGER, ['mpMax']),
      get: function () {
        return UserCharacterService.calculateMPMax(this.get('level'));
      },
    },
    stamina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 40,
    },
    staminaMax: {
      type: DataTypes.VIRTUAL(DataTypes.INTEGER, ['staminaMax']),
      get: function () {
        return 40;
      },
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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

UserCharacterModel.belongsTo(UserModel, {
  as: 'user',
  foreignKey: 'userId',
});
