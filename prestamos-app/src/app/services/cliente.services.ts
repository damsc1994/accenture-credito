import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UTIL } from './util';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClienteServices {
    private url: string;

    constructor(private http: HttpClient) {
        this.url = UTIL.apiUrl;
    }

    getCliente(identificacion: string): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this.http.get(this.url + 'cliente/' + identificacion, {headers});
    }

    getClienteToken(identificacion: string): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this.http.get(this.url + 'cliente-token/' + identificacion, {headers});
    }

    addCliente(cliente): Observable<any> {
      const  params = JSON.stringify(cliente);
      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      return this.http.post(this.url + 'clientes/add', params, {headers: headers});
    }

}
