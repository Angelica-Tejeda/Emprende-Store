import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from 'src/services/usuario.service';
import { VisitaService } from 'src/services/visita.service';
import { PublicacionService } from 'src/services/publicacion.service';
import { ComentarioService } from 'src/services/comentario.service';
import { MessageService } from 'primeng/api';
import { Validators, FormControl, FormGroup } from '@angular/forms';
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
  commentFilterOrden: any = [
    { label: 'Ascendente', value: 'ASC' },
    { label: 'Descendente', value: 'DESC' },
  ];

  visitasPerfil: any;
  visitasProductos: any;
  visitasContacto: any;
  final: any = new Date();
  inicio: any = new Date(this.final.getTime() - 1000 * 60 * 60 * 24 * 365);

  usuario: any;
  submittedUserEditForm: boolean = false;
  sendingUserEditForm: boolean = false;
  userEditForm: FormGroup = new FormGroup(
    {
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      fecha_nacimiento: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      celular: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0][9][0-9]+'),
      ]),
      bio: new FormControl(null, null),
      negocio: new FormControl(null, null),
      fecha_inicio: new FormControl(null, null),
      facebook: new FormControl(null, null),
      instagram: new FormControl(null, null),
      twitter: new FormControl(null, null),
      linkedin: new FormControl(null, null),
    },
    { updateOn: 'submit' }
  )
  maxDateValue: Date = new Date();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private usuarioService: UsuarioService,
    private publicacionService: PublicacionService,
    private comentarioService: ComentarioService,
    private visitaService: VisitaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.fragment.subscribe((frag) => {
      if (frag == 'personalInfo') {
        this.activeItem = this.items[3];
      } else if (frag == 'statistics') {
        this.activeItem = this.items[2];
      } else if (frag == 'comments') {
        this.activeItem = this.items[1];
      } else {
        this.activeItem = this.items[0];
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
            this.cargarUserEditForm();
            this.maxDateValue = new Date(this.usuario.creado);
          },
          error: (err) => {
            console.error(err);
            this.unexpected = true;
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
      this.visitaService
        .getVisitaPublicacionByUsuario(
          +this.cookieService.get('usuario_id'),
          this.inicio,
          this.final
        )
        .subscribe({
          next: (res) => {
            this.visitasProductos = res.result;
          },
        });
      this.visitaService
        .getContactoPublicacionByUsuario(
          +this.cookieService.get('usuario_id'),
          this.inicio,
          this.final
        )
        .subscribe({
          next: (res) => {
            this.visitasContacto = res.result;
          },
        });
      this.cargarComentarios();
    } else {
      this.notAllowed = true;
    }
  }

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
            life: 3000,
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
              life: 3000,
            });
          } else {
            this.messageService.add({
              key: 'user',
              severity: 'error',
              summary: 'Error',
              detail:
                'Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.',
              life: 3000,
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
            if (err.status == "404") {
              this.comentarios = null;
            } else {
              this.messageService.add({
                key: 'general',
                severity: 'error',
                summary: 'Error',
                detail:
                  'Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.',
                life: 3000,
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
              life: 3000,
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
              life: 3000,
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
              life: 3000,
            });
            this.loadingComments = false;
          },
        });
    }
  }

  cargarUserEditForm() {
    this.userEditForm.get('nombre')?.setValue(this.usuario.nombre);
    this.userEditForm.get('apellido')?.setValue(this.usuario.apellido);
    this.userEditForm.get('fecha_nacimiento')?.setValue(new Date(this.usuario.fecha_nacimiento));
    this.userEditForm.get('email')?.setValue(this.usuario.email);
    this.userEditForm.get('celular')?.setValue("0" + this.usuario.celular.substring(3));
    this.userEditForm.get('bio')?.setValue(this.usuario.bio);
    this.userEditForm.get('negocio')?.setValue(this.usuario.negocio);
    this.userEditForm.get('fecha_inicio')?.setValue(new Date(this.usuario.fecha_inicio));
    this.userEditForm.get('facebook')?.setValue(this.usuario.facebook);
    this.userEditForm.get('instagram')?.setValue(this.usuario.instagram);
    this.userEditForm.get('twitter')?.setValue(this.usuario.twitter);
    this.userEditForm.get('linkedin')?.setValue(this.usuario.linkedin);
  }

  //TODO: Añadir un CormfirmDialog altes de reestablecer los datos

  //TODO: Sanitizar los datos con espacios y datos vacíos antes de envíar el formulario

  actualizarDatosUsuario() {
    //TODO: Realizar mecanizmo para enviar los datos
  }
}
