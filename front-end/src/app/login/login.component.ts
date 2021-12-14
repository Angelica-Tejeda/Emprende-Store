import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  onLogin() {
    const { email, password } = this.loginForm.value;
    const payload = {
      email: email,
      password: password,
    };
    try {
      this.auth.iniciarSesionEmpr(payload).subscribe((res) => {
        if (res.status == 'success') {
          window.localStorage.setItem('usuario_id', res.usuario.id);
          window.localStorage.setItem('usuario_rol', res.usuario.rol);
          window.localStorage.setItem('usuario_activo', res.usuario.activo);
          this.router.navigate(['/userProfile', res.usuario.id]);
        } else {
          //TODO: Agregar mensajes de inicio de sesion fallido
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  ngOnInit(): void {}
}
