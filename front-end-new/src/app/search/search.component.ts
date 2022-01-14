import { Component, OnInit } from '@angular/core';
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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private publicacionService: PublicacionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ busqueda }) => {
      this.busqueda = decodeURIComponent(busqueda);
    });
    this.publicacionService.getPublicacionesBySearch(this.busqueda).subscribe({
      next: (res) => {
        this.resultados = res.result.rows;
      },
      error: (err) => {
        //TODO: mostrar mensaje de productos no encontrados
      },
    });
  }
}
