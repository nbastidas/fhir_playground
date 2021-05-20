import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/form-service';
import { QuestionnaireService } from 'src/app/services/questionnaire-service';
import { BaseForm } from './models/base-form';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {
  formQuestions: BaseForm<string>[]| null = [];
  form: FormGroup;
  payLoad = '';

  constructor(private questionnaireService: QuestionnaireService, private formService: FormService) {}

  ngOnInit(): void {
    const url = 'assets/questionnaire.json';
    this.questionnaireService.getData(url).subscribe((result) => {
      this.formQuestions = result.item;
      this.form = this.formService.toFormGroup(this.formQuestions);
    });
  }

  onSubmit() {
    this.formQuestions.forEach((question: BaseForm<string>) => {
      question.answer = this.form.get(question.linkId.toString()).value;
    });
    this.payLoad = JSON.stringify(this.formQuestions, null, 2);
  }
}
