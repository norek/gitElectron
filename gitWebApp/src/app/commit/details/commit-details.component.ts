import { Component, OnInit } from '@angular/core';
import { SystemBusService } from '../../services/system-bus.service';
import { CommitStoreService } from '../../store/commit.store';
import { CommitService, CommitDetails } from '../commit.service';

@Component({
    selector: 'commit-details',
    templateUrl: 'commit-details.component.html'
})

export class CommitDetailsComponent {

    private isOpen: boolean;
    private isLoading: boolean;

    private commitDetails: CommitDetails;

    constructor(private systemBus: SystemBusService, private commitStore: CommitService) {
        this.systemBus.showCommitDetailsRequested$.subscribe((sha: string) => {
            this.isOpen = true;
            this.isLoading = true;
            this.commitStore.getDetails(sha)
                .finally(() => this.isLoading = false)
                .subscribe((details: CommitDetails) => {
                    this.commitDetails = details;
                }, error => this.isOpen = false);
        });
    }
}
