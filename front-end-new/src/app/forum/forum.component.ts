import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import {DialogService} from 'primeng/dynamicdialog';
import { NewQuestionFormComponent } from '../new-question-form/new-question-form.component';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  providers: [DialogService]
})
 
export class ForumComponent implements OnInit {
  options: String[] = ["Todas las preguntas", "Mis preguntas", "Resueltas", "Sin resolver"];
  selectedOption: any;
  loadingQuestions: boolean = false;
  questionRows: number = 6;
  questionsCurrentPage: number = 0;
  questions:any= {
    "count": 10,
    "rows": [
      {
    id: 1,
        titulo: "¿Cómo publicitar mejor mis productos?",
        texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non animi corporis nulla sequi quo amet, quisquam reprehenderit eligendi est suscipit, a beatae modi assumenda vel voluptas, quos quod accusamus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non animi corporis nulla sequi quo amet, quisquam reprehenderit eligendi est suscipit, a beatae modi assumenda vel voluptas, quos quod accusamus.",
        categoria: "Publicidad y marketing",
        activo: true,
        creado: new Date(),
        modificado: new Date(),
    usuario: {
    id: 4,
    nombre: "Josué",
    apellido: "Cabezas",
    negocio: "Negocio Iventado"
    }
      },
      {
    id: 2,
        titulo: "¿Cómo publicitar mejor mis productos?",
        texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non animi corporis nulla sequi quo amet, quisquam reprehenderit eligendi est suscipit, a beatae modi assumenda vel voluptas, quos quod accusamus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non animi corporis nulla sequi quo amet, quisquam reprehenderit eligendi est suscipit, a beatae modi assumenda vel voluptas, quos quod accusamus.",
        categoria: "Publicidad y marketing",
        activo: false,
        creado: new Date(),
        modificado: new Date(),
    usuario: {
    id: 4,
    nombre: "Josué",
    apellido: "Cabezas",
    negocio: "Negocio Iventado"
    }
      },
      {
    id: 3,
        titulo: "¿Cómo publicitar mejor mis productos?",
        texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non animi corporis nulla sequi quo amet, quisquam reprehenderit eligendi est suscipit, a beatae modi assumenda vel voluptas, quos quod accusamus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non animi corporis nulla sequi quo amet, quisquam reprehenderit eligendi est suscipit, a beatae modi assumenda vel voluptas, quos quod accusamus.",
        categoria: "Publicidad y marketing",
        activo: true,
        creado: new Date(),
        modificado: new Date(),
    usuario: {
    id: 4,
    nombre: "Josué",
    apellido: "Cabezas",
    negocio: "Negocio Iventado"
    }
      },
      {
    id: 4,
        titulo: "¿Cómo publicitar mejor mis productos?",
        texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non animi corporis nulla sequi quo amet, quisquam reprehenderit eligendi est suscipit, a beatae modi assumenda vel voluptas, quos quod accusamus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non animi corporis nulla sequi quo amet, quisquam reprehenderit eligendi est suscipit, a beatae modi assumenda vel voluptas, quos quod accusamus.",
        categoria: "Publicidad y marketing",
        activo: true,
        creado: new Date(),
        modificado: new Date(),
    usuario: {
    id: 4,
    nombre: "Josué",
    apellido: "Cabezas",
    negocio: "Negocio Iventado"
    }
      },
      {
    id: 5,
        titulo: "¿Cómo publicitar mejor mis productos?",
        texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non animi corporis nulla sequi quo amet, quisquam reprehenderit eligendi est suscipit, a beatae modi assumenda vel voluptas, quos quod accusamus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non animi corporis nulla sequi quo amet, quisquam reprehenderit eligendi est suscipit, a beatae modi assumenda vel voluptas, quos quod accusamus.",
        categoria: "Publicidad y marketing",
        activo: false,
        creado: new Date(),
        modificado: new Date(),
    usuario: {
    id: 4,
    nombre: "Josué",
    apellido: "Cabezas",
    negocio: "Negocio Iventado"
    }
      },
    ]
  }
  ref:any;
  constructor(public dialogService: DialogService) { }

  ngOnInit(): void {
  }
  buscarPreguntas() { }
  paginacionQuestions(event: any) { }
  show() {
    this.ref = this.dialogService.open(NewQuestionFormComponent, {
      header: 'Hacer nueva pregunta',
      width: '40%',
      height: '50%'
  });
}

ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
}
}
