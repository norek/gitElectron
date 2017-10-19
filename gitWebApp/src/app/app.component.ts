import { Component, OnInit } from '@angular/core';
import { StatusItem } from './status/status.service';
import { SystemOptionsService } from './services/system-options.service';
import { SystemOptionsStore } from './store/system-options.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private systemOptionsStore: SystemOptionsStore) {
  }

  ngOnInit(): void {
    this.systemOptionsStore.fetchSystemConfiguration();
  }

  onStatusSelected(status: StatusItem): void {
    console.log(status);
  }
}
