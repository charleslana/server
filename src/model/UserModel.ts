import database from 'database';
import UserGenderEnum from 'enum/UserGenderEnum';
import UserRoleModel from './UserRoleModel';
import { DataTypes, HasManyGetAssociationsMixin, Model, Sequelize } from 'sequelize';

export default class UserModel extends Model {
  public id!: string;
  public authToken!: string | null;
  public username!: string;
  public password!: string;
  public email!: string;
  public fullName!: string;
  public gender!: UserGenderEnum;
  public banned!: Date | null;
  public vip!: Date | null;
  public credit!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public readonly roles!: UserRoleModel[];
  public getRoles!: HasManyGetAssociationsMixin<UserRoleModel>;
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      allowNull: false,
      primaryKey: true,
    },
    authToken: {
      type: DataTypes.STRING(100),
      field: 'auth_token',
    },
    username: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    fullName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'full_name',
    },
    gender: {
      type: DataTypes.ENUM(...Object.values(UserGenderEnum)),
      allowNull: false,
    },
    banned: {
      type: DataTypes.DATE,
    },
    vip: {
      type: DataTypes.DATE,
      defaultValue: function () {
        return new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
      },
    },
    credit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    tableName: 'tb_user',
    freezeTableName: true,
    timestamps: true,
    updatedAt: true,
  }
);

UserModel.hasMany(UserRoleModel, { as: 'roles', foreignKey: 'userId' });
