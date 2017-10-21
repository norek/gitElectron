import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatusItem } from './status/status.service';
import { SystemOptionsService } from './services/system-options.service';
import { SystemOptionsStore } from './store/system-options.store';
import { RepositoryWatcherService } from './services/repository-watcher';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private systemOptionsStore: SystemOptionsStore, private watcher: RepositoryWatcherService) {
  }

  ngOnInit(): void {
    this.systemOptionsStore.fetchSystemConfiguration();
    this.watcher.startWatching();
  }

  ngOnDestroy() {
    this.watcher.stopWatching();
  }

  onStatusSelected(status: StatusItem): void {
    console.log(status);
  }
}
