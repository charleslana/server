import database from 'database';
import HandlerError from 'handler/HandlerError';
import HandlerSuccess from 'handler/HandlerSuccess';
import UserCharacterModel from 'model/UserCharacterModel';
import { Transaction } from 'sequelize';
import { UserCharacterService } from './UserCharacterService';
import { UserCharacterTrainingRepository } from 'repository/UserCharacterTrainingRepository';

export class UserCharacterTrainingService {
  private constructor() {}

  public static calculateExperienceMax(level: number): number {
    return 100 + 150 * level;
  }

  public static async create(userCharacterId: string, transaction: Transaction): Promise<void> {
    await UserCharacterTrainingRepository.save(userCharacterId, transaction);
  }

  public static async initTraining(userCharacterId: string): Promise<HandlerSuccess> {
    const userCharacter = await UserCharacterService.get(userCharacterId);
    const userCharacterTraining = userCharacter.training;
    if (userCharacterTraining.trainingDate !== null) {
      throw new HandlerError('Personagem já está em um treinamento', 400);
    }
    const tenMinutesLater = new Date();
    tenMinutesLater.setMinutes(tenMinutesLater.getMinutes() + 10);
    userCharacterTraining.trainingDate = tenMinutesLater;
    await UserCharacterTrainingRepository.update(userCharacterTraining);
    return new HandlerSuccess('Treinamento do personagem iniciado com sucesso.');
  }

  public static async concludeTraining(userCharacterId: string): Promise<HandlerSuccess> {
    const userCharacter = await UserCharacterService.get(userCharacterId);
    this.validateTrainingStatus(userCharacter);
    const experienceGained = this.receiveExperience(userCharacter.training.level);
    userCharacter.training.experience += experienceGained;
    this.updateLevelAndAttributePoints(userCharacter);
    userCharacter.training.trainingDate = null;
    await this.saveTrainingAndUpdateCharacter(userCharacter);
    return new HandlerSuccess('Treinamento do personagem concluído com sucesso.');
  }

  public static async cancelTraining(userCharacterId: string): Promise<HandlerSuccess> {
    const userCharacter = await UserCharacterService.get(userCharacterId);
    if (userCharacter.training.trainingDate === null) {
      throw new HandlerError('Personagem não está em um treinamento.', 400);
    }
    userCharacter.training.trainingDate = null;
    await UserCharacterTrainingRepository.update(userCharacter.training);
    return new HandlerSuccess('Treinamento do personagem cancelado com sucesso.');
  }

  private static receiveExperience(level: number): number {
    const minExperience = 80 + 10 * level;
    const maxExperience = 90 + 10 * level;
    return Math.floor(Math.random() * (maxExperience - minExperience + 1)) + minExperience;
  }

  private static validateTrainingStatus(userCharacter: UserCharacterModel): void {
    if (userCharacter.training.trainingDate === null) {
      throw new HandlerError('Personagem não está em um treinamento.', 400);
    }
    if (
      userCharacter.training.trainingDate !== null &&
      userCharacter.training.trainingDate > new Date()
    ) {
      throw new HandlerError('O tempo do treinamento não terminou.', 400);
    }
  }

  private static updateLevelAndAttributePoints(userCharacter: UserCharacterModel): void {
    while (userCharacter.training.experience >= userCharacter.training.experienceMax) {
      userCharacter.training.experience -= userCharacter.training.experienceMax;
      userCharacter.training.level++;
      userCharacter.attributePoint++;
    }
  }

  private static async saveTrainingAndUpdateCharacter(
    userCharacter: UserCharacterModel
  ): Promise<void> {
    const transaction = await database.transaction();
    try {
      await UserCharacterTrainingRepository.update(userCharacter.training, transaction);
      await UserCharacterService.update(userCharacter, transaction);
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new HandlerError(`Erro ao concluir o treinamento do personagem: ${error}`, 500);
    }
  }
}
