import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommitBusService {

    private commitCompletedSource = new Subject();

    public comitCompleted$ = this.commitCompletedSource.asObservable();

    public commitCompleted() {
        this.commitCompletedSource.next();
    }
}
