declare namespace Express {
  import UserRoleModel from 'model/UserRoleModel';

  export interface Request {
    user: {
      id: string;
      roles: UserRoleModel[];
    };
    session: {
      userCharacterId: string | null;
    };
  }
}
