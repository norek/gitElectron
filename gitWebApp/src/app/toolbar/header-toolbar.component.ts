import { Component, OnInit } from '@angular/core';
import { RepositoryOptionsService, RepositoryConfiguration } from '../services/repository-options.service';
import { GravatarService } from '../services/external/gravatar.service';
import { MdDialog } from '@angular/material';
import { NewRepositoryComponent } from '../repository/new-repository.component';
import { SystemOptionsService, MappedRepository } from '../services/system-options.service';
import { CommitBusService } from '../services/commit.bus.service';

@Component({
    selector: 'header-toolbar',
    templateUrl: 'header-toolbar.component.html',
    styleUrls: ['header-toolbar.component.scss']
})

export class HeaderToolbarComponent implements OnInit {
    private avatarUrl: string;
    private avatarExists: boolean;

    private mappedRepositories: MappedRepository[];

    private repositoryConfiguration: RepositoryConfiguration;

    constructor(public dialog: MdDialog,
        private repositoryOptionsService: RepositoryOptionsService, private gravatarService: GravatarService,
        private systemConfigurationService: SystemOptionsService, private systemBus: CommitBusService) {

        systemBus.repositoryChanged$.subscribe((branchName) => this.repositoryOptionsService.fetChConfiguration());

    }

    ngOnInit() {

        this.systemConfigurationService.getSystemConfiguration()
            .subscribe(configuration => this.mappedRepositories = configuration.mappedRepositories);

        this.repositoryOptionsService.configration.subscribe(configuration => {
            this.repositoryConfiguration = configuration;

            if (configuration.user.email && configuration.user.email !== '') {
                this.gravatarService.getAvatar(configuration.user.email).subscribe(result => {
                    if (result.status === 200) {
                        this.avatarExists = true;
                        this.avatarUrl = result.url;
                    } else {
                        this.avatarExists = false;
                    }
                });
            }
        });
    }

    mapNewRepository(): void {
        this.dialog.open(NewRepositoryComponent, {
            width: '600px',
        });
    }

    switchToSelectedRepository(repository: MappedRepository): void {
        this.systemConfigurationService.switchToRepository(repository.path)
            .subscribe(result => this.systemBus.repositoryChanged());
    }

    private get currentRepository(): string {
        if (this.repositoryConfiguration) {
            return this.repositoryConfiguration.currentRepository;
        }

        return '';
    }

    private get userName(): string {
        if (this.repositoryConfiguration) {
            return this.repositoryConfiguration.user.name;
        }

        return '';
    }

    private get getMappedRepositories(): MappedRepository[] {
        return this.mappedRepositories;
    }
}
