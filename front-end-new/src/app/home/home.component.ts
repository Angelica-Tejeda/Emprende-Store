import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService],
})
export class HomeComponent implements OnInit {
  sendingForm: boolean = false;
  submitted: boolean = false;
  asuntoOptions: string[] = [
    'Preguntas',
    'Sugerencias',
    'Quejas',
    'Quiero ser parte de APADA',
  ];
  contactForm: FormGroup = new FormGroup(
    {
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      celular: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.pattern('^[+]?[0-9|\(|\)|\-]+')]),
      asunto: new FormControl(null, Validators.required),
      mensaje: new FormControl(null, Validators.required),
    },
    { updateOn: 'submit' }
  );

  constructor(public router: Router, private messageService: MessageService) {}

  ngOnInit(): void {}

  enviarFormulario(): void {
    //TODO: Hacer el servicio y la infraestructura para enviar el formulario
    this.sendingForm = true;
    this.submitted = true;
    if (this.contactForm.valid) {
      setTimeout(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Formulario enviado',
          detail:
            'Tu formulario será revisado por uno de nuestros administradores. Pronto recibirás una respuesta a tu correo electrónico.',
          life: 7000,
        });
        this.sendingForm = false;
      }, 700);
    } else {
      this.sendingForm = false;
    }
  }
}
