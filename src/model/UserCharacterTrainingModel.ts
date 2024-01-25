import database from 'database';
import UserCharacterModel from './UserCharacterModel';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { UserCharacterTrainingService } from 'service/UserCharacterTrainingService';

export default class UserCharacterTrainingModel extends Model {
  public id!: string;
  public experience!: number;
  public experienceMax!: number;
  public level!: number;
  public trainingDate!: Date | null;
  public userCharacterId!: string;
}

UserCharacterTrainingModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      allowNull: false,
      primaryKey: true,
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    experienceMax: {
      type: DataTypes.VIRTUAL(DataTypes.INTEGER, ['experienceMax']),
      get: function () {
        return UserCharacterTrainingService.calculateExperienceMax(this.get('level'));
      },
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    trainingDate: {
      type: DataTypes.DATE,
      field: 'training_date',
    },
    userCharacterId: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: UserCharacterModel,
        key: 'id',
      },
      field: 'user_character_id',
    },
  },
  {
    sequelize: database,
    tableName: 'tb_user_character_training',
    freezeTableName: true,
    timestamps: false,
  }
);
