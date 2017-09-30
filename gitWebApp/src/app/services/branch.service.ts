import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { settings } from '../../environments/environment';

@Injectable()
export class BranchService {
    constructor(private http: Http) {
    }

    public GetAll(): Observable<Branch[]> {
        return this.http.get(settings.baseApi + '/branches').map((result) => result.json());
    }
}

export class Branch {
    name: string;
}

