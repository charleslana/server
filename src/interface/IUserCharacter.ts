import UserCharacterBreedEnum from 'enum/UserCharacterBreedEnum';
import UserCharacterClassEnum from 'enum/UserCharacterClassEnum';
import UserCharacterFactionEnum from 'enum/UserCharacterFactionEnum';
import UserCharacterSeaEnum from 'enum/UserCharacterSeaEnum';

export interface ICreateUserCharacter {
  characterId: number;
  name: string;
  faction: UserCharacterFactionEnum;
  userId: string;
  sea: UserCharacterSeaEnum;
  breed: UserCharacterBreedEnum;
  class: UserCharacterClassEnum;
}
