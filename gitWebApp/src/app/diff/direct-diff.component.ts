import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'direct-diff',
    templateUrl: 'direct-diff.component.html',
    styleUrls: ['direct-diff.component.scss']
})
export class DirectDiffComponent implements OnInit {

    filePath: string;
    constructor(public dialogRef: MdDialogRef<DirectDiffComponent>,
        @Inject(MD_DIALOG_DATA) public data: any) {
        this.filePath = data.filePath;
    }

    closeDialog() {
        this.dialogRef.close();
    }

    ngOnInit() {
    }
}
