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
      nombre: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(62),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(8),
        Validators.maxLength(125),
      ]),
      celular: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0][9][0-9]+'),
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
    this.sanitizeContactForm();
    if (this.contactForm.valid) {
      this.contactForm.disable();
      setTimeout(() => {
        this.messageService.add({
          key: 'general',
          severity: 'success',
          summary: 'Formulario enviado',
          detail:
            'Tu formulario será revisado por uno de nuestros administradores. Pronto recibirás una respuesta a tu correo electrónico.',
          life: 5000,
        });
        this.sendingContactForm = false;
        //this.contactForm.reset();
        //this.contactForm.enable();
      }, 1500);
    } else {
      this.sendingContactForm = false;
    }
  }

  sanitizeContactForm() {
    let nombreClean = this.contactForm.get('nombre')?.value?.trim();
    this.contactForm
      .get('nombre')
      ?.setValue(nombreClean === '' ? null : nombreClean);
    let emailClean = this.contactForm.get('email')?.value?.trim();
    this.contactForm
      .get('email')
      ?.setValue(emailClean === '' ? null : emailClean);
    let celularClean = this.contactForm.get('celular')?.value?.trim();
    this.contactForm
      .get('celular')
      ?.setValue(celularClean === '' ? null : celularClean);
    let mensajeClean = this.contactForm.get('mensaje')?.value?.trim();
    this.contactForm
      .get('mensaje')
      ?.setValue(mensajeClean === '' ? null : mensajeClean);
  }
}
