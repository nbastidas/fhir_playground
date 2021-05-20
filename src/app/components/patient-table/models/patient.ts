import { IAddress } from './address';
import { ICommunication } from './communication';
import { IContact } from './contact';
import { IDeceased } from './deceased';
import { IReference } from './reference';
import { IMaritalStatus } from './marital-status';
import { IName } from './name';
import { IPhoto } from './photo';
import { ITelecom } from './telecom';

export interface IPatient {
  active: boolean;
  address: IAddress[];
  birthDate: string;
  contact: IContact[];
  deceased: IDeceased;
  generalPractitioner: IReference[];
  gender: string;
  id: string;
  communication: ICommunication[];
  managingOrganization: IReference;
  maritalStatus: IMaritalStatus;
  name: IName;
  photo: IPhoto;
  telecom: ITelecom[];
}
