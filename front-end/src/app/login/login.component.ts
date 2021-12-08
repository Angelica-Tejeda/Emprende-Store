import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoginService } from '../../services/login.service';
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
import { environment } from 'src/environments/environment';
import { User } from '../../interfaces/user';
const _apiUrl = environment.apiURL;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ])
    ),
    password: new FormControl('', Validators.required),
  });
  constructor(private login: LoginService,
    private http: HttpClient,
    private router: Router) { }

  onLogin() {
    const { email, password } = this.loginForm.value;
    const payload = {
      correo: email,
      contrasena: password,
    };
    //console.log(payload);
    try {
      this.http.post(`${_apiUrl}/auth/login`, payload).subscribe((r) => {
        //console.log(r);
        const respuesta = JSON.parse(JSON.stringify(r));
        //localStorage.setItem('status', respuesta.status);
        //localStorage.setItem('message', respuesta.message);
        localStorage.setItem('id_user', respuesta.usuario.id);
        localStorage.setItem('activo', respuesta.usuario.activo);
        //localStorage.setItem('rol', respuesta.usuario.rol);
        /*if (respuesta.usuario.activo == 0) {
          this.router.navigate(['/bloqueado']);
        } else if (respuesta.usuario.rol == 1) {
          this.router.navigate(['/homelector']);
        } else if (respuesta.usuario.rol != 1) {
          this.router.navigate(['/homeescritor']);
        }*/
        this.router.navigate(['/userProfile', respuesta.usuario.id]);
      });
    } catch (error) {
      console.log(error);
    }
  }
  ngOnInit(): void {
  }

}
