import { Injectable } from '@angular/core';
import { CommitService, Commit } from '../commit/commit.service';
import { SystemBusService } from '../services/system-bus.service';
import { SystemOptionsStore } from './system-options.store';

@Injectable()
export class CommitStoreService {

    private _commits: Commit[] = [];

    constructor(private commitSerivce: CommitService, private systemStore: SystemOptionsStore,
        private systemBus: SystemBusService) {
        this.systemBus.branchCheckoutCompletedSource$.subscribe((branchName) => this.fetchCommitList(branchName));
        this.systemBus.repositoryChanged$.subscribe(() => this.fetchCommitList(this.systemStore.currentBranchName));
        this.systemBus.comitCompleted$.subscribe(() => this.fetchCommitList(this.systemStore.currentBranchName));
        this.systemBus.pullCompletedSource$.subscribe(() => this.fetchCommitList(this.systemStore.currentBranchName));
    }

    private fetchCommitList(branchName: string) {

        if (!branchName || branchName === '') {
            return;
        }

        this.commitSerivce.getAllFromTip(branchName)
            .subscribe(commits => {
                this._commits = commits;
            });
    }

    public get commits(): Commit[] {
        return this._commits;
    }
}
