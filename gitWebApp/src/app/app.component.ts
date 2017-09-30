import { Component } from '@angular/core';
import { StatusItem } from './status/status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  onStatusSelected(status: StatusItem): void {
    console.log(status);
  }

}
