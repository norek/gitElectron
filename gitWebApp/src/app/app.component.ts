import { Component, OnInit } from '@angular/core';
import { StatusItem } from './status/status.service';
import { CommitBusService } from './services/commit.bus.service';
import { RepositoryOptionsService } from './services/repository-options.service';
import { SystemOptionsService } from './services/system-options.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor() {
  }

  ngOnInit(): void {
  }

  onStatusSelected(status: StatusItem): void {
    console.log(status);
  }
}
