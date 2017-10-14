import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { settings } from '../../environments/environment';

@Injectable()
export class RepositoryOptionsService {

    private repositoryConfiguration: Observable<RepositoryConfiguration>;

    constructor(private http: Http) {
    }

    public fetChConfiguration(): void {
        this.repositoryConfiguration = this.http.get(settings.baseApi + '/options').map(res => res.json());
    }

    public get configration(): Observable<RepositoryConfiguration> {

        if (!this.repositoryConfiguration) {
            this.fetChConfiguration();
        }

        return this.repositoryConfiguration;
    }
}

interface RepositoryConfiguration {
    user: UserInfo;
}

interface UserInfo {
    name: string;
    email: string;
}
