import UserCharacterTrainingModel from 'model/UserCharacterTrainingModel';
import { Transaction } from 'sequelize';

export class UserCharacterTrainingRepository {
  private constructor() {}

  public static async save(userCharacterId: string, transaction: Transaction): Promise<void> {
    await UserCharacterTrainingModel.create({ userCharacterId }, { transaction });
  }

  public static async update(
    userCharacterTraining: UserCharacterTrainingModel,
    transaction?: Transaction
  ): Promise<UserCharacterTrainingModel> {
    const updatedUserCharacter = await userCharacterTraining.save({ transaction });
    return updatedUserCharacter;
  }
}
