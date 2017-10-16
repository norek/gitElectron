import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { settings } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RepositoryOptionsService {

    private repositoryConfiguration: RepositoryConfiguration;

    private configurationLoadedSource = new Subject<RepositoryConfiguration>();

    public configurationLoaded$ = this.configurationLoadedSource.asObservable();

    constructor(private http: Http) {
    }

    public fetchConfiguration(): void {
        this.http.get(settings.baseApi + '/options').map(res => res.json()).subscribe(configuration => {
            this.repositoryConfiguration = configuration;
            this.configurationLoadedSource.next(this.repositoryConfiguration);
        });
    }

    public get configration(): RepositoryConfiguration {

        if (!this.repositoryConfiguration) {
            this.fetchConfiguration();
        }

        return this.repositoryConfiguration;
    }
}

export interface RepositoryConfiguration {
    user: UserInfo;
    currentRepository: string;
}

export interface UserInfo {
    name: string;
    email: string;
}
