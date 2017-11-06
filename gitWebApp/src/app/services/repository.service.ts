import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { settings } from '../../environments/environment';


@Injectable()
export class RepositoryService {
    constructor(private http: Http) { }

    public fetch(): Observable<Response> {
        return this.http.post(settings.baseApi + '/repository/fetch', {});
    }

    public pull(): Observable<Response> {
        return this.http.post(settings.baseApi + '/repository/pull', {});
    }
}
