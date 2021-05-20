import { Component, OnInit } from '@angular/core';
import { ApiService } from '../app/services/api-service.service';
import { IPatient } from './models/patient';
import { IEntry, IResponse } from './models/response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  active = 1;
}
