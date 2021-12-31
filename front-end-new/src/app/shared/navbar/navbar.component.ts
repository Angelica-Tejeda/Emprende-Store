import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../../services/auth.service';
import { UsuarioService } from 'src/services/usuario.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  //encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService],
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  public isDropdownOpened = false;
  public isLogged = false;
  //public isSearchFilled = false;
  public url: string = this.router.url;
  mediaUrl: string = environment.mediaURL;
  usuario: any = null;
  searchForm: FormGroup = new FormGroup({
    busqueda: new FormControl(null, Validators.required),
  });
  //productosFiltrados: any[] = [];

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    if (
      this.cookieService.check('usuario_id') &&
      this.cookieService.get('usuario_id') !== null
    ) {
      this.usuarioService
        .getOwnUsuarioById(+this.cookieService.get('usuario_id'))
        .subscribe((res) => {
          if (res.status == 'success') {
            this.usuario = res.result;
            this.isLogged = true;
            if (!this.usuario.activo) {
              this.messageService.add({
                severity: 'warn',
                summary: 'Cuenta restringida',
                detail:
                  'Su cuenta ha sido restringida por la falta de pago de su membresia. Sus publicaciones no serán visibles para los visitantes de la página y algunas funciones pueden no estar disponibles.',
                sticky: true,
              });
            }
          }
        });
    }
    if (this.url.includes('search')) {
      this.searchForm.setValue({
        busqueda: decodeURIComponent(this.url.split('/')[2]),
      });
    }
  }

  checkDropDown(event: boolean) {
    this.isDropdownOpened = event;
  }

  /*checkSearchFilled() {
    alert("works")
    if (this.searchForm.get("busqueda")) {
      this.isSearchFilled = true;
    } else {
      this.isSearchFilled = false;
    }
  }*/

  /*filtrarProductos(event: Event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];

    this.productosFiltrados = filtered;
  }*/

  buscarProductos() {
    if (this.searchForm.valid) {
      let b = this.searchForm.value;
      this.router.navigate(['search', b.busqueda]);
    }
  }

  cerrarSesion(): void {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres de cerrar tu sesión y salir?',
      header: 'Cerrar sesión',
      icon: 'pi pi-exclamation-circle',
      accept: () => {
        this.authService.cerrarSesion().subscribe((res) => {
          if (res.status == 'success') {
            this.cookieService.deleteAll();
            this.isLogged = false;
            this.router.navigate(['/home']);
            this.messageService.clear();
            this.messageService.add({
              severity: 'success',
              summary: 'Sesión finalizada',
              detail: res.message,
              life: 5000,
            });
          }
        });
      },
      reject: () => {
        /*this.messageService.add({
          severity: 'error',
          summary: 'Sesión finalizada',
          detail: 'res.message',
          life: 5000,
        });*/
      },
    });
  }
}
