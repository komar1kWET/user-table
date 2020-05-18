import {AccountModel} from "@fd2/models/account.model";

export interface UserModel {
  account?: AccountModel;
  birthday?: string;
  email: string;
  firstName: string;
  isActive: boolean;
  id: number;
  lastName: string;
  title: string;
  username: string;
}
