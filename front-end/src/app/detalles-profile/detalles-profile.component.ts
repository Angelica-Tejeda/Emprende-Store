import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from 'src/services/usuario.service';
import { VisitaService } from 'src/services/visita.service';
import { ProductosService } from 'src/services/productos.service';
import { ComentarioService } from 'src/services/comentario.service';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-detalles-profile',
  templateUrl: './detalles-profile.component.html',
  styleUrls: ['./detalles-profile.component.css']
})
export class DetallesProfileComponent implements OnInit {
  mediaUrl: string = `${environment.mediaURL}`;
  id: any;
  usuario: any;
  productos: any;
  comentarios: any;
  visitasPerfil: any;
  visitasProductos: any;
  visitasContacto: any;
  final: any = new Date();
  inicio: any = new Date(this.final.getTime() - (1000 * 60 * 60 * 24 * 30))

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private usuarioService: UsuarioService,
    private productoService: ProductosService,
    private comentarioService: ComentarioService,
    private visitaService: VisitaService
  ) {}

  ngOnInit(): void {
    if (this.cookieService.check("usuario_id")) {
      this.id = this.cookieService.get("usuario_id");
      this.usuarioService.getOwnUsuarioById(this.id).subscribe((data) => {
        this.usuario = data.result;
      });
      this.productoService.getPublicacionesByUsuario(this.id).subscribe((data) => {
        this.productos = data.result.rows;
      });
      this.visitaService.getVisitaPerfilByUsuario(this.id, this.inicio, this.final).subscribe((data) => {
        this.visitasPerfil = data.result;
      });
      this.visitaService.getVisitaPublicacionByUsuario(this.id, this.inicio, this.final).subscribe((data) => {
        this.visitasProductos = data.result;
      });
      this.visitaService.getContactoPublicacionByUsuario(this.id, this.inicio, this.final).subscribe((data) => {
        this.visitasContacto = data.result;
      });
    } else {
      this.router.navigate(['/landing-page']);
    }
  }

}
