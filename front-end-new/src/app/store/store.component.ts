import { Component, OnInit } from '@angular/core';
import { PublicacionService } from 'src/services/publicacion.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  ProductosPopulares: any;
  constructor(
    publicacionService: PublicacionService,
    ) {}

  ngOnInit(): void {}
}
