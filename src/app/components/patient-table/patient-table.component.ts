import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IName } from 'src/app/models/name';
import { IPatient } from 'src/app/models/patient';
import { IResponse, IEntry } from 'src/app/models/response';
import { ITelecom } from 'src/app/models/telecom';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-patient-table',
  templateUrl: './patient-table.component.html',
  styleUrls: ['./patient-table.component.scss'],
})
export class PatientTableComponent implements OnInit {
  ACTIVE = 'Active';
  INACTIVE = 'Inactive';
  EMPTY = '-';
  ONLY_ALPHABETICAL_CHARS = /^[a-zA-Z \n]+$/;
  patients: IPatient[] = [];
  requestTime = 0;
  loading = false;
  searchForm: FormGroup = new FormGroup({
    search: new FormControl('', Validators.pattern(this.ONLY_ALPHABETICAL_CHARS)),
    date: new FormControl(''),
  });

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getQueue();
  }

  getQueue() {
    this.loading = true;
    const start = performance.now();
    const date = this.searchForm.get('date').value;
    const search = this.searchForm.get('search').value;
    this.patients = [];
    this.apiService.getPatientsByBirthDateAndName(date, search).subscribe((data: IResponse) => this.handleData(data, start));
  }

  /**
   * Returns the union of the given and family names, given an array of names
   * @param name - array of names
   * @returns the full name of the first record
   */
  getFullNameFromArray(name: IName[]): string {
    return name ? [name[0].given, name[0].family].join(' ') : null;
  }

  /**
   * Returns the union of the given and family names
   * @param name - name record
   * @returns the full name
   */
  getFullName(name: IName): string {
    return name ? [name.given, name.family].join(' ') : null;
  }

  /**
   * Returns the status of the patient
   * @param patient - patient
   * @returns the status of the patient
   */
  getStatus(patient: IPatient) {
    switch (patient.active) {
      case true:
        return this.ACTIVE;
      case false:
        return this.INACTIVE;
      default:
        return this.EMPTY;
    }
  }

  /**
   * Returns the telecom property depending on the name
   * @param tel - telecom property
   * @param name - name of the system's telecom referred
   * @returns the value of the telecom property
   */
  getTelecomByName(tel: ITelecom[], name: string) {
    const telecomValue = tel !== undefined ? tel.filter((telecom: ITelecom) => telecom.system === name) : [];
    return telecomValue.length > 0 ? telecomValue[0].value : this.EMPTY;
  }

  /**
   * Returns the address of the patient in one line
   * @param patient - patient
   * @returns the address of the patient
   */
  getAddress(patient: IPatient) {
    return patient.address !== undefined
      ? [patient.address[0].line, patient.address[0].city, patient.address[0].country, patient.address[0].postalCode].join(' ')
      : this.EMPTY;
  }

  /**
   * Returns the address of the patient in one line
   * @param patient - patient
   * @returns the address of the patient
   */
  hasProfilePhoto(patient: IPatient) {
    return patient.photo !== undefined && patient.photo.url !== undefined;
  }

  /**
   * Returns the contact name
   * @param patient - patient
   * @returns the contact name
   */
  getContactName(patient: IPatient) {
    const name = patient.contact !== undefined ? patient.contact[0].name : undefined;
    return name !== undefined ? this.getFullName(name) : this.EMPTY;
  }

  /**
   * Returns the contact relationship with the patient
   * @param patient - patient
   * @returns the contact relationship with the patient
   */
  getContactRelationship(patient: IPatient) {
    const relationship = patient.contact !== undefined ? patient.contact[0].relationship : undefined;
    return relationship !== undefined ? relationship[0].id : this.EMPTY;
  }

  /**
   * Returns the contact phone
   * @param patient - patient
   * @returns the contact phone
   */
  getContactPhone(patient: IPatient) {
    return patient.contact !== undefined ? this.getTelecomByName(patient.contact[0].telecom, 'phone') : this.EMPTY;
  }

  /**
   * Returns the preferred language of the patient
   * @param patient - patient
   * @returns the preferred language of the patient
   */
  getLanguage(patient: IPatient) {
    return patient.communication !== undefined ? patient.communication[0].language?.text : this.EMPTY;
  }

  /**
   * Returns the list of general partitioners of the patient
   * @param patient - patient
   * @returns the list of general partitioners of the patient
   */
  getGeneralPractitioner(patient: IPatient) {
    return patient.generalPractitioner !== undefined ? patient.generalPractitioner[0].reference : this.EMPTY;
  }

  private sortByBirthDate(): void {
    this.patients.sort((a: IPatient, b: IPatient) => {
      return Date.parse(a.birthDate) - Date.parse(b.birthDate);
    });
  }

  private handleData(data: IResponse, start: number) {
    this.loading = false;
    const end = performance.now();
    this.requestTime = end - start;
    data.entry.map((entry: IEntry) => this.patients.push(entry.resource));
    this.sortByBirthDate();
  }
}
