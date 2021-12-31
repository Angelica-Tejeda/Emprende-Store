import { Component, OnInit } from '@angular/core';
import { PublicacionService } from 'src/services/publicacion.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  providers: [NgbCarouselConfig]
})
export class StoreComponent implements OnInit {
  fotos: Array<string> = [
    'https://www.publicdomainpictures.net/pictures/200000/nahled/cheese-1476708601kxS.jpg',
    'https://www.tecnical.com/imagecache/uploads_images_entradas_tecnical-publica-el-seu-primer-blog-sobre-formatges_626x414_c_manchego-bodegon.jpg',
    'https://www.publicdomainpictures.net/pictures/200000/nahled/cheese-1476708601kxS.jpg',
    'https://www.tecnical.com/imagecache/uploads_images_entradas_tecnical-publica-el-seu-primer-blog-sobre-formatges_626x414_c_manchego-bodegon.jpg',
    'https://www.publicdomainpictures.net/pictures/200000/nahled/cheese-1476708601kxS.jpg',
    'https://www.tecnical.com/imagecache/uploads_images_entradas_tecnical-publica-el-seu-primer-blog-sobre-formatges_626x414_c_manchego-bodegon.jpg',
  ];
  ProductosPopulares: any;
  constructor(publicacionService: PublicacionService, config: NgbCarouselConfig) {
    //this.ProductosPopulares= PulicacionService.getProductosPopulares();
  }

  ngOnInit(): void {}
}
