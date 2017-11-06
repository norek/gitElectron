import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { settings } from '../../environments/environment';
import { NotificationService } from './notification.service';
import { SystemBusService } from './system-bus.service';
import { Subscription } from 'rxjs/Subscription';


@Injectable()
export class RepositoryService {
    constructor(private http: Http, private notificationService: NotificationService,
        private systemBus: SystemBusService) { }

    public fetch(): void {
        this.http.post(settings.baseApi + '/repository/fetch', {})
            .subscribe(() => {
                this.notificationService.success('success', 'fetch');
                this.systemBus.fetchCompleted(true);
            },
            (error) => {
                this.notificationService.error(error, 'fetch');
                this.systemBus.fetchCompleted(false);
            });
    }

    public pull(): void {
        this.http.post(settings.baseApi + '/repository/pull', {})
            .subscribe(() => {
                this.notificationService.success('success', 'pull');
                this.systemBus.pullCompleted(true);
            },
            (error) => {
                this.notificationService.error(error, 'pull');
                this.systemBus.pullCompleted(false);
            });
    }
}
