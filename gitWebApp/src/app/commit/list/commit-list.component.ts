import { Component, OnInit } from '@angular/core';
import { CommitStoreService } from '../../store/commit.store';
import { SystemBusService } from '../../services/system-bus.service';
import { Commit } from '../commit.service';

@Component({
    selector: 'commit-list',
    templateUrl: 'commit-list.component.html',
    styleUrls: ['commit-list.component.scss']
})

export class CommitListComponent implements OnInit {

    constructor(private commitStore: CommitStoreService) { }

    ngOnInit() {
    }

    trackByFn(index, item) {
        return index;
    }
}
