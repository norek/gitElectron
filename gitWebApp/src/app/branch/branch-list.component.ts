import { Component, OnInit } from '@angular/core';
import { Branch, BranchService } from '../services/branch.service';
import { MdDialog } from '@angular/material';
import { NewBranchComponent } from './new-branch.component';
import { NotificationService } from '../services/notification.service';
import { SystemBusService } from '../services/system-bus.service';

@Component({
    selector: 'branch-list',
    templateUrl: 'branch-list.component.html',
    styleUrls: ['branch-list.component.scss']
})

export class BranchListComponent implements OnInit {

    private branchList: Branch[] = [];
    private localBranchList: Branch[] = [];
    private remoteBranchList: Branch[] = [];
    private isCheckoutingInternal: boolean;
    private checkoutedBranchName: string;

    constructor(public dialog: MdDialog, private branchService: BranchService, private systemBus: SystemBusService,
        private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.systemBus.branchCompleted$.subscribe((branchName) => this.loadBranchList());
        this.systemBus.repositoryChanged$.subscribe((branchName) => this.loadBranchList());
        this.systemBus.fetchCompletedSource$.subscribe((branchName) => this.loadBranchList());
        this.systemBus.pullCompletedSource$.subscribe((branchName) => this.loadBranchList());

        this.loadBranchList();
    }

    private loadBranchList(): void {
        this.branchService.getAll().subscribe((branchList) => {
            this.branchList = branchList;
            this.localBranchList = this.branchList.filter(branch => !branch.isRemote);
            this.remoteBranchList = this.branchList.filter(branch => branch.isRemote);

            this.remoteBranchList.forEach(remoteBranch => remoteBranch.isTrackedByLocal = this.isTrackedByLocal(remoteBranch));
        });
    }

    private createNew(): void {
        const dialogRef = this.dialog.open(NewBranchComponent);
    }

    private checkout(name: string): void {
        this.checkoutedBranchName = name;
        this.isCheckoutingInternal = true;
        this.branchService.checkout(name)
            .finally(() => this.isCheckoutingInternal = false)
            .subscribe(
            () => {
                this.systemBus.branchCheckoutCompleted(name);
                this.notificationService.success('checkout', 'checkout completed');

                this.loadBranchList();
            }, (error) => {
                this.notificationService.error(error, 'checkout operation');
            });
    }

    private isCheckouting(name: string): boolean {
        return this.isCheckoutingInternal && this.checkoutedBranchName === name;
    }

    private isTrackedByLocal(remote: Branch): boolean {
        const localTracking = this.localBranchList.filter(branch => branch.isTracking
            && branch.trackingDetails.cannonicalName === remote.cannonicalName);
        return localTracking && localTracking.length > 0;
    }
}
