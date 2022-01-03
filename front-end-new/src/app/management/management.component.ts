import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from 'src/services/usuario.service';
import { VisitaService } from 'src/services/visita.service';
import { PublicacionService } from 'src/services/publicacion.service';
import { ComentarioService } from 'src/services/comentario.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
})
export class ManagementComponent implements OnInit {
  mediaUrl: string = `${environment.mediaURL}`;
  notAllowed: boolean = false;
  id: any;
  usuario: any;
  productos: any;
  comentarios: any;
  visitasPerfil: any;
  visitasProductos: any;
  visitasContacto: any;
  final: any = new Date();
  inicio: any = new Date(this.final.getTime() - 1000 * 60 * 60 * 24 * 30);

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private usuarioService: UsuarioService,
    private publicacionService: PublicacionService,
    private comentarioService: ComentarioService,
    private visitaService: VisitaService
  ) {}

  ngOnInit(): void {
    if (this.cookieService.check('usuario_id')) {
      this.id = this.cookieService.get('usuario_id');
      this.usuarioService.getOwnUsuarioById(this.id).subscribe((data) => {
        this.usuario = data.result;
      });
      this.publicacionService
        .getPublicacionesByUsuario(this.id)
        .subscribe((data) => {
          this.productos = data.result.rows;
        });
      this.visitaService
        .getVisitaPerfilByUsuario(this.id, this.inicio, this.final)
        .subscribe((data) => {
          this.visitasPerfil = data.result;
        });
      this.visitaService
        .getVisitaPublicacionByUsuario(this.id, this.inicio, this.final)
        .subscribe((data) => {
          this.visitasProductos = data.result;
        });
      this.visitaService
        .getContactoPublicacionByUsuario(this.id, this.inicio, this.final)
        .subscribe((data) => {
          this.visitasContacto = data.result;
        });
      this.comentarioService
        .getAllComentariosByUsuario(this.id)
        .subscribe((data) => {
          this.visitasContacto = data.result.rows;
        });
    } else {
      this.notAllowed = true;
    }
  }
}
