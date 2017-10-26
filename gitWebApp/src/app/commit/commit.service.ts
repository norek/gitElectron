import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { settings } from '../../environments/environment';
import { CommitChangeType } from './details/commit-change-type.enum';

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

    public getDetails(sha: string): Observable<CommitDetails> {
        return this.http.get(settings.baseApi + '/commits/' + sha + '/details/').map(res => res.json());
    }
}

export class CommitDetails {
    sha: string;
    message: string;
    date: Date;
    author: string;
    changes: CommitChanges[];
}

class CommitChanges {
    type: CommitChangeType;
    path: string;
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
