import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';

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
  mediaUrl: string = environment.mediaURL;

  notAllowed: boolean = false;
  unexpected: boolean = false;

  items: MenuItem[] = [
    {
      id: '1',
      label: 'Publicaciones',
      icon: 'pi pi-fw pi-th-large',
      command: (event: any) => {
        this.router.navigate(['/management'], { fragment: 'products' });
      },
    },
    {
      id: '2',
      label: 'Comentarios',
      icon: 'pi pi-fw pi-comments',
      command: (event: any) => {
        this.router.navigate(['/management'], { fragment: 'comments' });
      },
    },
    {
      id: '3',
      label: 'Estadísticas',
      icon: 'pi pi-fw pi-chart-bar',
      command: (event: any) => {
        this.router.navigate(['/management'], { fragment: 'statistics' });
      },
    },
    {
      id: '4',
      label: 'Mis Datos',
      icon: 'pi pi-fw pi-id-card',
      command: (event: any) => {
        this.router.navigate(['/management'], { fragment: 'personalInfo' });
      },
    },
  ];
  activeItem: MenuItem = this.items[0];
  minDateValue: Date = new Date();
  maxDateValue: Date = new Date();

  productos: any;
  productsCurrentPage: number = 0;
  productsRows: number = 12;
  loadingProducts: boolean = false;
  updatingProducts: any = null;
  showProductFilters: boolean = false;

  comentarios: any;
  commentsCurrentPage: number = 0;
  commentsRows: number = 6;
  loadingComments: boolean = false;
  updatingComment: any = null;
  showCommentFilters: boolean = false;
  commentFilterForm: FormGroup = new FormGroup(
    {
      producto: new FormControl(-1),
      campo: new FormControl('creado'),
      orden: new FormControl('DESC'),
    },
    { updateOn: 'submit' }
  );
  commentFilterProducto: any = [];
  commentFilterCampo: any = [
    { label: 'Fecha', value: 'creado' },
    { label: 'Publicación', value: 'publicacion' },
    { label: 'Usuario', value: 'nombre' },
    { label: 'Puntuación', value: 'puntuacion' },
    { label: 'Ocultos', value: 'oculto' },
    { label: 'Celular', value: 'celular' },
  ];
  commentFilterOrder: any = [
    { label: 'Ascendente', value: 'ASC' },
    { label: 'Descendente', value: 'DESC' },
  ];

  visitasPerfil: any;
  visitasProductos: any;
  visitasContacto: any;
  final: any = new Date();
  inicio: any = new Date(this.final.getTime() - 1000 * 60 * 60 * 24 * 365);
  loadingStatitics: boolean = false;
  showStatiticsFilters: boolean = false;
  statiticsFilterForm: FormGroup = new FormGroup(
    {
      fechas: new FormControl(null),
      unico: new FormControl(false),
    },
    { updateOn: 'submit' }
  );
  statiticsUnique: any = [
    { label: 'Todos', value: false },
    { label: 'Únicos', value: true },
  ];

  usuario: any = {};
  submittedUserEditForm: boolean = false;
  sendingUserEditForm: boolean = false;
  userEditForm: FormGroup = new FormGroup(
    {
      nombre: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      apellido: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      fecha_nacimiento: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(8),
        Validators.maxLength(125),
      ]),
      celular: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0][9][0-9]+'),
      ]),
      bio: new FormControl(null, [
        Validators.minLength(3),
        Validators.maxLength(2500),
      ]),
      negocio: new FormControl(null, [
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      fecha_inicio: new FormControl(null, null),
      facebook: new FormControl(null, [
        Validators.minLength(5),
        Validators.maxLength(125),
      ]),
      instagram: new FormControl(null, [
        Validators.minLength(5),
        Validators.maxLength(125),
      ]),
      twitter: new FormControl(null, [
        Validators.minLength(5),
        Validators.maxLength(125),
      ]),
      linkedin: new FormControl(null, [
        Validators.minLength(5),
        Validators.maxLength(125),
      ]),
    },
    { updateOn: 'submit' }
  );
  originalUserFormValue: any = null;

  passMask1: boolean = true;
  passMask2: boolean = true;
  passMask3: boolean = true;
  submittedNewPasswordForm: boolean = false;
  sendingNewPasswordForm: boolean = false;
  newPasswordForm: FormGroup = new FormGroup(
    {
      password1: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(24),
      ]),
      password2: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(24),
      ]),
      password3: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(24),
      ]),
    },
    { updateOn: 'submit' }
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private cookieService: CookieService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private usuarioService: UsuarioService,
    private publicacionService: PublicacionService,
    private comentarioService: ComentarioService,
    private visitaService: VisitaService
  ) {}

  ngOnInit(): void {
    this.userEditForm.disable();
    this.route.fragment.subscribe((frag) => {
      if (frag == 'personalInfo') {
        this.activeItem = this.items[3];
        this.titleService.setTitle('Información Personal - Emprende Store');
      } else if (frag == 'statistics') {
        this.activeItem = this.items[2];
        this.titleService.setTitle('Estadísticas - Emprende Store');
      } else if (frag == 'comments') {
        this.activeItem = this.items[1];
        this.titleService.setTitle('Comentarios - Emprende Store');
      } else {
        this.activeItem = this.items[0];
        this.titleService.setTitle('Publicaciones - Emprende Store');
      }
    });
    if (
      this.cookieService.check('usuario_id') &&
      this.cookieService.get('usuario_id') !== null
    ) {
      this.usuarioService
        .getOwnUsuarioById(+this.cookieService.get('usuario_id'))
        .subscribe({
          next: (res) => {
            this.usuario = res.result;
            this.minDateValue = new Date(this.usuario.creado);
            this.statiticsFilterForm.get('fechas')?.setValue([this.minDateValue, this.maxDateValue]);
            this.cargarEstadisticas();
            this.cargarComentarios();
            this.cargarUserEditInfo();
            this.userEditForm.enable();
          },
          error: (err) => {
            console.error(err);
            if (err.status == '403') {
              this.notAllowed = true;
            } else {
              this.unexpected = true;
            }
          },
        });
      this.publicacionService
        .getOwnPublicacionesByUsuario(+this.cookieService.get('usuario_id'))
        .subscribe({
          next: (res) => {
            this.productos = res.result;
          },
          error: (err) => {
            console.error(err);
            if (err.status == '404') {
              this.productos = null;
            } else {
              this.unexpected = true;
            }
          },
        });
      this.publicacionService
        .getMinPublicacionesByUsuario(+this.cookieService.get('usuario_id'))
        .subscribe({
          next: (res) => {
            this.commentFilterProducto = res.result;
          },
        });
      this.visitaService
        .getVisitaPerfilByUsuario(
          +this.cookieService.get('usuario_id'),
          this.inicio,
          this.final
        )
        .subscribe({
          next: (res) => {
            this.visitasPerfil = res.result;
          },
        });
    } else {
      this.notAllowed = true;
    }
  }

  //* FUNCIONES PUBLICACIONES *//
  
  //* FUNCIONES COMENTARIOS *//

  cambiarEstadoComentario(coment: any) {
    let payload = {
      oculto: !coment.oculto,
    };
    this.updatingComment = coment.id;
    this.comentarioService
      .updateComentarioOculto(
        +this.cookieService.get('usuario_id'),
        coment.id,
        payload
      )
      .subscribe({
        next: (res) => {
          this.messageService.add({
            key: 'user',
            severity: 'success',
            summary: 'Comentario actualizado',
            detail: res.message,
            life: 5000,
          });
          coment.oculto = !coment.oculto;
          this.updatingComment = null;
        },
        error: (err) => {
          console.error(err);
          if (err.status == '403') {
            this.messageService.add({
              key: 'user',
              severity: 'error',
              summary: 'Error',
              detail: err.error.message,
              life: 5000,
            });
          } else {
            this.messageService.add({
              key: 'user',
              severity: 'error',
              summary: 'Error',
              detail:
                'Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.',
              life: 5000,
            });
          }
          this.updatingComment = null;
        },
      });
  }

  cargarComentarios() {
    this.commentsCurrentPage = 0;
    this.loadingComments = true;
    let publId = this.commentFilterForm.get('producto')?.value;
    if (publId >= 0) {
      this.comentarioService
        .getOwnComentariosByPublicacion(
          +this.cookieService.get('usuario_id'),
          publId,
          {
            field: this.commentFilterForm.get('campo')?.value,
            order: this.commentFilterForm.get('orden')?.value,
            limit: this.commentsRows,
            page: this.commentsCurrentPage,
          }
        )
        .subscribe({
          next: (res) => {
            this.comentarios = res.result;
            this.loadingComments = false;
          },
          error: (err) => {
            if (err.status == '404') {
              this.comentarios = null;
            } else {
              this.messageService.add({
                key: 'general',
                severity: 'error',
                summary: 'Error',
                detail:
                  'Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.',
                life: 5000,
              });
            }
            this.loadingComments = false;
          },
        });
    } else {
      this.comentarioService
        .getOwnComentariosByUsuario(+this.cookieService.get('usuario_id'), {
          field: this.commentFilterForm.get('campo')?.value,
          order: this.commentFilterForm.get('orden')?.value,
          limit: this.commentsRows,
          page: this.commentsCurrentPage,
        })
        .subscribe({
          next: (res) => {
            this.comentarios = res.result;
            this.loadingComments = false;
          },
          error: () => {
            this.messageService.add({
              key: 'general',
              severity: 'error',
              summary: 'Error',
              detail:
                'Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.',
              life: 5000,
            });
            this.loadingComments = false;
          },
        });
    }
  }

  paginacionComentarios(event: any) {
    let publId = this.commentFilterForm.get('producto')?.value;
    this.loadingComments = true;
    if (publId && publId >= 0) {
      this.comentarioService
        .getOwnComentariosByPublicacion(this.usuario.id, publId, {
          field: this.commentFilterForm.get('campo')?.value,
          order: this.commentFilterForm.get('orden')?.value,
          limit: event.rows,
          page: event.page,
        })
        .subscribe({
          next: (res) => {
            this.comentarios = res.result;
            this.commentsCurrentPage = event.first;
            this.commentsRows = event.rows;
            this.router.navigate(['/management'], {
              fragment: 'comments',
            });
            this.loadingComments = false;
          },
          error: () => {
            this.messageService.add({
              key: 'general',
              severity: 'error',
              summary: 'Error',
              detail:
                'Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.',
              life: 5000,
            });
            this.loadingComments = false;
          },
        });
    } else {
      this.comentarioService
        .getOwnComentariosByUsuario(this.usuario.id, {
          field: this.commentFilterForm.get('campo')?.value,
          order: this.commentFilterForm.get('orden')?.value,
          limit: event.rows,
          page: event.page,
        })
        .subscribe({
          next: (res) => {
            this.comentarios = res.result;
            this.commentsCurrentPage = event.first;
            this.commentsRows = event.rows;
            this.router.navigate(['/management'], {
              fragment: 'comments',
            });
            this.loadingComments = false;
          },
          error: () => {
            this.messageService.add({
              key: 'general',
              severity: 'error',
              summary: 'Error',
              detail:
                'Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.',
              life: 5000,
            });
            this.loadingComments = false;
          },
        });
    }
  }

  //* FUNCIONES ESTADISTICAS *//

  cargarEstadisticas() {
    //TODO: Arreglar esta función, servicio relacionado y backend relacionado
    this.visitaService
    .getVisitaPublicacionByUsuario(
      +this.cookieService.get('usuario_id'),
      this.statiticsFilterForm.get('fechas')?.value[0],
      this.statiticsFilterForm.get('fechas')?.value[1],
    )
    .subscribe({
      next: (res) => {
        this.visitasProductos = res.result;
      },
    });
  this.visitaService
    .getContactoPublicacionByUsuario(
      +this.cookieService.get('usuario_id'),
      this.statiticsFilterForm.get('fechas')?.value[0],
      this.statiticsFilterForm.get('fechas')?.value[1],
    )
    .subscribe({
      next: (res) => {
        this.visitasContacto = res.result;
      },
    });
    //alert(JSON.stringify(this.statiticsFilterForm.value))
  }


  //* FUNCIONES MIS DATOS*//

  cargarUserEditInfo() {
    let userData = {
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      fecha_nacimiento: this.usuario.fecha_nacimiento ? new Date(this.usuario.fecha_nacimiento) : null,
      email: this.usuario.email,
      celular: '0' + this.usuario.celular.substring(3),
      bio: this.usuario.bio,
      negocio: this.usuario.negocio,
      fecha_inicio: this.usuario.fecha_inicio ? new Date(this.usuario.fecha_inicio) : null,
      facebook: this.usuario.facebook,
      instagram: this.usuario.instagram,
      twitter: this.usuario.twitter,
      linkedin: this.usuario.linkedin,
    };
    this.originalUserFormValue = userData;
    this.userEditForm.setValue(userData);
  }

  sanitizeUserEditForm() {
    let nombreClean = this.userEditForm.get('nombre')?.value?.trim();
    this.userEditForm
      .get('nombre')
      ?.setValue(nombreClean === '' ? null : nombreClean);
    let apellidoClean = this.userEditForm.get('apellido')?.value?.trim();
    this.userEditForm
      .get('apellido')
      ?.setValue(apellidoClean === '' ? null : apellidoClean);
    let emailClean = this.userEditForm.get('email')?.value?.trim();
    this.userEditForm
      .get('email')
      ?.setValue(emailClean === '' ? null : emailClean);
    let celularClean = this.userEditForm.get('celular')?.value?.trim();
    this.userEditForm
      .get('celular')
      ?.setValue(celularClean === '' ? null : celularClean);
    let bioClean = this.userEditForm.get('bio')?.value?.trim();
    this.userEditForm.get('bio')?.setValue(bioClean === '' ? null : bioClean);
    let negocioClean = this.userEditForm.get('negocio')?.value?.trim();
    this.userEditForm
      .get('negocio')
      ?.setValue(negocioClean === '' ? null : negocioClean);
    let facebookClean = this.userEditForm.get('facebook')?.value?.trim();
    this.userEditForm
      .get('facebook')
      ?.setValue(facebookClean === '' ? null : facebookClean);
    let instagramClean = this.userEditForm.get('instagram')?.value?.trim();
    this.userEditForm
      .get('instagram')
      ?.setValue(instagramClean === '' ? null : instagramClean);
    let twitterClean = this.userEditForm.get('twitter')?.value?.trim();
    this.userEditForm
      .get('twitter')
      ?.setValue(twitterClean === '' ? null : twitterClean);
    let linkedinClean = this.userEditForm.get('linkedin')?.value?.trim();
    this.userEditForm
      .get('linkedin')
      ?.setValue(linkedinClean === '' ? null : linkedinClean);
  }

  actualizarDatosUsuario() {
    this.submittedUserEditForm = true;
    this.sendingUserEditForm = true;
    this.sanitizeUserEditForm();
    if (
      this.userEditForm.valid &&
      JSON.stringify(this.userEditForm.value) !==
        JSON.stringify(this.originalUserFormValue)
    ) {
      this.userEditForm.disable();
      this.usuarioService
        .updateUsuario(
          +this.cookieService.get('usuario_id'),
          this.userEditForm.value
        )
        .subscribe({
          next: (res) => {
            this.messageService.add({
              key: 'general',
              severity: 'success',
              summary: 'Comentario enviado',
              detail: res.message,
              life: 5000,
            });
            this.sendingUserEditForm = false;
            this.usuario = res.data;
            this.cargarUserEditInfo();
            this.userEditForm.enable();
          },
          error: (err) => {
            console.error(err);
            if (err.status == '400' || err.status == '403') {
              this.messageService.add({
                key: 'general',
                severity: 'error',
                summary: 'Error',
                detail: err.error.message,
                life: 5000,
              });
            } else {
              this.messageService.add({
                key: 'general',
                severity: 'error',
                summary: 'Error',
                detail:
                  'Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.',
                life: 5000,
              });
            }
            this.sendingUserEditForm = false;
            this.userEditForm.enable();
          },
        });
    } else {
      this.sendingUserEditForm = false;
    }
  }

  actualizarContrasena() {
    this.submittedNewPasswordForm = true;
    this.sendingNewPasswordForm = true;
    if(this.newPasswordForm.valid ) {
      this.newPasswordForm.disable()
      this.usuarioService.updateUsuarioPassword(+this.cookieService.get('usuario_id'), this.newPasswordForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            key: 'general',
            severity: 'success',
            summary: 'Contrseña actualizada',
            detail: res.message,
            life: 5000,
          });
          this.sendingNewPasswordForm = false;
          this.newPasswordForm.enable();
        },
        error: (err) => {
          console.error(err);
          if (err.status == '400' || err.status == '401' || err.status == '403') {
            this.messageService.add({
              key: 'general',
              severity: 'error',
              summary: 'Error',
              detail: err.error.message,
              life: 5000,
            });
          } else {
            this.messageService.add({
              key: 'general',
              severity: 'error',
              summary: 'Error',
              detail:
                'Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.',
              life: 5000,
            });
          }
          this.sendingNewPasswordForm = false;
          this.newPasswordForm.enable();
        },
      })
    } else {
        this.sendingNewPasswordForm = false;
    }
  }
}
