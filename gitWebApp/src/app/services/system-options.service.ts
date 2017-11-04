import { Injectable, Injector } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { settings } from '../../environments/environment';
import { MdDialog } from '@angular/material';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SystemOptionsService {

    constructor(private http: Http, injector: Injector) {
    }

    public getCurrentRepositoryConfiguration(): Observable<RepositoryConfiguration> {
        return this.http.get(settings.baseApi + '/options').map(res => res.json());
    }

    public getRepositoryRemotes(): Observable<Remote[]> {
        return this.http.get(settings.baseApi + '/options/remotes').map(res => res.json());
    }

    public addRemote(remote: Remote): Observable<Response> {
        return this.http.post(settings.baseApi + '/options/remotes', remote);
    }

    public removeRemote(remoteName: string): Observable<Response> {
        return this.http.delete(settings.baseApi + '/options/remotes/' + remoteName);
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

export interface RepositoryConfiguration {
    user: UserInfo;
    currentRepository: string;
    currentBranch: string;
}

export interface UserInfo {
    name: string;
    email: string;
    hasAvatar: boolean;
    avatarUrl: string;
}

export interface Remote {
    name: string;
    url: string;
}
