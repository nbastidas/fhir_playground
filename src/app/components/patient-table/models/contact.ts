import { IName } from './name';
import { ITelecom } from './telecom';

export interface IContact {
  relationship: IRelationship[];
  name: IName;
  telecom: ITelecom[];
  address: string;
  gender: string;
  organization: string;
}

export interface IRelationship {
  id: string;
}
