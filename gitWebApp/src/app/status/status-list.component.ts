import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { StatusService, StatusItem, FileStatus } from './status.service';

@Component({
    selector: 'status-list',
    templateUrl: 'status-list.component.html'
})

export class StatusListComponent implements OnInit {

    private statusList: StatusItem[] = [];

    @Output() onStatusSelected = new EventEmitter<StatusItem>();

    constructor(private statusService: StatusService) { }

    ngOnInit() {
        this.statusService.Get().subscribe(statusListResult => this.statusList = statusListResult);
    }

    private statusSelected(status: StatusItem): void {
        this.onStatusSelected.emit(status);
    }

    private getIconName(status: StatusItem): string {
        switch (status.status) {
            case FileStatus.NewInIndex:
            case FileStatus.NewInWorkdir:
                return 'add box';
            case FileStatus.ModifiedInIndex:
            case FileStatus.ModifiedInWorkdir:
                return 'create';
            case FileStatus.DeletedFromIndex:
            case FileStatus.DeletedFromWorkdir:
                return 'remove box';
            default:
                return 'alarm on';
        }
    }
}
