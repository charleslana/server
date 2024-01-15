import CharacterModel from 'model/CharacterModel';

export class CharacterRepository {
  private constructor() {}

  public static async save(character: CharacterModel): Promise<CharacterModel> {
    const savedCharacter = await character.save();
    return savedCharacter;
  }

  public static async findById(id: number): Promise<CharacterModel | null> {
    const character = await CharacterModel.findByPk(id);
    return character;
  }

  public static async findAll(): Promise<CharacterModel[]> {
    const characters = await CharacterModel.findAll({
      order: [['id', 'ASC']],
    });
    return characters;
  }

  public static async update(character: CharacterModel): Promise<CharacterModel> {
    const updatedCharacter = await character.save();
    return updatedCharacter;
  }

  public static async delete(id: number): Promise<number> {
    const deletedCount = await CharacterModel.destroy({ where: { id } });
    return deletedCount;
  }
}
