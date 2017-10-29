import { Injectable } from '@angular/core';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RepositoryWatcherService {

    private subscription: Subscription;
    public ticker: Observable<number>;

    public startWatching() {
        this.ticker = TimerObservable.create(0, 300000);
        this.subscription = this.ticker.subscribe(t => {

        });
    }
    
    public stopWatching() {
        this.subscription.unsubscribe();
    }

}
