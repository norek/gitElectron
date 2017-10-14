import { Component } from '@angular/core';
import { StatusItem } from './status/status.service';
import { CommitBusService } from './services/commit.bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

  constructor() {
  }

  onStatusSelected(status: StatusItem): void {
    console.log(status);
  }
}
