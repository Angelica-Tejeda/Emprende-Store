import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  passMask: boolean = true;
  redirect: boolean = false;
  messageEmail: string = '';
  messagePassword: string = '';
  sendingLoginForm: boolean = false;
  submittedLoginForm: boolean = false;
  loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    },
    { updateOn: 'submit' }
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private cookieService: CookieService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.cookieService.get('usuario_id')) {
      this.router.navigate(['/management']);
    }
    this.route.queryParams.subscribe((params) => {
      if (params['redirect']) {
        this.redirect = params['redirect'];
      }
    });
  }

  iniciarSesion(): void {
    this.sendingLoginForm = true;
    this.submittedLoginForm = true;
    let emailClean = this.loginForm.get('email')?.value?.trim();
    this.loginForm.get('email')?.setValue(emailClean === "" ? null : emailClean);
    this.messagePassword = '';
    this.messageEmail = '';
    if (this.loginForm.valid) {
      this.loginForm.disable();
      this.authService.iniciarSesionEmpr(this.loginForm.value).subscribe({
        next: () => {
          if (this.redirect) {
            this.location.back();
          } else {
            this.router.navigate(['/management']);
          }
        },
        error: (err) => {
          console.error(err);
          this.sendingLoginForm = false;
          this.loginForm.enable();
          if (err.error.status == 'error') {
            if (err.error.message.includes('contraseña')) {
              this.messagePassword = err.error.message;
            } else if (err.error.message.includes('email')) {
              this.messageEmail = err.error.message;
            } else {
              this.messageService.add({
                key: 'general',
                severity: 'error',
                summary: 'Error',
                detail: err.error.message,
                life: 5000,
              });
            }
          } else {
            this.messageService.add({
              key: 'general',
              severity: 'error',
              summary: 'Error',
              detail:
                'Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.',
              life: 5000,
            });
          }
        },
      });
    } else {
      this.sendingLoginForm = false;
    }
  }
}
