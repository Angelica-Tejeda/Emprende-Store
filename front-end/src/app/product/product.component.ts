import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  id: number = 0;
  titulo: string = "Queso 250 gr";
  descripcion: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae venenatis ex. Nulla odio tortor, mattis ac odio ut, varius gravida dui. Aliquam in nisl vitae orci commodo semper ac quis elit. Quisque volutpat dui et cursus eleifend. Aliquam laoreet, elit in pharetra ultrices, sapien magna ultrices diam, non porta tellus odio tempor nisi.";
  servicio: boolean = true;
  fotos: Array<string> = ["https://www.publicdomainpictures.net/pictures/200000/nahled/cheese-1476708601kxS.jpg","https://www.tecnical.com/imagecache/uploads_images_entradas_tecnical-publica-el-seu-primer-blog-sobre-formatges_626x414_c_manchego-bodegon.jpg","https://www.publicdomainpictures.net/pictures/200000/nahled/cheese-1476708601kxS.jpg","https://www.tecnical.com/imagecache/uploads_images_entradas_tecnical-publica-el-seu-primer-blog-sobre-formatges_626x414_c_manchego-bodegon.jpg","https://www.publicdomainpictures.net/pictures/200000/nahled/cheese-1476708601kxS.jpg","https://www.tecnical.com/imagecache/uploads_images_entradas_tecnical-publica-el-seu-primer-blog-sobre-formatges_626x414_c_manchego-bodegon.jpg"];
  categorias: Array<string> = [];
  precio: number = 0;
  puntuacion: number = 0;
  activo: boolean = true;
  creado: any;
  modificado: any;
  owner: any;

  constructor(private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
  }
  
}
