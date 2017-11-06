import { Injectable } from '@angular/core';
import {
    SystemOptionsService, SystemConfiguration,
    MappedRepository, RepositoryConfiguration, UserInfo
} from '../services/system-options.service';
import { Observable } from 'rxjs/Observable';
import { GravatarService } from '../services/external/gravatar.service';
import { SystemBusService } from '../services/system-bus.service';
import { Branch } from '../services/branch.service';

@Injectable()
export class SystemOptionsStore {

    private _currentRepository: RepositoryConfiguration = {
        currentRepository: '',
        currentBranch: undefined,
        user: { email: '', name: '', avatarUrl: '', hasAvatar: false }
    };

    private _systemConfiguration: SystemConfiguration = { mappedRepositories: [] };

    constructor(private optionsService: SystemOptionsService,
        private systemServiceBus: SystemBusService, private gravatarService: GravatarService) {

    }

    public fetchSystemConfiguration() {
        this.optionsService.getSystemConfiguration()
            .subscribe(configuration => {
                this._systemConfiguration = configuration;

                if (this.mappedRepositories && this.mappedRepositories.filter(repository => repository.isCurrent).length > 0) {
                    this.getCurrentRepositoryInfo();
                } else {
                    this.systemServiceBus.emptyEnviromentLoaded();
                }
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

    public get isRepositoryLoaded(): boolean {
        return this._currentRepository !== undefined;
    }

    public get currentBranch(): Branch {
        return this._currentRepository.currentBranch;
    }

    public get currentBranchName(): string {
        return this._currentRepository.currentBranch.name;
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
        this.optionsService.getCurrentRepositoryConfiguration()
            .subscribe(repositoryConfiguration => {
                this._currentRepository = repositoryConfiguration;
                this.systemServiceBus.repositoryChanged();
                this.getAvatar(repositoryConfiguration.user);
            });
    }
}
