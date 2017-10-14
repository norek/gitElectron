import { Component, OnInit } from '@angular/core';
import { StatusItem } from './status/status.service';
import { CommitBusService } from './services/commit.bus.service';
import { RepositoryOptionsService } from './services/repository-options.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor(private repositoryOptionsService: RepositoryOptionsService) {
  }

  ngOnInit(): void {
    this.repositoryOptionsService.fetChConfiguration();
  }

  onStatusSelected(status: StatusItem): void {
    console.log(status);
  }
}
