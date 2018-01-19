import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Estacion } from './estacion.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EstacionService {

    private resourceUrl = SERVER_API_URL + 'api/estacions';

    constructor(private http: Http) { }

    create(estacion: Estacion): Observable<Estacion> {
        const copy = this.convert(estacion);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(estacion: Estacion): Observable<Estacion> {
        const copy = this.convert(estacion);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Estacion> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Estacion.
     */
    private convertItemFromServer(json: any): Estacion {
        const entity: Estacion = Object.assign(new Estacion(), json);
        return entity;
    }

    /**
     * Convert a Estacion to a JSON which can be sent to the server.
     */
    private convert(estacion: Estacion): Estacion {
        const copy: Estacion = Object.assign({}, estacion);
        return copy;
    }
}
