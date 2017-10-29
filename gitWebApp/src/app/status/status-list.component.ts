import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { StatusService, StatusItem, FileStatus } from './status.service';
import { SystemBusService } from '../services/system-bus.service';
import { RepositoryWatcherService } from '../services/repository-watcher';
import { discardQuestion } from '../utils/message.resource';
import { DiffService } from '../services/diff.service';
import { DialogService } from '../dialogs/dialog.service';
import { StatusTypeDescriptorService, StatusTypeDescription, StatusListItem } from './service/status-type-descriptor.service';

@Component({
    selector: 'status-list',
    templateUrl: 'status-list.component.html',
    styleUrls: ['status-list.component.scss']
})

export class StatusListComponent implements OnInit {

    private stagedItems: StatusListItem[] = [];
    private unstagedItems: StatusListItem[] = [];

    @Output() onStatusSelected = new EventEmitter<StatusItem>();

    constructor(private statusService: StatusService,
        private systemBus: SystemBusService,
        private watcher: RepositoryWatcherService,
        private diffService: DiffService,
        private dialogService: DialogService,
        private statusDescriptor: StatusTypeDescriptorService) {
        systemBus.comitCompleted$.subscribe(() => this.loadStatusList());
        systemBus.repositoryChanged$.subscribe((branchName) => this.loadStatusList());

    }

    ngOnInit() {
        this.watcher.ticker.subscribe(t => {
            this.loadStatusList();
        });
    }

    private viewChanges(item: StatusListItem) {
        this.diffService.showDiff(item.status.path);
    }

    private loadStatusList(): void {
        this.statusService.get().subscribe(statusListResult => {
            this.stagedItems = this.statusDescriptor.getStagedItems(statusListResult);
            this.unstagedItems = this.statusDescriptor.getUnstagedItems(statusListResult);
        });
    }

    private statusSelected(item: StatusListItem): void {
        this.onStatusSelected.emit(item.status);
    }

    private stageFile(item: StatusListItem): void {
        this.statusService.stage(item.status).subscribe(resp => this.loadStatusList());
    }

    private stageAll(): void {
        this.statusService.stageAll().subscribe(resp => this.loadStatusList());
    }

    private unstageAll(): void {
        this.statusService.unstageAll().subscribe(resp => this.loadStatusList());
    }

    private unStageFile(item: StatusListItem): void {
        this.statusService.unstage(item.status).subscribe(resp => this.loadStatusList());
    }

    private discardChanges(item: StatusListItem): void {
        this.dialogService.showQuestion(discardQuestion).afterClosed().subscribe(result => {
            if (result.confirmed) {
                this.statusService.discardChanges(item.status).subscribe(resp => this.loadStatusList());
            }
        });
    }

    private getIconName(status: StatusListItem): string {
        return status.description.icon;
    }

    private getTooltip(status: StatusListItem): string {
        return status.description.name;
    }
}
