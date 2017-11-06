import { Component, OnInit } from '@angular/core';
import { MappedRepository, RepositoryConfiguration, SystemOptionsService } from '../services/system-options.service';
import { SystemOptionsStore } from '../store/system-options.store';
import { SystemBusService } from '../services/system-bus.service';
import { DialogService } from '../dialogs/dialog.service';
import { MdDialog } from '@angular/material';
import { RepositoryConfigurationComponent } from '../repository/configuration/repository-configuration.component';
import { BranchService } from '../services/branch.service';
import { NotificationService } from '../services/notification.service';
import { RemoteBranchAssignmentComponent } from '../branch/remote/remote-branch-assignment.component';
import { RepositoryService } from '../services/repository.service';

@Component({
    selector: 'header-toolbar',
    templateUrl: 'header-toolbar.component.html',
    styleUrls: ['header-toolbar.component.scss']
})

export class HeaderToolbarComponent implements OnInit {

    private isPushing: boolean;
    private isFetching: boolean;
    private isPulling: boolean;

    constructor(public dialog: MdDialog, private dialogService: DialogService, private systemOptionsStore: SystemOptionsStore,
        private systemServiceBus: SystemBusService, private branchService: BranchService,
        private notificationService: NotificationService, private repositoryService: RepositoryService) {
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

    fetch(): void {
        this.isFetching = true;
        this.repositoryService.fetch()
            .finally(() => this.isFetching = false)
            .subscribe(() => this.notificationService.success('success', 'fetch'),
            (error) => this.notificationService.error(error, 'fetch'));
    }

    pull(): void {
        this.isPulling = true;
        this.repositoryService.pull()
            .finally(() => this.isPulling = false)
            .subscribe(() => this.notificationService.success('success', 'pull'),
            (error) => this.notificationService.error(error, 'pull'));
    }

    private makePush(): void {
        this.isPushing = true;
        this.branchService.push(this.systemOptionsStore.currentBranchName)
            .finally(() => this.isFetching = false)
            .subscribe(() => this.notificationService.success('push', 'push completed'),
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
