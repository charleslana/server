import database from 'database';
import UserModel from './UserModel';
import { DataTypes, HasOneGetAssociationMixin, Model, Sequelize } from 'sequelize';

export default class NewspaperModel extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly user!: UserModel;
  public getUser!: HasOneGetAssociationMixin<UserModel>;
}

NewspaperModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
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
    tableName: 'tb_newspaper',
    freezeTableName: true,
    timestamps: true,
    updatedAt: true,
  }
);

NewspaperModel.belongsTo(UserModel, {
  as: 'user',
  foreignKey: 'userId',
});
