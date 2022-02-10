import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Validators, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.css']
})
export class QuestionViewComponent implements OnInit {
  mediaUrl: string = environment.mediaURL;
  showNewAnswer: boolean = false;
  submittedAnswerForm: boolean=false;
  sendingAnswerForm:boolean=false;
  question: any = {
    id: 5,
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
      negocio: "Negocio Iventado",
      foto_perfil: "/profile/profile-4.png"
    },
    mejor_respuesta: {
      id: 6,
      texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non animi corporis nulla sequi quo amet, quisquam reprehenderit eligendi est suscipit, a beatae modi assumenda vel voluptas, quos quod accusamus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non animi corporis nulla sequi quo amet, quisquam reprehenderit eligendi est suscipit, a beatae modi assumenda vel voluptas, quos quod accusamus.",
      mejor_respuesta: true,
      creado: new Date(),
      modificado: new Date(),
      usuario: {
        id: 42,
        nombre: "User",
        apellido: "DePrueba",
        negocio: null,
        foto_perfil: "/default/profile-default.png"
      }
    },
    respuestas: [
      {
        id: 2,
        texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non animi corporis nulla sequi quo amet, quisquam reprehenderit eligendi est suscipit, a beatae modi assumenda vel voluptas, quos quod accusamus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non animi corporis nulla sequi quo amet, quisquam reprehenderit eligendi est suscipit, a beatae modi assumenda vel voluptas, quos quod accusamus.",
        mejor_respuesta: false,
        creado: new Date(),
        modificado: new Date(),
        usuario: {
          id: 40,
          nombre: "Usuario",
          apellido: "DePrueba",
          negocio: null,
          foto_perfil: "/default/profile-default.png"
        }
      },
      {
        id: 4,
        texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non animi corporis nulla sequi quo amet, quisquam reprehenderit eligendi est suscipit, a beatae modi assumenda vel voluptas, quos quod accusamus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non animi corporis nulla sequi quo amet, quisquam reprehenderit eligendi est suscipit, a beatae modi assumenda vel voluptas, quos quod accusamus.",
        mejor_respuesta: false,
        creado: new Date(),
        modificado: new Date(),
        usuario: {
          id: 41,
          nombre: "OtroUsuario",
          apellido: "DePrueba",
          negocio: "Negocio chido",
          foto_perfil: "/default/profile-default.png"
        }
      },
    ]
  }
  answerForm: FormGroup = new FormGroup(
    {
      answer: new FormControl(null, Validators.required),
    },
    { updateOn: 'submit' }
  );
  constructor() { }

  enviarNuevaRespuesta(){}
  ngOnInit(): void {
  }

}
