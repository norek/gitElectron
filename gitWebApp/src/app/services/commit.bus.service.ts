import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommitBusService {

    private commitCompletedSource = new Subject();
    private branchCompletedSource = new Subject<string>();

    public comitCompleted$ = this.commitCompletedSource.asObservable();
    public branchCompleted$ = this.branchCompletedSource.asObservable();

    public commitCompleted() {
        this.commitCompletedSource.next();
    }

    public branchCompleted(name: string) {
        this.branchCompletedSource.next(name);
    }
}
