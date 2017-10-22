import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Md5 } from 'md5';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GravatarService {

    private gravatarBaseUri: 'https://www.gravatar.com/avatar/';

    constructor(private http: Http) {
    }

    public getAvatar(email: string): Observable<Response> {
        return this.http.get('https://www.gravatar.com/avatar/' + Md5.hashStr(email.trim().toLowerCase()) + '?s=30');
    }
}
