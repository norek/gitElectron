import { Component, OnInit } from '@angular/core';
import { Branch, BranchService } from '../services/branch.service';
import { MdDialog } from '@angular/material';
import { NewBranchComponent } from './new-branch.component';
import { CommitBusService } from '../services/commit.bus.service';

@Component({
    selector: 'branch-list',
    templateUrl: 'branch-list.component.html'
})

export class BranchListComponent implements OnInit {

    private branchList: Branch[] = [];

    constructor(public dialog: MdDialog, private branchService: BranchService, private systemBus: CommitBusService) {
        this.systemBus.branchCompleted$.subscribe((branchName) => this.loadBranchList());
    }

    ngOnInit() {
        this.loadBranchList();
    }

    private loadBranchList(): void {
        this.branchService.getAll().subscribe((branchList) => this.branchList = branchList);
    }

    private createNew(): void {
        const dialogRef = this.dialog.open(NewBranchComponent);
    }

    private checkout(name: string): void {
        this.branchService.checkout(name).subscribe(() => this.loadBranchList());
    }
}
