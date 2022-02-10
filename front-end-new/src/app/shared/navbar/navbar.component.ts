import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
})
export class NavbarComponent implements OnInit {
  @Input() isHome: boolean = false;
  @Input() isSearch: boolean = false;
  @Input() isLogin: boolean = false;
  mediaUrl: string = environment.mediaURL;
  url: string = this.router.url;
  isMenuCollapsed = true;
  isDropdownOpened = false;
  isLogged = false;
  public restrictedToast = false;
  usuario: any = null;
  searchForm: FormGroup = new FormGroup(
    {
      busqueda: new FormControl(null, Validators.required),
    },
    { updateOn: 'submit' }
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
        .getMinUsuarioById(+this.cookieService.get('usuario_id'))
        .subscribe({
          next: (res) => {
            this.usuario = res.result;
            this.isLogged = true;
            if (!this.usuario.activo) {
              this.messageService.clear('restrict');
              this.messageService.add({
                key: 'restrict',
                severity: 'warn',
                summary: 'Cuenta restringida',
                detail:
                  'Su cuenta ha sido restringida por la falta de pago de su membresia. Sus publicaciones no serán visibles para los visitantes de la página y algunas funciones pueden no estar disponibles.',
                sticky: true,
              });
            }
            if (!this.usuario.verificado) {
              this.messageService.clear('restrict');
              this.messageService.add({
                key: 'restrict',
                severity: 'warn',
                summary: 'Verificar cuenta',
                detail:
                  'Por favor, verifique su cuenta. Mientras no lo haga sus publicaciones no serán visibles para los visitantes de la página y algunas funciones pueden no estar disponibles. Si no le ha llegado un correo para verificar su cuenta, solicitelo en la sección de editar perfil.',
                sticky: true,
              });
            }
          },
          error: (err) => {
            if (err.status == '403') {
              this.authService.cerrarSesion().subscribe({});
              this.router.navigate(['/login', {redirect: true}]).then(() => {
                this.cookieService.delete('usuario_verif')
                this.cookieService.delete('usuario_act');
                this.cookieService.delete('usuario_rol');
                this.cookieService.delete('usuario_id');
                this.isLogged = false;
                this.messageService.clear('restrict');
                this.messageService.clear('user');
                this.messageService.add({
                  key: 'general',
                  severity: 'warning',
                  summary: 'Sesión finalizada',
                  detail: "La sesión ha finalizado debido a un error inesperado. Vuelve a iniciar sesión.",
                  life: 5000,
                });
              });
            }
          },
        });
    }
    if (this.isSearch) {
      this.route.params.subscribe(({ busqueda }) => {
        this.searchForm.setValue({
          busqueda: decodeURIComponent(busqueda),
        });
      });
    }
  }

  checkDropDown(event: boolean) {
    this.isDropdownOpened = event;
  }

  buscarProductos() {
    let busquedaClean = this.searchForm.get('busqueda')?.value?.trim();
    this.searchForm
      .get('busqueda')
      ?.setValue(busquedaClean === '' ? null : busquedaClean);
    if (this.searchForm.valid) {
      this.router.navigate(['search', busquedaClean]);
    }
  }

  cerrarSesion(): void {
    this.confirmationService.confirm({
      message: '¿Seguro que deseas cerrar tu sesión?',
      header: 'Cerrar sesión',
      icon: 'pi pi-exclamation-circle',
      accept: () => {
        this.authService.cerrarSesion().subscribe({
          next: (res) => {
            this.router.navigate(['/login']).then(() => {
              this.cookieService.delete('usuario_verif')
              this.cookieService.delete('usuario_act');
              this.cookieService.delete('usuario_rol');
              this.cookieService.delete('usuario_id');
              this.isLogged = false;
              this.messageService.clear('restrict');
              this.messageService.clear('user');
              this.messageService.add({
                key: 'general',
                severity: 'success',
                summary: 'Sesión finalizada',
                detail: res.message,
                life: 5000,
              });
            });
          },
        });
      },
      reject: () => {},
    });
  }
}
