import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from 'src/services/usuario.service';
import { ProductosService } from 'src/services/productos.service';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent implements OnInit {
  mediaUrl: string = environment.mediaURL;
  id: any;
  usuario_own: boolean = false;
  usuario: any;
  nProductos: any;
  productos: any;
  tiempo: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private usuarioService: UsuarioService,
    private productoService: ProductosService
  ) {
    this.route.params.subscribe(({ id }) => {
      this.id = id;
    });
  }

  ngOnInit(): void {
    if (this.cookieService.check("usuario_id") && this.cookieService.get("usuario_id") == this.id) {
      this.usuario_own = true;
    }
    if (this.usuario_own) {
      this.usuarioService.getOwnUsuarioById(this.id).subscribe((data) => {
        this.usuario = data.result;
      })
    } else {
      this.usuarioService.getUsuarioById(this.id).subscribe((data) => {
        this.usuario = data.result;
      })
    }
    this.productoService.getPublicacionesByUsuario(this.id).subscribe((data) => {
      this.nProductos = data.result.count;
      this.productos = data.result.rows;
    })
  }
}
