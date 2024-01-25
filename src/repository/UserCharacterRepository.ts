import CharacterModel from 'model/CharacterModel';
import UserCharacterClassEnum from 'enum/UserCharacterClassEnum';
import UserCharacterFactionEnum from 'enum/UserCharacterFactionEnum';
import UserCharacterModel from 'model/UserCharacterModel';
import UserCharacterTrainingModel from 'model/UserCharacterTrainingModel';
import UserModel from 'model/UserModel';
import { Op, Transaction } from 'sequelize';

export class UserCharacterRepository {
  private constructor() {}

  public static async save(
    userCharacter: UserCharacterModel,
    transaction: Transaction
  ): Promise<UserCharacterModel> {
    const savedUserCharacter = await userCharacter.save({ transaction });
    return savedUserCharacter;
  }

  public static async findByName(name: string): Promise<UserCharacterModel | null> {
    const userCharacter = await UserCharacterModel.findOne({
      where: {
        name: {
          [Op.iLike]: name,
        },
      },
    });
    return userCharacter;
  }

  public static async findById(id: string): Promise<UserCharacterModel | null> {
    const userCharacter = await UserCharacterModel.findByPk(id, {
      include: [
        {
          model: CharacterModel,
          as: 'character',
        },
        {
          model: UserModel,
          as: 'user',
          attributes: ['credit', 'vip'],
        },
        {
          model: UserCharacterTrainingModel,
          as: 'training',
        },
      ],
    });
    return userCharacter;
  }

  public static async findByIdAndUserId(
    id: string,
    userId: string
  ): Promise<UserCharacterModel | null> {
    const userCharacter = await UserCharacterModel.findOne({
      where: {
        id: id,
        userId: userId,
      },
      include: [
        {
          model: CharacterModel,
          as: 'character',
        },
      ],
    });
    return userCharacter;
  }

  public static async findAllByUserId(userId: string): Promise<UserCharacterModel[]> {
    const userCharacters = await UserCharacterModel.findAll({
      where: {
        userId,
      },
      order: [
        ['level', 'DESC'],
        ['created_at', 'ASC'],
      ],
      include: [
        {
          model: UserModel,
          as: 'user',
          attributes: ['credit', 'vip'],
        },
      ],
    });
    return userCharacters;
  }

  public static async findAll(): Promise<UserCharacterModel[]> {
    const userCharacters = await UserCharacterModel.findAll({
      include: [
        {
          model: UserModel,
          as: 'user',
          attributes: ['credit', 'vip'],
        },
      ],
    });
    return userCharacters;
  }

  public static async update(
    userCharacter: UserCharacterModel,
    transaction?: Transaction
  ): Promise<UserCharacterModel> {
    const updatedUserCharacter = await userCharacter.save({ transaction });
    return updatedUserCharacter;
  }

  public static async delete(id: string): Promise<number> {
    const deletedCount = await UserCharacterModel.destroy({ where: { id } });
    return deletedCount;
  }

  public static async countUserCharacters(userId: string): Promise<number> {
    const count = await UserCharacterModel.count({
      where: {
        userId,
      },
    });
    return count;
  }

  public static async getTopRankedByFaction(
    faction: UserCharacterFactionEnum
  ): Promise<UserCharacterModel[]> {
    const topRankedUserCharacters = await UserCharacterModel.findAll({
      where: {
        faction: faction,
      },
      include: [
        {
          model: CharacterModel,
          as: 'character',
        },
        {
          model: UserModel,
          as: 'user',
          attributes: ['vip'],
        },
      ],
      order: [
        ['level', 'DESC'],
        ['created_at', 'ASC'],
      ],
      limit: 3,
    });
    return topRankedUserCharacters;
  }

  public static async getTopRankedByClass(
    _class: UserCharacterClassEnum
  ): Promise<UserCharacterModel[]> {
    const topRankedUserCharacters = await UserCharacterModel.findAll({
      where: {
        class: _class,
      },
      include: [
        {
          model: CharacterModel,
          as: 'character',
        },
        {
          model: UserModel,
          as: 'user',
          attributes: ['vip'],
        },
      ],
      order: [
        ['level', 'DESC'],
        ['score', 'DESC'],
        ['created_at', 'ASC'],
      ],
      limit: 3,
    });
    return topRankedUserCharacters;
  }
}
