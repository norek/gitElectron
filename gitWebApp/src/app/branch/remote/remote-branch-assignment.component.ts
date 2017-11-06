import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { BranchService } from '../../services/branch.service';
import { SystemOptionsStore } from '../../store/system-options.store';

@Component({
    selector: 'remote-branch-assignment',
    templateUrl: 'remote-branch-assignment.component.html'
})

export class RemoteBranchAssignmentComponent implements OnInit {

    private remoteName = 'origin';
    private branchName: string;

    constructor(public dialogRef: MdDialogRef<RemoteBranchAssignmentComponent>, private systemStore: SystemOptionsStore,
        private branchService: BranchService) {
    }

    ngOnInit(): void {
        this.branchName = this.systemStore.currentBranchName;
    }

    onSubmit(): void {
        this.branchService.assignRemote(this.branchName, this.remoteName)
            .subscribe(() => this.dialogRef.close({ success: true }));
    }

    onCancel(): void {
        this.dialogRef.close({ success: false });
    }
}
