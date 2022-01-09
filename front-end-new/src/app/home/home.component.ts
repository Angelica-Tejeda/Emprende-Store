import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  asuntoOptions: string[] = [
    'Preguntas',
    'Sugerencias',
    'Quejas',
    'Quiero ser parte de APADA',
  ];
  sendingContactForm: boolean = false;
  submittedContactForm: boolean = false;
  contactForm: FormGroup = new FormGroup(
    {
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      celular: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^[+]?[0-9|(|)|-]+'),
      ]),
      asunto: new FormControl(null, Validators.required),
      mensaje: new FormControl(null, Validators.required),
    },
    { updateOn: 'submit' }
  );

  constructor(public router: Router, private messageService: MessageService) {}

  ngOnInit(): void {}

  enviarFormulario(): void {
    //TODO: Hacer el servicio y la infraestructura para enviar el formulario
    this.sendingContactForm = true;
    this.submittedContactForm = true;
    if (this.contactForm.valid) {
      this.contactForm.disable();
      setTimeout(() => {
        this.messageService.add({
          key: 'general',
          severity: 'success',
          summary: 'Formulario enviado',
          detail:
            'Tu formulario será revisado por uno de nuestros administradores. Pronto recibirás una respuesta a tu correo electrónico.',
          life: 7000,
        });
        this.sendingContactForm = false;
        this.contactForm.reset();
        this.contactForm.enable();
      }, 1500);
    } else {
      this.sendingContactForm = false;
      this.contactForm.enable();
    }
  }
}
