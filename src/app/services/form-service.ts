import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BaseForm } from '../components/questionnaire/models/base-form';

@Injectable()
export class FormService {
  constructor() {}

  toFormGroup(questions: BaseForm<string>[]) {
    const group: any = {};

    questions.forEach((question) => {
      group[question.linkId] =
        question.type === 'group'
          ? this.getItem(question.item)
          : question.required === 'false'
          ? new FormControl(question.value || '')
          : new FormControl(question.value || '', Validators.required);
    });
    return new FormGroup(group);
  }

  private getItem(questions: BaseForm<string>[]) {
    const group: any = {};
    questions.forEach((question) => {
      group[question.linkId] = question.required === 'true'
        ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
