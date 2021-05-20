import { IPatient } from './patient';

export interface IResponse {
  entry: IEntry[];
}

export interface IEntry {
  resource: IPatient;
}
