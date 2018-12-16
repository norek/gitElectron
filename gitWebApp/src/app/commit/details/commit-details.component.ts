import { Component, OnInit } from '@angular/core';
import { SystemBusService } from '../../services/system-bus.service';
import { CommitStoreService } from '../../store/commit.store';
import { CommitService, CommitDetails } from '../commit.service';
import { store } from '../../store/store';
import { requestDetails } from '../../store/commit.actions';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../../store/IAppState';


@Component({
    selector: 'commit-details',
    templateUrl: 'commit-details.component.html',
    styleUrls: ['commit-details.component.scss']
})

export class CommitDetailsComponent {

    @select('commitDetails') commitDetails$: Observable<CommitDetails>;

    private isOpen: boolean;
    private isLoading: boolean;

    // private commitDetails: CommitDetails;

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private systemBus: SystemBusService, private commitStore: CommitService) {
        this.systemBus.showCommitDetailsRequested$.subscribe((sha: string) => {
            this.isLoading = true;
            this.isOpen = true;
            // this.commitStore.getDetails(sha)
            //     .finally(() => this.isLoading = false)
            //     .subscribe((details: CommitDetails) => {
            //         this.commitDetails = details;
            //     }, error => this.isOpen = false);
            store.dispatch(requestDetails(sha));
        });

        this.systemBus.repositoryChanged$.subscribe(() => this.isOpen = false);
        this.systemBus.branchCheckoutCompletedSource$.subscribe(() => this.isOpen = false);
    }
}
