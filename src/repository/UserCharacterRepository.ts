import CharacterModel from 'model/CharacterModel';
import UserCharacterModel from 'model/UserCharacterModel';
import { Op } from 'sequelize';

export class UserCharacterRepository {
  private constructor() {}

  public static async save(userCharacter: UserCharacterModel): Promise<UserCharacterModel> {
    const savedUserCharacter = await userCharacter.save();
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

  public static async findAll(userId: string): Promise<UserCharacterModel[]> {
    const userCharacters = await UserCharacterModel.findAll({
      where: {
        userId,
      },
    });
    return userCharacters;
  }

  public static async update(userCharacter: UserCharacterModel): Promise<UserCharacterModel> {
    const updatedUserCharacter = await userCharacter.save();
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
}
