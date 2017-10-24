import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'question-dialog',
    templateUrl: 'question-dialog.component.html',
    styleUrls: ['question-dialog.component.scss']
})

export class QuestionDialogComponent {

    constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<QuestionDialogComponent>) {

    }

    private onCancelClick(): void {
        this.dialogRef.close({ confirmed: false });
    }

    private onConfirmClick(): void {
        this.dialogRef.close({ confirmed: true });
    }
}
