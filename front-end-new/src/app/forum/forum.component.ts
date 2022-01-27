import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  options: String[] = ["Todas las preguntas","Mis preguntas","Resueltas","Sin resolver"];
  selectedOption:any;
  loadingQuestions:boolean = false;
  questionRows:number=6;
  questionsCurrentPage:number=0;
  questions:any= {'count':50, 'rows':[{}]};
  constructor() { }

  ngOnInit(): void {
  }
  buscarPreguntas(){}
  paginacionQuestions(event:any){}
}
