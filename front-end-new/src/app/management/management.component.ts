import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from 'src/services/usuario.service';
import { VisitaService } from 'src/services/visita.service';
import { PublicacionService } from 'src/services/publicacion.service';
import { ComentarioService } from 'src/services/comentario.service';
import { environment } from '../../environments/environment';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
})
export class ManagementComponent implements OnInit {
  mediaUrl: string = environment.mediaURL;
  notAllowed: boolean = false;
  unexpected: boolean = false;
  items: MenuItem[] = [
    {
      id: '1',
      label: 'Publicaciones',
      icon: 'pi pi-fw pi-th-large',
      command: (event: any) => {
        this.activeItem = this.items[0];
      },
    },
    {
      id: '2',
      label: 'Estadísticas',
      icon: 'pi pi-fw pi-chart-bar',
      command: (event: any) => {
        this.activeItem = this.items[1];
      },
    },
    {
      id: '3',
      label: 'Comentarios',
      icon: 'pi pi-fw pi-comments',
      command: (event: any) => {
        this.activeItem = this.items[2];
      },
    },
    {
      id: '4',
      label: 'Mis Datos',
      icon: 'pi pi-fw pi-id-card',
      command: (event: any) => {
        this.activeItem = this.items[3];
      },
    },
  ];
  activeItem: MenuItem = this.items[0];
  usuario: any;
  productos: any;
  comentarios: any;
  visitasPerfil: any;
  visitasProductos: any;
  visitasContacto: any;
  final: any = new Date();
  inicio: any = new Date(this.final.getTime() - 1000 * 60 * 60 * 24 * 365);

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private usuarioService: UsuarioService,
    private publicacionService: PublicacionService,
    private comentarioService: ComentarioService,
    private visitaService: VisitaService
  ) {}

  ngOnInit(): void {
    if (
      this.cookieService.check('usuario_id') &&
      this.cookieService.get('usuario_id') !== null
    ) {
      this.usuarioService.getOwnUsuarioById(+this.cookieService.get('usuario_id')).subscribe({
        next: (res) => {
          this.usuario = res.result;
        },
        error: (err) => {
          console.error(err)
          this.unexpected = true;
        }
      });
      this.publicacionService.getOwnPublicacionesByUsuario(+this.cookieService.get('usuario_id')).subscribe({
        next: (res) => {
          this.productos = res.result.rows;
        },
        error: (err) => {
          console.error(err)
          if (err.status == '404') {
            this.productos = null
          } else {
            this.unexpected = true;
          }
        } 
      });
      this.visitaService.getVisitaPerfilByUsuario(+this.cookieService.get('usuario_id'), this.inicio, this.final).subscribe({
        next: (res) => {
          this.visitasPerfil = res.result;
        }
      })
      this.visitaService.getVisitaPublicacionByUsuario(+this.cookieService.get('usuario_id'), this.inicio, this.final).subscribe({
        next: (res) => {
          this.visitasProductos = res.result;
        }
      })
      this.visitaService.getContactoPublicacionByUsuario(+this.cookieService.get('usuario_id'), this.inicio, this.final).subscribe({
        next: (res) => {
          this.visitasContacto = res.result;
        }
      })
      this.comentarioService.getAllComentariosByUsuario(+this.cookieService.get('usuario_id')).subscribe({
        next: (res) => {
          this.comentarios = res.result.rows;
        }
      })
      /*this.visitaService
        .getVisitaPerfilByUsuario(+this.cookieService.get('usuario_id'), this.inicio, this.final)
        .subscribe((data) => {
          this.visitasPerfil = data.result;
        });
      this.visitaService
        .getVisitaPublicacionByUsuario(+this.cookieService.get('usuario_id'), this.inicio, this.final)
        .subscribe((data) => {
          this.visitasProductos = data.result;
        });
      this.visitaService
        .getContactoPublicacionByUsuario(+this.cookieService.get('usuario_id'), this.inicio, this.final)
        .subscribe((data) => {
          this.visitasContacto = data.result;
        });
      this.comentarioService
        .getAllComentariosByUsuario(+this.cookieService.get('usuario_id'))
        .subscribe((data) => {
          this.visitasContacto = data.result.rows;
        });*/
    } else {
      this.notAllowed = true;
    }
  }
}
