import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { settings } from '../../environments/environment';

@Injectable()
export class DirectoryService {
    constructor(private http: Http) {
    }

    public getDirectories(path: string): Observable<DirectoryInfo> {
        return this.http.get(settings.baseApi + '/directories?path=' + path).map((response) => response.json());
    }
}

export interface DirectoryInfo {
    path: string;
    isMapped: boolean;
    isGitDirectory: boolean;
    isRoot: boolean;
    parentPath: string;
    subDirectories: SubDirectoryInfo[];
}

export interface SubDirectoryInfo {
    path: string;
    isMapped: boolean;
    isGitDirectory: boolean;
}
