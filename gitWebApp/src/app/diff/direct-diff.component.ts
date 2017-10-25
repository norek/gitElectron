import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { DirectDiffHunk } from '../services/diff.service';

@Component({
    selector: 'direct-diff',
    templateUrl: 'direct-diff.component.html',
    styleUrls: ['direct-diff.component.scss']
})
export class DirectDiffComponent implements OnInit {
    filePath: string;
    hunks: DirectDiffHunk[];
    
    constructor(public dialogRef: MdDialogRef<DirectDiffComponent>,
        @Inject(MD_DIALOG_DATA) public data: any) {
        this.filePath = data.filePath;
        this.hunks = data.hunks;
    }

    closeDialog() {
        this.dialogRef.close();
    }

    ngOnInit() {
    }
}
