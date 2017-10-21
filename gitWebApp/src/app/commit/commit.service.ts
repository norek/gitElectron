import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { settings } from '../../environments/environment';

@Injectable()
export class CommitService {
    constructor(private http: Http) {
    }

    public Create(parameters: CommitParameters): Observable<Response> {
        return this.http.post(settings.baseApi + '/commits', parameters);
    }

    public getAllFromTip(branchName: string): Observable<Commit[]> {
        return this.http.get(settings.baseApi + '/commits/' + branchName).map(res => res.json());
    }
}

export class Commit {
    date: Date;
    message: string;
    sha: string;
    name: string;
}

export class CommitParameters {
    message: string;
}
