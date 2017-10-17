import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewRepositoryComponent } from '../repository/new-repository.component';
import { MappedRepository } from '../services/system-options.service';
import { SystemOptionsStore } from '../store/system-options.store';
import { RepositoryConfiguration } from '../services/repository-options.service';

@Component({
    selector: 'header-toolbar',
    templateUrl: 'header-toolbar.component.html',
    styleUrls: ['header-toolbar.component.scss']
})

export class HeaderToolbarComponent implements OnInit {

    private avatarUrl: string;
    private avatarExists: boolean;

    constructor(public dialog: MdDialog, private systemOptionsStore: SystemOptionsStore) {
    }

    ngOnInit() {
        this.systemOptionsStore.fetchSystemConfiguration();
    }

    mapNewRepository(): void {
        this.dialog.open(NewRepositoryComponent, { width: '600px' })
            .afterClosed().subscribe(() => this.systemOptionsStore.fetchSystemConfiguration());
    }

    switchToSelectedRepository(repository: MappedRepository): void {
        this.systemOptionsStore.switchCurrentRepositoryTo(repository.path);
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
