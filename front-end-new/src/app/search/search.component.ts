import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicacionService } from 'src/services/publicacion.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  mediaUrl: string = environment.mediaURL;
  busqueda: string = '';
  resultados: any = null;
  showSearchFilters: boolean = false;
  searchFilterForm: FormGroup = new FormGroup(
    {
      tipo: new FormControl(null),
      categoria: new FormControl(false),
      descuento: new FormControl(false),
      campo: new FormControl('puntuacion'),
      orden: new FormControl('DESC'),
    }
  );
  searchFilterType: any = [
    { label: 'Productos', value: false },
    { label: 'Todos', value: null },
    { label: 'Servicios', value: true },
  ];
  searchFilterDiscount: any = [
    {}
  ]
  searchFilterCategory: any = [
    { label: 'Todas las categorias', value: false },
  ]
  searchFilterCategoryProducts: any = [
    { label: 'Todas las categorias', value: false },
    { label: 'prod1', value: 'categ1' },
    { label: 'prod2', value: 'categ2' },
    { label: 'prod3', value: 'categ3' },
  ]
  searchFilterCategoryServices: any = [
    { label: 'Todas las categorias', value: false },
    { label: 'serv1', value: 'categ1' },
    { label: 'serv2', value: 'categ2' },
    { label: 'serv3', value: 'categ3' },
  ]
  searchFilterCampo: any = [
    { label: 'Relevancia', value: 'puntuacion' },
    { label: 'Precio', value: 'precio' },
    { label: 'Descuento', value: 'descuento' },
  ];
  searchFilterOrder: any = [
    { label: 'Ascendente', value: 'ASC' },
    { label: 'Descendente', value: 'DESC' },
  ];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private publicacionService: PublicacionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ busqueda }) => {
      this.busqueda = decodeURIComponent(busqueda);
    });
    //TODO: Poner funcionalidad a los filtros de búsqueda
    this.publicacionService.getPublicacionesBySearch(this.busqueda).subscribe({
      next: (res) => {
        this.resultados = res.result;
      },
      error: (err) => {
        //TODO: mostrar mensaje de productos no encontrados
      },
    });
  }
}
