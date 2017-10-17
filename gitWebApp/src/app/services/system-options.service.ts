import { Injectable, Injector } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { settings } from '../../environments/environment';
import { MdDialog } from '@angular/material';

@Injectable()
export class SystemOptionsService {

    private systemCOnfiguration: SystemConfiguration;
    public dialog: MdDialog;
    constructor(private http: Http, injector: Injector) {
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
    isFirstUsage: boolean;
}

export interface MappedRepository {
    path: string;
    isCurrent: boolean;
}
