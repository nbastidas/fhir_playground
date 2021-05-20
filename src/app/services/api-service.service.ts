import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IResponse } from '../components/patient-table/models/response';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  PATIENT = '/Patient';
  from = 'ge1960-01-01';
  to = 'le1965-01-01';

  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieves a list of patients with all the information related
   * @returns a list of patients
   */
  getPatients() {
    return this.httpClient.get<IResponse>(environment.queryURI + this.PATIENT, { headers: this.getHeaders() });
  }

  /**
   * Retrieves a list of patients given their birthdate
   * @param date - birthdate of the patients to search
   * @returns a list of patients
   */
  getPatientsByBirthDate() {
    return this.httpClient.get<IResponse>(`${environment.queryURI}${this.PATIENT}`, {
      headers: this.getHeaders(),
      params: { birthdate: [this.from, this.to] },
    });
  }

  /**
   * Retrieves a list of patients given their birthdate or their name
   * @param date - birthdate of the patients to search
   * @param name - name of the patients to search
   * @returns a list of patients
   */
  getPatientsByBirthDateAndName(date: string, patientName: string) {
    return this.httpClient.get<IResponse>(`${environment.queryURI}${this.PATIENT}`, {
      headers: this.getHeaders(),
      params: this.getParams(date, patientName),
    });
  }

  private getParams(date: string, patientName: string) {
    if (date !== '' && patientName !== '') {
      return { birthdate: date, name: patientName };
    } else if (date !== '' && patientName === '') {
      return { birthdate: date };
    } else if (patientName !== '' && date === '') {
      return { name: patientName };
    } else {
      return {};
    }
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/fhir+json',
    });
    return headers;
  }
}
