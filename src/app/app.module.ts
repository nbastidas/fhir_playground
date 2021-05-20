import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ApiService } from './services/api-service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientTableComponent } from './components/patient-table/patient-table.component';
import { DefaultEmptyValuePipe } from './pipes/default-empty-value.pipe';

@NgModule({
  declarations: [AppComponent, PatientTableComponent, DefaultEmptyValuePipe],
  imports: [BrowserModule, HttpClientModule, RouterModule, NgbModule, ReactiveFormsModule, FormsModule],
  providers: [ApiService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
