import { Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NewRepositoryComponent } from '../repository/new-repository.component';
import { DirectDiffComponent } from '../diff/direct-diff.component';
import { DiffService, DirectDiffHunk } from './diff.service';

@Injectable()
export class DialogService {

    constructor(public dialog: MdDialog) {

    }

    public showNewRepositoryDialog(): MdDialogRef<NewRepositoryComponent> {
        return this.dialog.open(NewRepositoryComponent, { width: '600px' });
    }

    public showFileDiff(filePath: string, hunks: DirectDiffHunk[]): MdDialogRef<DirectDiffComponent> {
        return this.dialog.open(DirectDiffComponent, {
            data: {
                filePath: filePath,
                hunks: hunks
            }
        });
    }
}
