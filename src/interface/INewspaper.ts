export interface ICreateNewspaper {
  title: string;
  description: string;
  userId: string;
}

export interface IUpdateNewspaper {
  id: number;
  title: string;
  description: string;
  userId: string;
}
