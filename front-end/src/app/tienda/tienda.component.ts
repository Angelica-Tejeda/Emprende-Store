import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/services/productos.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  providers: [NgbCarouselConfig]
})
export class TiendaComponent implements OnInit {
  fotos: Array<string> = ["https://www.publicdomainpictures.net/pictures/200000/nahled/cheese-1476708601kxS.jpg","https://www.tecnical.com/imagecache/uploads_images_entradas_tecnical-publica-el-seu-primer-blog-sobre-formatges_626x414_c_manchego-bodegon.jpg","https://www.publicdomainpictures.net/pictures/200000/nahled/cheese-1476708601kxS.jpg","https://www.tecnical.com/imagecache/uploads_images_entradas_tecnical-publica-el-seu-primer-blog-sobre-formatges_626x414_c_manchego-bodegon.jpg","https://www.publicdomainpictures.net/pictures/200000/nahled/cheese-1476708601kxS.jpg","https://www.tecnical.com/imagecache/uploads_images_entradas_tecnical-publica-el-seu-primer-blog-sobre-formatges_626x414_c_manchego-bodegon.jpg"];
  ProductosPopulares:any;
  constructor(ProductosService:ProductosService,config: NgbCarouselConfig) {
    //this.ProductosPopulares= ProductosService.getProductosPopulares();
  }
  ngOnInit(): void {

    
  }

}
