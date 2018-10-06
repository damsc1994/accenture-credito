import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UTIL } from './util';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SolicitudesServices {
    private url: string;

    constructor(private http: HttpClient) {
        this.url = UTIL.apiUrl;
    }

    getSolicitudes(identificacion: string): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this.http.get(this.url + 'solicitud/' + identificacion, {headers});
    }

    addSolicitud(solicitud, token: string): Observable<any> {
        const  body = JSON.stringify(solicitud);
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                         .set('authorization', token);

        return this.http.post(this.url + 'solicitud/add', body, {headers});
    }

}
