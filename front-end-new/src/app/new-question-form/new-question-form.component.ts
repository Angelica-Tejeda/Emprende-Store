import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { Validators, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-new-question-form',
  templateUrl: './new-question-form.component.html',
  styleUrls: ['./new-question-form.component.css']
})
export class NewQuestionFormComponent implements OnInit {

  questionForm: FormGroup = new FormGroup(
    {
      titulo: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, Validators.required),
      categoria:new FormControl(null, Validators.required)
    },
    { updateOn: 'submit' }
  );
  categorias: string[] = ["Publicidad y Marketing", "Salud y bienestar"];

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
  }

  newQuestion(){}
}
