import { Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NewRepositoryComponent } from '../repository/new-repository.component';
import { DirectDiffComponent } from '../diff/direct-diff.component';
import { DiffService, DirectDiffHunk } from './diff.service';
import { QuestionDialogComponent } from '../dialogs/question/question-dialog.component';

@Injectable()
export class DialogService {

    constructor(public dialog: MdDialog) {

    }

    public showNewRepositoryDialog(): MdDialogRef<NewRepositoryComponent> {
        return this.dialog.open(NewRepositoryComponent, { width: '600px' });
    }

    public showQuestion(question: string): MdDialogRef<QuestionDialogComponent> {
        return this.dialog.open(QuestionDialogComponent, {
            width: '250px',
            data: { question: question }
        });
    }

    public showFileDiff(filePath: string, hunks: DirectDiffHunk[]): MdDialogRef<DirectDiffComponent> {
        return this.dialog.open(DirectDiffComponent, {
            width: "70%",
            data: {
                filePath: filePath,
                hunks: hunks
            }
        });
    }
}
