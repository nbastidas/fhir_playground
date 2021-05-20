import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseForm } from '../questionnaire/models/base-form';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent {
  @Input() question: BaseForm<string>;
  @Input() form: FormGroup;

  get isValid() {
    return this.form.controls[this.question.linkId].valid;
  }
}
