import HandlerError from 'handler/HandlerError';
import HandlerSuccess from 'handler/HandlerSuccess';
import UserCharacterModel from 'model/UserCharacterModel';
import { CharacterService } from './CharacterService';
import { ICreateUserCharacter } from 'interface/IUserCharacter';
import { UserCharacterRepository } from 'repository/UserCharacterRepository';
import { UserService } from './UserService';

export class UserCharacterService {
  private constructor() {}

  public static async create(createUserCharacter: ICreateUserCharacter): Promise<HandlerSuccess> {
    await CharacterService.get(createUserCharacter.characterId);
    const count = await UserCharacterRepository.countUserCharacters(createUserCharacter.userId);
    if (count >= 12) {
      throw new HandlerError('Limite de personagens atingido (12) para usuários VIP.', 400);
    }
    const user = await UserService.getUserById(createUserCharacter.userId);
    if (count >= 6 && user.vip != null && user.vip <= new Date()) {
      throw new HandlerError('Limite de personagens atingido (6) para usuários.', 400);
    }
    const existName = await UserCharacterRepository.findByName(createUserCharacter.name);
    if (existName) {
      throw new HandlerError('Já existe um nome cadastrado para o personagem.', 400);
    }
    const userCharacterModel = new UserCharacterModel();
    userCharacterModel.name = createUserCharacter.name;
    userCharacterModel.characterId = createUserCharacter.characterId;
    userCharacterModel.userId = createUserCharacter.userId;
    await UserCharacterRepository.save(userCharacterModel);
    return new HandlerSuccess('Personagem do usuário cadastrado com sucesso.', 201);
  }

  public static async get(id: string): Promise<UserCharacterModel> {
    const userCharacter = await UserCharacterRepository.findById(id);
    if (!userCharacter) {
      throw new HandlerError('Personagem do usuário não encontrado.', 404);
    }
    return userCharacter;
  }

  public static async getAllByUserId(userId: string): Promise<UserCharacterModel[]> {
    const users = await UserCharacterRepository.findAll(userId);
    return users;
  }

  public static async deleteByIdAndUserId(id: string, userId: string): Promise<HandlerSuccess> {
    await this.getByIdAndUserId(id, userId);
    await UserCharacterRepository.delete(id);
    return new HandlerSuccess('Personagem do usuário excluído com sucesso.');
  }

  public static async getByIdAndUserId(id: string, userId: string): Promise<UserCharacterModel> {
    const userCharacter = await UserCharacterRepository.findByIdAndUserId(id, userId);
    if (!userCharacter) {
      throw new HandlerError('Personagem do usuário não encontrado.', 404);
    }
    return userCharacter;
  }
}
