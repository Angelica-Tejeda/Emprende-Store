import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from 'src/services/usuario.service';
import { PublicacionService } from 'src/services/publicacion.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  mediaUrl: string = environment.mediaURL;
  notFound: boolean = false;
  owned: boolean = false;
  publId: any;
  product: any;
  responsiveOptions: any[] = [
    {
      breakpoint: '1200px',
      numVisible: 5,
    },
    {
      breakpoint: '992px',
      numVisible: 4,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '576px',
      numVisible: 2,
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private usuarioService: UsuarioService,
    private publicacionService: PublicacionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ publId }) => {
      this.publId = publId;
    });
    if (this.cookieService.check('usuario_id')) {
      //TODO: comprobar si el usuario esta loggeado y es el mismo del producto.
    } else {
      this.publicacionService.getPublicacionById(this.publId).subscribe({
        next: (res) => {
          this.product = res.result;
        },
        error: (err) => {
          if ((err.status = '404')) {
            this.notFound = true;
          } else {
            //TODO: mostrar mensaje de error, cuando no se trata de error 404.
          }
        },
      });
    }
  }
}
