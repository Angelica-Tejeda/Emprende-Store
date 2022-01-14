import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from './../environments/environment';

const _apiUrl = environment.apiURL + '/movimiento';

@Injectable({
  providedIn: 'root',
})
export class MovimientoService {
  constructor(private http: HttpClient) {}

  createMovimiento(data: any): Observable<any> {
    return this.http.post(`${_apiUrl}`, data, {
      withCredentials: true,
    });
  }

  /*getMovimientosByUser(): Observable<any> {

  }*/

  updateMovimiento(
    userId: number,
    movimId: number,
    data: any
  ): Observable<any> {
    return this.http.patch(`${_apiUrl}/${userId}/${movimId}`, data, {
      withCredentials: true,
    });
  }

  deleteMovimiento(
    userId: number,
    movimId: number
  ): Observable<any> {
    return this.http.delete(`${_apiUrl}/${userId}/${movimId}`, {
      withCredentials: true,
    });
  }
}
