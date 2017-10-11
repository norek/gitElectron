import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MdDialogRef } from '@angular/material';
import { CommitBusService } from '../services/commit.bus.service';
import { BranchService } from '../services/branch.service';

@Component({
    selector: 'new-branch',
    templateUrl: 'new-branch.component.html'
})

export class NewBranchComponent implements OnInit {

    private newBranchName: string;
    private isCreating: boolean;

    constructor(public dialogRef: MdDialogRef<NewBranchComponent>, private systemBus: CommitBusService,
        private branchService: BranchService) { }

    ngOnInit() { }

    onSubmit(): void {
        this.branchService.create(this.newBranchName)
            .subscribe((result) => {
                this.systemBus.branchCompleted(this.newBranchName);
                this.closeDialog();

            }, (error) => console.log(error));
    }

    closeDialog(): void {
        this.dialogRef.close();
    }
}
