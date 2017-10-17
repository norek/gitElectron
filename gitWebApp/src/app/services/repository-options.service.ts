import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { settings } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RepositoryOptionsService {

    constructor(private http: Http) {
    }

    public fetchConfiguration(): Observable<RepositoryConfiguration> {
        return this.http.get(settings.baseApi + '/options').map(res => res.json());
    }
}

export interface RepositoryConfiguration {
    user: UserInfo;
    currentRepository: string;
}

export interface UserInfo {
    name: string;
    email: string;
    hasAvatar: boolean;
    avatarUrl: string;
}
