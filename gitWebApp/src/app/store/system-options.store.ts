import { Injectable } from '@angular/core';
import { SystemOptionsService, SystemConfiguration, MappedRepository } from '../services/system-options.service';
import { Observable } from 'rxjs/Observable';
import { CommitBusService } from '../services/commit.bus.service';
import { RepositoryOptionsService, RepositoryConfiguration, UserInfo } from '../services/repository-options.service';
import { GravatarService } from '../services/external/gravatar.service';

@Injectable()
export class SystemOptionsStore {

    private _currentRepository: RepositoryConfiguration = {
        currentRepository: '',
        user: { email: '', name: '', avatarUrl: '', hasAvatar: false }
    };

    private _systemConfiguration: SystemConfiguration = { mappedRepositories: [] };

    constructor(private optionsService: SystemOptionsService, private currentRepositoryConfiguration: RepositoryOptionsService,
        private systemServiceBus: CommitBusService, private gravatarService: GravatarService) {

    }

    public fetchSystemConfiguration() {
        this.optionsService.getSystemConfiguration()
            .subscribe(configuration => {
                this._systemConfiguration = configuration;
                this.getCurrentRepositoryInfo();
            });
    }

    public switchCurrentRepositoryTo(repositoryPath: string) {
        this.optionsService.switchToRepository(repositoryPath)
            .subscribe(result => {
                this.getCurrentRepositoryInfo();
            });
    }

    public get systemConfiguration(): SystemConfiguration {
        return this._systemConfiguration;
    }

    public get mappedRepositories(): MappedRepository[] {
        return this._systemConfiguration.mappedRepositories;
    }

    public get currentRepository(): RepositoryConfiguration {
        return this._currentRepository;
    }

    public get repositoryUser(): UserInfo {
        return this._currentRepository.user;
    }

    private getAvatar(user: UserInfo) {
        if (user && user.email && user.email !== '') {
            this.gravatarService.getAvatar(user.email).subscribe(result => {
                user.hasAvatar = true;
                user.avatarUrl = result.url;
            },
                () => user.hasAvatar = false
            );
        }
    }

    private getCurrentRepositoryInfo() {
        this.currentRepositoryConfiguration.fetchConfiguration()
            .subscribe(repositoryConfiguration => {
                this._currentRepository = repositoryConfiguration;
                this.systemServiceBus.repositoryChanged();
                this.getAvatar(repositoryConfiguration.user);
            });
    }
}
