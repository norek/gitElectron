import { Component, OnInit } from '@angular/core';
import { MappedRepository, RepositoryConfiguration } from '../services/system-options.service';
import { SystemOptionsStore } from '../store/system-options.store';
import { SystemBusService } from '../services/system-bus.service';
import { DialogService } from '../dialogs/dialog.service';
import { MdDialog } from '@angular/material';
import { RepositoryConfigurationComponent } from '../repository/configuration/repository-configuration.component';
import { BranchService } from '../services/branch.service';
import { NotificationService } from '../services/notification.service';
import { RemoteBranchAssignmentComponent } from '../branch/remote/remote-branch-assignment.component';

@Component({
    selector: 'header-toolbar',
    templateUrl: 'header-toolbar.component.html',
    styleUrls: ['header-toolbar.component.scss']
})

export class HeaderToolbarComponent implements OnInit {

    private isPushing: boolean;

    constructor(public dialog: MdDialog, private dialogService: DialogService, private systemOptionsStore: SystemOptionsStore,
        private systemServiceBus: SystemBusService, private branchService: BranchService,
        private notificationService: NotificationService) {
        this.systemServiceBus.emptyEnviromentLoaded$.subscribe(() => this.mapNewRepository());
    }

    ngOnInit() {
    }

    mapNewRepository(): void {
        this.dialogService.showNewRepositoryDialog()
            .afterClosed()
            .subscribe(() => this.systemOptionsStore.fetchSystemConfiguration());
    }

    switchToSelectedRepository(repository: MappedRepository): void {
        this.systemOptionsStore.switchCurrentRepositoryTo(repository.path);
    }

    showRepositoryConfiguration(): void {
        this.dialog.open(RepositoryConfigurationComponent, { width: ' 500px', height: '500px' });
    }

    push(): void {
        if (this.systemOptionsStore.currentBranch.isTracking) {
            this.makePush();
        } else {
            this.dialog.open(RemoteBranchAssignmentComponent, { width: ' 500px', height: '500px' })
                .afterClosed().subscribe((result) => {
                    if (result.success) {
                        this.makePush();
                    }
                });
        }
    }

    private makePush(): void {
        this.isPushing = true;
        this.branchService.push(this.systemOptionsStore.currentBranchName)
            .subscribe(() => {
                this.isPushing = false;
                this.notificationService.success('push', 'push completed');
            },
            (error) => this.notificationService.error(error, 'push'));
    }

    private get repository(): RepositoryConfiguration {
        return this.systemOptionsStore.currentRepository;
    }

    private get currentRepository(): string {
        return this.repository.currentRepository;
    }

    private get userName(): string {
        return this.systemOptionsStore.repositoryUser.name;
    }

    private get getMappedRepositories(): MappedRepository[] {
        return this.systemOptionsStore.mappedRepositories;
    }
}
