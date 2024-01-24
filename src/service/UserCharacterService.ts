import HandlerError from 'handler/HandlerError';
import HandlerSuccess from 'handler/HandlerSuccess';
import UserCharacterBreedEnum from 'enum/UserCharacterBreedEnum';
import UserCharacterClassEnum from 'enum/UserCharacterClassEnum';
import UserCharacterFactionEnum from 'enum/UserCharacterFactionEnum';
import UserCharacterModel from 'model/UserCharacterModel';
import UserModel from 'model/UserModel';
import { CharacterService } from './CharacterService';
import { ICreateUserCharacter, IUpdateUserCharacterAttribute } from 'interface/IUserCharacter';
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
    if (count >= 6) {
      if (user.vip === null || (user.vip !== null && user.vip <= new Date())) {
        throw new HandlerError('Limite de personagens atingido (6) para usuários.', 400);
      }
    }
    if (
      createUserCharacter.breed === UserCharacterBreedEnum.Triton ||
      createUserCharacter.breed === UserCharacterBreedEnum.Cyborg
    ) {
      if (user.vip === null || (user.vip !== null && user.vip <= new Date())) {
        throw new HandlerError('Necessário VIP para utilizar este recurso.', 400);
      }
    }
    const existName = await UserCharacterRepository.findByName(createUserCharacter.name);
    if (existName) {
      throw new HandlerError('Já existe um nome cadastrado para o personagem.', 400);
    }
    const userCharacterModel = new UserCharacterModel();
    userCharacterModel.name = createUserCharacter.name;
    userCharacterModel.faction = createUserCharacter.faction;
    userCharacterModel.sea = createUserCharacter.sea;
    userCharacterModel.breed = createUserCharacter.breed;
    userCharacterModel.class = createUserCharacter.class;
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
    const userCharacters = await UserCharacterRepository.findAllByUserId(userId);
    return userCharacters;
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

  public static calculateExperienceMax(level: number): number {
    return 5 * level;
  }

  public static calculateHPMax(level: number): number {
    return 130 + 30 * (level - 1);
  }

  public static calculateMPMax(level: number): number {
    return 160 + 30 * (level - 1);
  }

  public static calculateStaminaMax(user: UserModel): number {
    return UserService.isVip(user) ? 60 : 40;
  }

  public static async getTopRankedByFaction(
    faction: UserCharacterFactionEnum
  ): Promise<UserCharacterModel[]> {
    const userCharacters = await UserCharacterRepository.getTopRankedByFaction(faction);
    return userCharacters;
  }

  public static async getTopRankedByClass(
    _class: UserCharacterClassEnum
  ): Promise<UserCharacterModel[]> {
    const userCharacters = await UserCharacterRepository.getTopRankedByClass(_class);
    return userCharacters;
  }

  public static async increaseStamina(): Promise<void> {
    const allUserCharacters = await UserCharacterRepository.findAll();
    for (const userCharacter of allUserCharacters) {
      if (userCharacter.stamina < userCharacter.staminaMax) {
        const additionalStamina = UserService.isVip(userCharacter.user) ? 2 : 1;
        const newStamina = Math.min(
          userCharacter.stamina + additionalStamina,
          userCharacter.staminaMax
        );
        userCharacter.stamina = newStamina;
        await UserCharacterRepository.update(userCharacter);
      }
    }
  }

  public static async adjustStaminaIfExceedsMax(): Promise<void> {
    const allUserCharacters = await UserCharacterRepository.findAll();
    for (const userCharacter of allUserCharacters) {
      if (userCharacter.stamina > userCharacter.staminaMax) {
        userCharacter.stamina = userCharacter.staminaMax;
        await UserCharacterRepository.update(userCharacter);
      }
    }
  }

  public static async updateAvatar(
    avatar: number,
    userCharacterId: string
  ): Promise<HandlerSuccess> {
    const userCharacter = await this.get(userCharacterId);
    if (avatar > userCharacter.character.avatarMax) {
      throw new HandlerError('O avatar não existe.', 400);
    }
    if (!UserService.isVip(userCharacter.user) && avatar > 3) {
      throw new HandlerError('Necessário VIP para utilizar este recurso.', 400);
    }
    userCharacter.avatar = avatar;
    await UserCharacterRepository.update(userCharacter);
    return new HandlerSuccess('Avatar do personagem atualizado com sucesso.');
  }

  public static calculateAttributePointAvailable(level: number, attributePoint: number): number {
    return 2 * level - attributePoint;
  }

  public static async updateAttribute(
    attribute: IUpdateUserCharacterAttribute
  ): Promise<UserCharacterModel> {
    const userCharacter = await this.get(attribute.userCharacterId);
    const totalToDeduct =
      (attribute.strength ?? 0) +
      (attribute.dexterity ?? 0) +
      (attribute.intelligence ?? 0) +
      (attribute.resistance ?? 0);
    if (totalToDeduct > userCharacter.attributePointAvailable) {
      throw new HandlerError('Pontos de atributo insuficiente.', 400);
    }
    userCharacter.strength += attribute.strength ?? 0;
    userCharacter.dexterity += attribute.dexterity ?? 0;
    userCharacter.intelligence += attribute.intelligence ?? 0;
    userCharacter.resistance += attribute.resistance ?? 0;
    userCharacter.attributePoint += totalToDeduct;
    return await UserCharacterRepository.update(userCharacter);
  }
}
