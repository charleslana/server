import UserCharacterFactionEnum from 'enum/UserCharacterFactionEnum';

export interface ICreateUserCharacter {
  characterId: number;
  name: string;
  faction: UserCharacterFactionEnum;
  userId: string;
}
