import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Tren } from './tren.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TrenService {

    private resourceUrl = SERVER_API_URL + 'api/trens';

    constructor(private http: Http) { }

    create(tren: Tren): Observable<Tren> {
        const copy = this.convert(tren);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tren: Tren): Observable<Tren> {
        const copy = this.convert(tren);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tren> {
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
     * Convert a returned JSON object to Tren.
     */
    private convertItemFromServer(json: any): Tren {
        const entity: Tren = Object.assign(new Tren(), json);
        return entity;
    }

    /**
     * Convert a Tren to a JSON which can be sent to the server.
     */
    private convert(tren: Tren): Tren {
        const copy: Tren = Object.assign({}, tren);
        return copy;
    }
}
