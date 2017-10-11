import { Component } from '@angular/core';
import { StatusItem } from './status/status.service';
import { CommitBusService } from './services/commit.bus.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private systemBus: CommitBusService, public snackBar: MdSnackBar) {
    this.systemBus.branchCompleted$.subscribe((branchName) => this.snackBar.open(branchName, 'Created:', { duration: 1500 }));
  }

  onStatusSelected(status: StatusItem): void {
    console.log(status);
  }
}
