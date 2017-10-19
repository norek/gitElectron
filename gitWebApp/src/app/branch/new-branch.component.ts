import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MdDialogRef } from '@angular/material';
import { BranchService } from '../services/branch.service';
import { SystemBusService } from '../services/system-bus.service';

@Component({
    selector: 'new-branch',
    templateUrl: 'new-branch.component.html'
})

export class NewBranchComponent implements OnInit {

    private newBranchName: string;
    private isCreating: boolean;

    constructor(public dialogRef: MdDialogRef<NewBranchComponent>, private systemBus: SystemBusService,
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
