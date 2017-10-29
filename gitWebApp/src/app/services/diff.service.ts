import { Injectable, Injector } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { settings } from '../../environments/environment';
import { MdDialog } from '@angular/material';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { DialogService } from '../dialogs/dialog.service';

@Injectable()
export class DiffService {

    constructor(private http: Http,
        private injector: Injector,
        private dialogService: DialogService) {
    }

    public showDiff(filePath: string) {
        this.getDiff(filePath)
            .subscribe((res: DirectDiffHunk[]) => {
                const ref = this.dialogService.showFileDiff(filePath, res);
            });
    }

    public getDiff(filePath: string): Observable<DirectDiffHunk[]> {
        return this.http.get(settings.baseApi + '/diff/direct', {
            params: {
                path: filePath
            }
        }).map(res => res.json().hunks);
    }
}

export class DirectDiffHunk {
    header: HunkHeader;
    linesBefore: DirectDiffLine[];
    linesAfter: DirectDiffLine[];
}

export class DirectDiffLine {
    content: string;
    type: string;
    lineNumber: number;
}

export class HunkHeader {
    rawHeader: string;
    before: HunkDiffInfo;
    after: HunkDiffInfo;
}

export class HunkDiffInfo {
    startingLineNumber: number;
    numberOfLines: number;
}
