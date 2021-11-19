import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/services/productos.service';
@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  providers: []
})
export class TiendaComponent implements OnInit {

  ProductosPopulares:any;
  constructor(ProductosService:ProductosService) {
    //this.ProductosPopulares= ProductosService.getProductosPopulares();
  }
  ngOnInit(): void {

    
  }

}
