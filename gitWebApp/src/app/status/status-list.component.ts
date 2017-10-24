import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { StatusService, StatusItem, FileStatus } from './status.service';
import { SystemBusService } from '../services/system-bus.service';
import { RepositoryWatcherService } from '../services/repository-watcher';

@Component({
    selector: 'status-list',
    templateUrl: 'status-list.component.html'
})

export class StatusListComponent implements OnInit {

    private statusList: StatusItem[] = [];

    @Output() onStatusSelected = new EventEmitter<StatusItem>();

    constructor(private statusService: StatusService, private systemBus: SystemBusService, private watcher: RepositoryWatcherService) {
        systemBus.comitCompleted$.subscribe(() => this.loadStatusList());
        systemBus.repositoryChanged$.subscribe((branchName) => this.loadStatusList());

    }

    ngOnInit() {
        this.watcher.ticker.subscribe(t => {
            this.loadStatusList();
        });
    }

    private loadStatusList(): void {
        this.statusService.get().subscribe(statusListResult => this.statusList = statusListResult);
    }

    private statusSelected(status: StatusItem): void {
        this.onStatusSelected.emit(status);
    }

    private stageFile(file: StatusItem): void {
        this.statusService.stage(file).subscribe(resp => this.loadStatusList());
    }

    private stageAll(): void {
        this.statusService.stageAll().subscribe(resp => this.loadStatusList());
    }

    private unstageAll(): void {
        this.statusService.unstageAll().subscribe(resp => this.loadStatusList());
    }

    private unStageFile(file: StatusItem): void {
        this.statusService.unstage(file).subscribe(resp => this.loadStatusList());
    }

    private get stagedFiles(): StatusItem[] {
        return this.statusList.filter((s) => this.isStaged(s));
    }

    private isStaged(statusItem: StatusItem): boolean {
        return statusItem.status === FileStatus.ModifiedInIndex
            || statusItem.status === FileStatus.DeletedFromIndex
            || statusItem.status === FileStatus.NewInIndex
            || statusItem.status === FileStatus.RenamedInIndex
            || statusItem.status === FileStatus.TypeChangeInIndex;
    }

    private get unStagedFiles(): StatusItem[] {
        return this.statusList.filter((s) => !this.isStaged(s));
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
