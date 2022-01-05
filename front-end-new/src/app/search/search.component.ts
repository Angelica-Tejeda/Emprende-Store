import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  mediaUrl: string = environment.mediaURL;
  resultados: any = {
    "status": "success",
    "message": "Publicaciones obtenidas con éxito.",
    "result": {
      "count": 11,
      "rows": [
        {
          "id": 7,
          "titulo": "Camisas para perros",
          "descripcion": "Camisetas para perritos cachorros o adultos de todas las razas con diferentes diseños./nSe hacen diseños personalizados",
          "servicio": false,
          "fotos": [
            "/product/2/product-2-7-1639120564508.png",
            "/product/2/product-2-7-1639120575771.png",
            "/product/2/product-2-7-1639120581332.png",
            "/product/2/product-2-7-1639120587137.png"
          ],
          "categoria": [
            null
          ],
          "precio": "10.00",
          "puntuacion": null,
          "descuento": 0,
          "activo": false,
          "creado": "2021-12-09T09:29:16.150Z",
          "modificado": "2021-12-23T00:00:58.362Z",
          "usuario": {
            "id": 2,
            "nombre": "Angélica",
            "apellido": "Tejeda",
            "negocio": null,
            "foto_perfil": "/profile/profile-2.png",
            "celular": "593980672960",
            "facebook": "https://www.facebook.com/o0Sharlotte.Black0o",
            "instagram": "atejeda16",
            "twitter": null,
            "tiktok": null,
            "linkedin": null,
            "activo": false
          }
        },
        {
          "id": 8,
          "titulo": "Collares para mascotas hechos a mano",
          "descripcion": "Collares para perritos y gatitos hechos con materiales reciclables pero resistentes y amigables para la piel y pelaje de tus mascotas./nDiferentes diseños y tamaños.",
          "servicio": false,
          "fotos": [
            "/product/2/product-2-8-1639120693650.png",
            "/product/2/product-2-8-1639120701988.png",
            "/product/2/product-2-8-1639120706530.png",
            "/product/2/product-2-8-1639120710517.png"
          ],
          "categoria": [
            null,
            null,
            null
          ],
          "precio": "5.00",
          "puntuacion": null,
          "descuento": 10,
          "activo": false,
          "creado": "2021-12-09T09:29:16.150Z",
          "modificado": "2021-12-23T00:02:40.019Z",
          "usuario": {
            "id": 2,
            "nombre": "Angélica",
            "apellido": "Tejeda",
            "negocio": null,
            "foto_perfil": "/profile/profile-2.png",
            "celular": "593980672960",
            "facebook": "https://www.facebook.com/o0Sharlotte.Black0o",
            "instagram": "atejeda16",
            "twitter": null,
            "tiktok": null,
            "linkedin": null,
            "activo": false
          }
        },
        {
          "id": 9,
          "titulo": "Paseo de perros - 30 minutos",
          "descripcion": "Se pasean perros de cualquier edad, raza y tamaño. El tiempo del paseo son 30 minutos, ",
          "servicio": true,
          "fotos": [
            "/product/2/product-2-9-1639120804667.png"
          ],
          "categoria": [
            null,
            null
          ],
          "precio": "5.00",
          "puntuacion": null,
          "descuento": 0,
          "activo": true,
          "creado": "2021-12-09T09:29:16.150Z",
          "modificado": "2021-12-23T00:03:34.806Z",
          "usuario": {
            "id": 2,
            "nombre": "Angélica",
            "apellido": "Tejeda",
            "negocio": null,
            "foto_perfil": "/profile/profile-2.png",
            "celular": "593980672960",
            "facebook": "https://www.facebook.com/o0Sharlotte.Black0o",
            "instagram": "atejeda16",
            "twitter": null,
            "tiktok": null,
            "linkedin": null,
            "activo": false
          }
        },
        {
          "id": 11,
          "titulo": "Queso Fresco - 250g",
          "descripcion": "Queso fresco hecho de manera casera, elaborado con leche de alta calidad. Bajo en grasas y delicioso.",
          "servicio": false,
          "fotos": [
            "/product/4/product-4-11-1639122894240.png",
            "/product/4/product-4-11-1639122899419.png",
            "/product/4/product-4-11-1639122903991.png"
          ],
          "categoria": [
            null,
            null
          ],
          "precio": "7.50",
          "puntuacion": "3.3",
          "descuento": 0,
          "activo": true,
          "creado": "2021-12-10T07:21:05.629Z",
          "modificado": "2021-12-23T00:04:25.960Z",
          "usuario": {
            "id": 4,
            "nombre": "Josué",
            "apellido": "Cabezas",
            "negocio": "Negocio Inventado",
            "foto_perfil": "/profile/profile-4.png",
            "celular": "593939139687",
            "facebook": "https://www.facebook.com/josue.cabezas2/",
            "instagram": "josu.cabezas",
            "twitter": "hossujc",
            "tiktok": null,
            "linkedin": "http://www.linkedin.com/in/josu%C3%A9-cabezas-7405b8215",
            "activo": true
          }
        },
        {
          "id": 16,
          "titulo": "Servicio de catering vegetariano",
          "descripcion": "Servicio de catering con productos unicamente vegetarianos, ingredientes de calidad, rico y nutritivo./nEl precio es por persona.",
          "servicio": true,
          "fotos": [
            "/product/4/product-4-16-1639122661302.png",
            "/product/4/product-4-16-1639122669508.png"
          ],
          "categoria": [
            null,
            null
          ],
          "precio": "15.00",
          "puntuacion": null,
          "descuento": 10,
          "activo": true,
          "creado": "2021-12-10T07:21:11.465Z",
          "modificado": "2021-12-23T00:07:01.249Z",
          "usuario": {
            "id": 4,
            "nombre": "Josué",
            "apellido": "Cabezas",
            "negocio": "Negocio Inventado",
            "foto_perfil": "/profile/profile-4.png",
            "celular": "593939139687",
            "facebook": "https://www.facebook.com/josue.cabezas2/",
            "instagram": "josu.cabezas",
            "twitter": "hossujc",
            "tiktok": null,
            "linkedin": "http://www.linkedin.com/in/josu%C3%A9-cabezas-7405b8215",
            "activo": true
          }
        },
        {
          "id": 13,
          "titulo": "Galletas sin gluten",
          "descripcion": "Caja de galletas de chispas de chocolate elaboradas sin gluten.",
          "servicio": false,
          "fotos": [
            "/product/4/product-4-13-1639122340072.png"
          ],
          "categoria": [
            null,
            null,
            null
          ],
          "precio": "8.00",
          "puntuacion": "5.0",
          "descuento": 5,
          "activo": true,
          "creado": "2021-12-10T07:21:08.714Z",
          "modificado": "2021-12-23T00:05:13.198Z",
          "usuario": {
            "id": 4,
            "nombre": "Josué",
            "apellido": "Cabezas",
            "negocio": "Negocio Inventado",
            "foto_perfil": "/profile/profile-4.png",
            "celular": "593939139687",
            "facebook": "https://www.facebook.com/josue.cabezas2/",
            "instagram": "josu.cabezas",
            "twitter": "hossujc",
            "tiktok": null,
            "linkedin": "http://www.linkedin.com/in/josu%C3%A9-cabezas-7405b8215",
            "activo": true
          }
        },
        {
          "id": 12,
          "titulo": "Hamburgesas veganas",
          "descripcion": "Hamburgesas realizadas con ingredientes de origen vegetal.",
          "servicio": false,
          "fotos": [
            "/product/4/product-4-12-1639122778650.png",
            "/product/4/product-4-12-1639122799644.png",
            "/product/4/product-4-12-1639122804447.png"
          ],
          "categoria": [
            null,
            null
          ],
          "precio": "4.50",
          "puntuacion": null,
          "descuento": 0,
          "activo": false,
          "creado": "2021-12-10T07:21:07.927Z",
          "modificado": "2021-12-23T00:05:24.245Z",
          "usuario": {
            "id": 4,
            "nombre": "Josué",
            "apellido": "Cabezas",
            "negocio": "Negocio Inventado",
            "foto_perfil": "/profile/profile-4.png",
            "celular": "593939139687",
            "facebook": "https://www.facebook.com/josue.cabezas2/",
            "instagram": "josu.cabezas",
            "twitter": "hossujc",
            "tiktok": null,
            "linkedin": "http://www.linkedin.com/in/josu%C3%A9-cabezas-7405b8215",
            "activo": true
          }
        },
        {
          "id": 14,
          "titulo": "Ensaladas",
          "descripcion": "Ensaladas de diversos ingredientes, saludables, ricas y nutritivas.",
          "servicio": false,
          "fotos": [
            "/product/4/product-4-14-1639122127578.png",
            "/product/4/product-4-14-1639122134477.png",
            "/product/4/product-4-14-1639122141676.png",
            "/product/4/product-4-14-1639122146597.png",
            "/product/4/product-4-14-1639122151893.png"
          ],
          "categoria": [
            null,
            null,
            null
          ],
          "precio": "4.00",
          "puntuacion": null,
          "descuento": 25,
          "activo": true,
          "creado": "2021-12-10T07:21:09.445Z",
          "modificado": "2021-12-23T00:05:48.578Z",
          "usuario": {
            "id": 4,
            "nombre": "Josué",
            "apellido": "Cabezas",
            "negocio": "Negocio Inventado",
            "foto_perfil": "/profile/profile-4.png",
            "celular": "593939139687",
            "facebook": "https://www.facebook.com/josue.cabezas2/",
            "instagram": "josu.cabezas",
            "twitter": "hossujc",
            "tiktok": null,
            "linkedin": "http://www.linkedin.com/in/josu%C3%A9-cabezas-7405b8215",
            "activo": true
          }
        },
        {
          "id": 6,
          "titulo": "Pulseras artesanales",
          "descripcion": "Pulseras elaboradas a mano con diferentes tipos de piedas preciosas y adornos.",
          "servicio": false,
          "fotos": [
            "/product/2/product-2-6-1639119799342.png",
            "/product/2/product-2-6-1639119808174.png",
            "/product/2/product-2-6-1639119813742.png"
          ],
          "categoria": [
            null
          ],
          "precio": "2.50",
          "puntuacion": null,
          "descuento": 50,
          "activo": true,
          "creado": "2021-12-09T09:29:16.150Z",
          "modificado": "2021-12-23T00:08:06.955Z",
          "usuario": {
            "id": 2,
            "nombre": "Angélica",
            "apellido": "Tejeda",
            "negocio": null,
            "foto_perfil": "/profile/profile-2.png",
            "celular": "593980672960",
            "facebook": "https://www.facebook.com/o0Sharlotte.Black0o",
            "instagram": "atejeda16",
            "twitter": null,
            "tiktok": null,
            "linkedin": null,
            "activo": false
          }
        }
      ]
    }
  }
  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void { }
}
