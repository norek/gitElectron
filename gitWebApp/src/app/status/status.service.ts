import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { settings } from '../../environments/environment';

@Injectable()
export class StatusService {
    constructor(private http: Http) { }

    public get(): Observable<StatusItem[]> {
        return this.http
            .get(settings.baseApi + '/statuses')
            .map((result) => result.json());
    }

    public stage(file: StatusItem): Observable<Response> {
        return this.http
            .post(settings.baseApi + '/statuses/stage', file);
    }

    public stageAll(): Observable<Response> {
        return this.http
            .post(settings.baseApi + '/statuses/stageAll', {});
    }

    public unstage(file: StatusItem): Observable<Response> {
        return this.http
            .post(settings.baseApi + '/statuses/unstage', file);
    }

    public unstageAll(): Observable<Response> {
        return this.http
            .post(settings.baseApi + '/statuses/unstageAll', {});
    }

    public discardChanges(file: StatusItem): Observable<Response> {
        return this.http
            .post(settings.baseApi + '/statuses/discard', file);
    }
}

export class StatusItem {
    path: string;
    status: FileStatus;
    // prabobly remove, display properties
    name: string;
    color: string;
    icon: string;
}

export enum FileStatus {
    Unaltered = 0,
    NewInIndex = 1,
    ModifiedInIndex = 2,
    DeletedFromIndex = 4,
    RenamedInIndex = 8,
    TypeChangeInIndex = 16,
    NewInWorkdir = 128,
    ModifiedInWorkdir = 256,
    DeletedFromWorkdir = 512,
    TypeChangeInWorkdir = 1024,
    RenamedInWorkdir = 2048,
    Unreadable = 4096,
    Ignored = 16384,
    Conflicted = 32768
}
