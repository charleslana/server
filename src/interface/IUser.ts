import UserGenderEnum from 'enum/UserGenderEnum';

export interface ICreateUser {
  username: string;
  password: string;
  email: string;
  fullName: string;
  gender: UserGenderEnum;
}
