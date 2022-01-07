import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PublicacionService } from 'src/services/publicacion.service';
import { ComentarioService } from 'src/services/comentario.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  mediaUrl: string = environment.mediaURL;
  notFound: boolean = false;
  unexpected: boolean = false;
  owned: boolean = false;
  publId: any;
  product: any;
  comentarios: any = null;
  mensaje: string = '';
  productosVendedor: any = [
    {
      id: 13,
      titulo: 'Galletas sin gluten',
      descripcion:
        'Caja de galletas de chispas de chocolate elaboradas sin gluten.',
      servicio: false,
      fotos: ['/product/4/product-4-13-1639122340072.png'],
      categoria: ['p.Alimentos y comida', 'p.Sin gluten', 'p.Postres'],
      precio: '8.00',
      puntuacion: '5.0',
      descuento: 5,
      activo: true,
      creado: '2021-12-10T07:21:08.714Z',
      modificado: '2021-12-23T00:05:13.198Z',
      usuario: {
        id: 4,
        nombre: 'Josué',
        apellido: 'Cabezas',
        negocio: 'Negocio Inventado',
        foto_perfil: '/profile/profile-4.png',
        celular: '593939139687',
        facebook: 'https://www.facebook.com/josue.cabezas2/',
        instagram: 'josu.cabezas',
        twitter: 'hossujc',
        tiktok: null,
        linkedin: 'http://www.linkedin.com/in/josu%C3%A9-cabezas-7405b8215',
        activo: true,
      },
    },
    {
      id: 14,
      titulo: 'Ensaladas',
      descripcion:
        'Ensaladas de diversos ingredientes, saludables, ricas y nutritivas.',
      servicio: false,
      fotos: [
        '/product/4/product-4-14-1639122127578.png',
        '/product/4/product-4-14-1639122134477.png',
        '/product/4/product-4-14-1639122141676.png',
        '/product/4/product-4-14-1639122146597.png',
        '/product/4/product-4-14-1639122151893.png',
      ],
      categoria: [
        'p.Alimentos y comida',
        'p.Vegetariano',
        'p.Frutas y verduras',
      ],
      precio: '4.00',
      puntuacion: null,
      descuento: 25,
      activo: true,
      creado: '2021-12-10T07:21:09.445Z',
      modificado: '2021-12-23T00:05:48.578Z',
      usuario: {
        id: 4,
        nombre: 'Josué',
        apellido: 'Cabezas',
        negocio: 'Negocio Inventado',
        foto_perfil: '/profile/profile-4.png',
        celular: '593939139687',
        facebook: 'https://www.facebook.com/josue.cabezas2/',
        instagram: 'josu.cabezas',
        twitter: 'hossujc',
        tiktok: null,
        linkedin: 'http://www.linkedin.com/in/josu%C3%A9-cabezas-7405b8215',
        activo: true,
      },
    },
  ];
  productosRelacionados: any = [
    {
      id: 9,
      titulo: 'Paseo de perros - 30 minutos',
      descripcion:
        'Se pasean perros de cualquier edad, raza y tamaño. El tiempo del paseo son 30 minutos, ',
      servicio: true,
      fotos: ['/product/2/product-2-9-1639120804667.png'],
      categoria: ['s.Animales y mascotas', 's.Niñeras y cuidadores'],
      precio: '5.00',
      puntuacion: null,
      descuento: 0,
      activo: true,
      creado: '2021-12-09T09:29:16.150Z',
      modificado: '2021-12-23T00:03:34.806Z',
      usuario: {
        id: 2,
        nombre: 'Angélica',
        apellido: 'Tejeda',
        negocio: null,
        foto_perfil: '/profile/profile-2.png',
        celular: '593980672960',
        facebook: 'https://www.facebook.com/o0Sharlotte.Black0o',
        instagram: 'atejeda16',
        twitter: null,
        tiktok: null,
        linkedin: null,
        activo: true,
      },
    },
    {
      id: 6,
      titulo: 'Pulseras artesanales',
      descripcion:
        'Pulseras elaboradas a mano con diferentes tipos de piedas preciosas y adornos.',
      servicio: false,
      fotos: [
        '/product/2/product-2-6-1639119799342.png',
        '/product/2/product-2-6-1639119808174.png',
        '/product/2/product-2-6-1639119813742.png',
      ],
      categoria: ['p.Artesanías'],
      precio: '2.50',
      puntuacion: null,
      descuento: 50,
      activo: true,
      creado: '2021-12-09T09:29:16.150Z',
      modificado: '2021-12-23T00:08:06.955Z',
      usuario: {
        id: 2,
        nombre: 'Angélica',
        apellido: 'Tejeda',
        negocio: null,
        foto_perfil: '/profile/profile-2.png',
        celular: '593980672960',
        facebook: 'https://www.facebook.com/o0Sharlotte.Black0o',
        instagram: 'atejeda16',
        twitter: null,
        tiktok: null,
        linkedin: null,
        activo: true,
      },
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private publicacionService: PublicacionService,
    private comentarioService: ComentarioService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ publId }) => {
      this.publId = publId;
    });
    if (this.cookieService.check('usuario_id')) {
      this.publicacionService
        .getOwnPublicacionById(
          +this.cookieService.get('usuario_id'),
          this.publId
        )
        .subscribe({
          next: (res) => {
            this.owned = true;
            this.product = res.result;
            this.mensaje =
              'Hola, estoy interesado en tu producto "' +
              this.product.titulo +
              '" que se encuentra publicado en Emprende Store.\nhttp://localhost:4200' +
              this.router.url;
            this.mensaje = encodeURIComponent(this.mensaje);
            this.comentarioService
              .getComentariosByPublicacion(
                this.product.usuario.id,
                this.product.id
              )
              .subscribe({
                next: (res) => {
                  this.comentarios = res.result.rows;
                },
                error: (err) => {},
              });
          },
          error: (err) => {
            if (err.status == '404') {
              this.publicacionService
                .getPublicacionById(this.publId)
                .subscribe({
                  next: (res) => {
                    this.product = res.result;
                    this.mensaje =
                      'Hola, estoy interesado en tu producto "' +
                      this.product.titulo +
                      '" que se encuentra publicado en Emprende Store.\nhttp://localhost:4200' +
                      this.router.url;
                    this.mensaje = encodeURIComponent(this.mensaje);
                    this.comentarioService
                      .getComentariosByPublicacion(
                        this.product.usuario.id,
                        this.product.id
                      )
                      .subscribe({
                        next: (res) => {
                          this.comentarios = res.result.rows;
                        },
                        error: (err) => {},
                      });
                  },
                  error: (err) => {
                    if (err.status == '404') {
                      this.notFound = true;
                    } else {
                      this.unexpected = true;
                    }
                  },
                });
            } else {
              this.unexpected = true;
            }
          },
        });
    } else {
      this.publicacionService.getPublicacionById(this.publId).subscribe({
        next: (res) => {
          this.product = res.result;
          this.mensaje =
            'Hola, estoy interesado en tu producto "' +
            this.product.titulo +
            '" que se encuentra publicado en Emprende Store.\nhttp://localhost:4200' +
            this.router.url;
          this.mensaje = encodeURIComponent(this.mensaje);
          this.comentarioService
            .getComentariosByPublicacion(
              this.product.usuario.id,
              this.product.id
            )
            .subscribe({
              next: (res) => {
                this.comentarios = res.result.rows;
              },
              error: (err) => {},
            });
        },
        error: (err) => {
          if (err.status == '404') {
            this.notFound = true;
          } else {
            this.unexpected = true;
          }
        },
      });
    }
  }
}
