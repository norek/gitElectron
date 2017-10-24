import { Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NewRepositoryComponent } from '../repository/new-repository.component';
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
}
