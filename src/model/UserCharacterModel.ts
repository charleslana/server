import CharacterModel from './CharacterModel';
import database from 'database';
import UserCharacterBreedEnum from 'enum/UserCharacterBreedEnum';
import UserCharacterClassEnum from 'enum/UserCharacterClassEnum';
import UserCharacterFactionEnum from 'enum/UserCharacterFactionEnum';
import UserCharacterSeaEnum from 'enum/UserCharacterSeaEnum';
import UserCharacterTrainingModel from './UserCharacterTrainingModel';
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
  public strength!: number;
  public dexterity!: number;
  public intelligence!: number;
  public resistance!: number;
  public attributePoint!: number;
  public attributePointUsed!: number;
  public attributePointAvailable!: number;
  public userId!: string;
  public characterId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly character!: CharacterModel;
  public getCharacter!: HasOneGetAssociationMixin<CharacterModel>;
  public readonly user!: UserModel;
  public getUser!: HasOneGetAssociationMixin<UserModel>;
  public readonly training!: UserCharacterTrainingModel;
  public getTraining!: HasOneGetAssociationMixin<UserCharacterTrainingModel>;
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
      defaultValue: 60,
    },
    staminaMax: {
      type: DataTypes.VIRTUAL(DataTypes.INTEGER, ['staminaMax']),
      get: function () {
        return UserCharacterService.calculateStaminaMax(this.get('user'));
      },
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    strength: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    dexterity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    intelligence: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    resistance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    attributePoint: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'attribute_point',
    },
    attributePointUsed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'attribute_point_used',
    },
    attributePointAvailable: {
      type: DataTypes.VIRTUAL(DataTypes.INTEGER, ['attributePointAvailable']),
      get: function () {
        return UserCharacterService.calculateAttributePointAvailable(
          this.get('level'),
          this.get('attributePoint'),
          this.get('attributePointUsed')
        );
      },
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
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updated_at',
    },
  },
  {
    sequelize: database,
    tableName: 'tb_user_character',
    freezeTableName: true,
    timestamps: true,
    updatedAt: true,
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

UserCharacterModel.hasOne(UserCharacterTrainingModel, {
  as: 'training',
  foreignKey: 'userCharacterId',
});
