import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  passMask: boolean = true;
  submitted: boolean = false;
  waiting: boolean = false;
  messageEmail: string = '';
  messagePassword: string = '';
  loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    },
    { updateOn: 'submit' }
  );

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.cookieService.get('usuario_id')) {
      this.router.navigate(['/home']);
    }
  }

  iniciarSesion(): void {
    this.waiting = true;
    this.submitted = true;
    this.messagePassword = '';
    this.messageEmail = '';
    if (this.loginForm.valid) {
      this.authService.iniciarSesionEmpr(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.status == 'success') {
            this.router.navigate(['/management']);
          }
        },
        error: (err) => {
          console.error(err);
          this.waiting = false;
          if (err.error.status == 'error') {
            if (err.error.message.includes('contraseña')) {
              this.messagePassword = err.error.message;
            } else if (err.error.message.includes('email')) {
              this.messageEmail = err.error.message;
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: err.error.message,
                life: 5000,
              });
            }
          } else {
            this.messageService.add({
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
      this.waiting = false;
    }
  }
}
