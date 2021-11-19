import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environments/environment';


const _apiUrl = environment.apiURL;
@Injectable({
  providedIn: 'root'
})

export class ProductosService {


  constructor(private http: HttpClient) { }

  getProductosPopulares() {
    /*return this.http.get(
      `${_apiUrl}/something/${localStorage.getItem('productosPopulares')}`
    ); */
  }
}

