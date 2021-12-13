import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from 'src/services/usuario.service';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent implements OnInit {
  mediaUrl: string = "http://localhost:3000";
  usuario: any;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    if (this.cookieService.check('accessToken')) {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: "Bearer " + this.cookieService.get('accessToken'),
        }),
      };
      this.usuarioService
        .getOwnUsuarioById(+this.cookieService.get('usuario_id'), httpOptions)
        .subscribe((data) => {
          this.usuario = data.result;
        });
    } else {
      this.router.navigate(['/login']);
    }
    /*this.usuarioService.getOwnUsuarioById().subscribe((data) => {
      this.usuario = data.result;
    });*/
  }
}
