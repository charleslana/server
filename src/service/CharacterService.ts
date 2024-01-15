import CharacterModel from 'model/CharacterModel';
import HandlerError from 'handler/HandlerError';
import HandlerSuccess from 'handler/HandlerSuccess';
import ICharacter from 'interface/ICharacter';
import { CharacterRepository } from 'repository/CharacterRepository';

export class CharacterService {
  private constructor() {}

  public static async create(name: string): Promise<HandlerSuccess> {
    const characterModel = new CharacterModel();
    characterModel.name = name;
    await CharacterRepository.save(characterModel);
    return new HandlerSuccess('Personagem cadastrado com sucesso.', 201);
  }

  public static async get(id: number): Promise<CharacterModel> {
    const character = await CharacterRepository.findById(id);
    if (!character) {
      throw new HandlerError('Personagem não encontrado.', 404);
    }
    return character;
  }

  public static async getAll(): Promise<CharacterModel[]> {
    const characters = await CharacterRepository.findAll();
    return characters;
  }

  public static async update(character: ICharacter): Promise<HandlerSuccess> {
    const findCharacter = await this.get(character.id);
    findCharacter.name = character.name;
    await CharacterRepository.update(findCharacter);
    return new HandlerSuccess('Personagem atualizado com sucesso.');
  }

  public static async delete(id: number): Promise<HandlerSuccess> {
    await this.get(id);
    await CharacterRepository.delete(id);
    return new HandlerSuccess('Personagem excluído com sucesso.');
  }
}
