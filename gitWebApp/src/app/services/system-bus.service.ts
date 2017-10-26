import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { Subject } from 'rxjs/Subject';
import { Commit } from '../commit/commit.service';

@Injectable()
export class SystemBusService {

    private commitCompletedSource = new Subject();
    private branchCompletedSource = new Subject<string>();
    private branchCheckoutCompletedSource = new Subject<string>();

    private repositoryChangedSource = new Subject();
    private emptyEnviromentLoadedSource = new Subject();
    private showCommitDetailsRequestedSource = new Subject<string>();

    public comitCompleted$ = this.commitCompletedSource.asObservable();
    public branchCompleted$ = this.branchCompletedSource.asObservable();
    public branchCheckoutCompletedSource$ = this.branchCheckoutCompletedSource.asObservable();
    public repositoryChanged$ = this.repositoryChangedSource.asObservable();
    public showCommitDetailsRequested$ = this.showCommitDetailsRequestedSource.asObservable();
    /**
     * Handler for notification if application run on empty enviroments. No repositories are mapped.
     */
    public emptyEnviromentLoaded$ = this.emptyEnviromentLoadedSource.asObservable();

    public commitCompleted() {
        this.commitCompletedSource.next();
    }

    public branchCompleted(name: string) {
        this.branchCompletedSource.next(name);
    }

    public branchCheckoutCompleted(name: string) {
        this.branchCheckoutCompletedSource.next(name);
    }

    public repositoryChanged() {
        this.repositoryChangedSource.next();
    }

    public emptyEnviromentLoaded() {
        this.emptyEnviromentLoadedSource.next();
    }

    public showCommitDetailsRequested(commitSha: string) {
        this.showCommitDetailsRequestedSource.next(commitSha);
    }
}
