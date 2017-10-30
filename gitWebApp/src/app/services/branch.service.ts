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

    public getAll(): Observable<Branch[]> {
        return this.http.get(settings.baseApi + '/branches').map((result) => result.json());
    }

    public create(name: String): Observable<Response> {
        return this.http.post(settings.baseApi + '/branches/' + name, {});
    }

    public checkout(name: string): Observable<Response> {
        return this.http
            .post(settings.baseApi + '/branches/' + name + '/checkout', {})
            .map((res) => res.text() ? res.json() : {});
    }
}

export class Branch {
    cannonicalName: string;
    name: string;
    isRemote: boolean;
    isTracking: boolean;
    isHead: boolean;
    trackingDetails: TrackingDetails;
    isTrackedByLocal: boolean;
}

export class TrackingDetails {
    aheadBy: number
    behindBy: number
    cannonicalName: string
}

