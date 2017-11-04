import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Remote, SystemOptionsService } from '../../services/system-options.service';

@Component({
    selector: 'repository-configuration',
    templateUrl: 'repository-configuration.component.html',
    styleUrls: ['repository-configuration.component.scss']
})

export class RepositoryConfigurationComponent implements OnInit {

    private remotes: Remote[] = [];
    private isCreateMode: boolean;
    private remote: Remote;

    constructor(public dialogRef: MdDialogRef<RepositoryConfigurationComponent>,
        private repositoryConfigurationService: SystemOptionsService) { }

    ngOnInit(): void {
        this.repositoryConfigurationService.getRepositoryRemotes()
            .subscribe(remotes => this.remotes = remotes);
    }

    onCancel(): void {
        this.isCreateMode = false;
    }

    remove(remote: Remote): void {
        this.repositoryConfigurationService.removeRemote(remote.name).subscribe(() => {
            this.repositoryConfigurationService.getRepositoryRemotes()
                .subscribe(remotes => this.remotes = remotes);
        });
    }

    onSubmit(): void {
        this.repositoryConfigurationService.addRemote(this.remote).subscribe(() => {
            this.isCreateMode = false;
            this.repositoryConfigurationService.getRepositoryRemotes()
                .subscribe(remotes => this.remotes = remotes);
        });
    }

    private showAddPanel() {
        this.remote = { name: '', url: '' };
        this.isCreateMode = true;
    }
}
