import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { settings } from '../../environments/environment';

@Injectable()
export class SystemOptionsService {
    constructor(private http: Http) {
    }

    public getSystemConfiguration(): Observable<SystemConfiguration> {
        return this.http.get(settings.baseApi + '/options/system').map(response => response.json());
    }

    public mapRepository(repositoryPath: string): Observable<Response> {
        return this.http.post(settings.baseApi + '/options/system/mappedRepositories', { repositoryToMap: repositoryPath });
    }

    public switchToRepository(repositoryPath: string): Observable<Response> {
        return this.http.post(settings.baseApi + '/options/system/switchRepository', { newCurrentRepository: repositoryPath });
    }
}

export interface SystemConfiguration {
    mappedRepositories: MappedRepository[];
}

export interface MappedRepository {
    path: string;
    isCurrent: boolean;
}
