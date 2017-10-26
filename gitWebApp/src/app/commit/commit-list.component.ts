import { Component, OnInit } from '@angular/core';
import { CommitStoreService } from '../store/commit.store';
import { Commit } from './commit.service';
import { SystemBusService } from '../services/system-bus.service';

@Component({
    selector: 'commit-list',
    templateUrl: 'commit-list.component.html',
    styleUrls: ['commit-list.component.scss']
})

export class CommitListComponent implements OnInit {

    constructor(private commitStore: CommitStoreService, private systemBus: SystemBusService) { }

    ngOnInit() {
    }

    private showDetails(commit: Commit): void {
        this.systemBus.showCommitDetailsRequested(commit.sha);
    }
}
