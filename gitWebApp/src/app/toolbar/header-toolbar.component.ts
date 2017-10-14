import { Component, OnInit } from '@angular/core';
import { RepositoryOptionsService, RepositoryConfiguration } from '../services/repository-options.service';
import { GravatarService } from '../services/external/gravatar.service';

@Component({
    selector: 'header-toolbar',
    templateUrl: 'header-toolbar.component.html',
    styleUrls: ['header-toolbar.component.scss']
})

export class HeaderToolbarComponent implements OnInit {
    private avatarUrl: string;
    private avatarExists: boolean;

    private mappedRepositories: string[] = ['repository 1', 'repository2'];

    private repositoryConfiguration: RepositoryConfiguration;

    constructor(private repositoryOptionsService: RepositoryOptionsService, private gravatarService: GravatarService) {
    }

    ngOnInit() {
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
        alert('xD');
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

    private get getMappedRepositories(): string[] {
        return this.mappedRepositories;
    }
}
