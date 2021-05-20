import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BaseForm } from '../components/questionnaire/models/base-form';

@Injectable()
export class QuestionnaireService {
  constructor(private http: HttpClient) {}

  getData(url: string): Observable<any> {
    return this.http.get<BaseForm<string>>(url);
  }
}
