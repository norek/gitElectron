import { Component, OnInit } from '@angular/core';
import { MappedRepository, RepositoryConfiguration } from '../services/system-options.service';
import { SystemOptionsStore } from '../store/system-options.store';
import { SystemBusService } from '../services/system-bus.service';
import { DialogService } from '../dialogs/dialog.service';
import { MdDialog } from '@angular/material';
import { RepositoryConfigurationComponent } from '../repository/configuration/repository-configuration.component';

@Component({
    selector: 'header-toolbar',
    templateUrl: 'header-toolbar.component.html',
    styleUrls: ['header-toolbar.component.scss']
})

export class HeaderToolbarComponent implements OnInit {

    constructor(public dialog: MdDialog, private dialogService: DialogService, private systemOptionsStore: SystemOptionsStore,
        private systemServiceBus: SystemBusService) {
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
