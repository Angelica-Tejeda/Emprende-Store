import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from 'src/services/usuario.service';
import { PublicacionService } from 'src/services/publicacion.service';
import { IpService } from 'src/services/ip.service';
import { VisitaService } from 'src/services/visita.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  mediaUrl: string = environment.mediaURL;
  notFound: boolean = false;
  unexpected: boolean = false;
  owned: boolean = false;
  userId: any;
  usuario: any = null;
  productos: any = null;
  productsCurrentPage: number = 0;
  productsRows: number = 5;
  loadingProducts: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private usuarioService: UsuarioService,
    private publicacionService: PublicacionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ userId }) => {
      this.notFound = false;
      this.unexpected = false;
      this.owned = false;
      this.usuario = null;
      this.productos = null;
      this.productsCurrentPage = 0;
      this.productsRows = 5;
      this.loadingProducts = false;
      this.userId = userId;

      if (
        this.cookieService.check('usuario_id') &&
        this.cookieService.get('usuario_id') == this.userId
      ) {
        this.owned = true;
      }
      //this.usuarioService
    });
    /*if (
      this.cookieService.check('usuario_id') &&
      this.cookieService.get('usuario_id') == this.userId
    ) {
      this.usuario_own = true;
    }
    if (this.usuario_own) {
      this.usuarioService.getOwnUsuarioById(this.userId).subscribe((data) => {
        this.usuario = data.result;
      });
    } else {
      this.usuarioService.getUsuarioById(this.userId).subscribe((data) => {
        this.usuario = data.result;
      });
    }
    this.publicacionService
      .getPublicacionesByUsuario(this.userId)
      .subscribe((data) => {
        this.nProductos = data.result.count;
        this.productos = data.result.rows;
      });*/
  }
}
