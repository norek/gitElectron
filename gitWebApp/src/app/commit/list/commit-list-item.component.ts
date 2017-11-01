import { Component, Input } from '@angular/core';
import { Commit } from '../commit.service';
import { SystemBusService } from '../../services/system-bus.service';

@Component({
    selector: 'list-item',
    template:
    `
        <div class="commit-item-content">
            <div class="commit-item-message">{{commit.message}}</div>
            <button class="show-details-button" md-icon-button color="warn" (click)="showDetails()">
                <md-icon>visibility</md-icon>
            </button>
        </div>
    `,
    styleUrls: ['commit-list-item.component.scss']
})
export class CommitListItemComponent {

    @Input() commit: Commit;

    constructor(private systemBus: SystemBusService) {

    }

    private showDetails(): void {
        this.systemBus.showCommitDetailsRequested(this.commit.sha);
    }

}
