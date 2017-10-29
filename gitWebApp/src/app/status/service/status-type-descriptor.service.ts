import { Injectable } from '@angular/core';
import { FileStatus, StatusItem } from '../status.service';

@Injectable()
export class StatusTypeDescriptorService {

    get NewInIndex(): StatusTypeDescription {
        return { color: 'green', icon: 'add', name: 'Add', status: FileStatus.NewInIndex };
    }

    get ModifiedInIndex(): StatusTypeDescription {
        return { color: 'yellow', icon: 'create', name: 'Modified', status: FileStatus.ModifiedInIndex };
    }

    get DeletedFromIndex(): StatusTypeDescription {
        return { color: 'red', icon: 'remove', name: 'Deleted', status: FileStatus.DeletedFromIndex };
    }

    get RenamedInIndex(): StatusTypeDescription {
        return { color: 'green', icon: '', name: 'Renamed', status: FileStatus.RenamedInIndex };
    }

    get TypeChangeInIndex(): StatusTypeDescription {
        return { color: 'yellow', icon: '', name: 'Type changed', status: FileStatus.TypeChangeInIndex };
    }


    hasStatus(item: StatusItem, flag: FileStatus): boolean {
        // tslint:disable-next-line:no-bitwise
        return (item.status & flag) === flag;
    }

    get NewInWorkdir(): StatusTypeDescription {
        return { color: 'green', icon: 'add', name: 'Add', status: FileStatus.NewInWorkdir };
    }

    get ModifiedInWorkdir(): StatusTypeDescription {
        return { color: 'yellow', icon: 'create', name: 'Modified', status: FileStatus.ModifiedInWorkdir };
    }

    get DeletedFromWorkdir(): StatusTypeDescription {
        return { color: 'red', icon: 'remove', name: 'Deleted', status: FileStatus.DeletedFromWorkdir };
    }

    get RenamedInWorkdir(): StatusTypeDescription {
        return { color: 'green', icon: '', name: 'Renamed', status: FileStatus.RenamedInWorkdir };
    }

    get TypeChangeInWorkdir(): StatusTypeDescription {
        return { color: 'yellow', icon: '', name: 'Type changed', status: FileStatus.TypeChangeInWorkdir };
    }

    public getUnstagedItems(items: StatusItem[]): StatusListItem[] {
        const stagedItems: StatusListItem[] = [];

        for (let index = 0; index < items.length; index++) {
            const element = items[index];

            if (this.hasStatus(element, FileStatus.ModifiedInWorkdir)) {
                stagedItems.push({ status: element, description: this.ModifiedInWorkdir });
            } else if (this.hasStatus(element, FileStatus.DeletedFromWorkdir)) {
                stagedItems.push({ status: element, description: this.DeletedFromWorkdir });
            } else if (this.hasStatus(element, FileStatus.NewInWorkdir)) {
                stagedItems.push({ status: element, description: this.NewInWorkdir });
            } else if (this.hasStatus(element, FileStatus.RenamedInWorkdir)) {
                stagedItems.push({ status: element, description: this.RenamedInWorkdir });
            } else if (this.hasStatus(element, FileStatus.TypeChangeInWorkdir)) {
                stagedItems.push({ status: element, description: this.TypeChangeInWorkdir });
            }
        }

        return stagedItems;
    }

    public getStagedItems(items: StatusItem[]): StatusListItem[] {
        const unStagedItems: StatusListItem[] = [];

        for (let index = 0; index < items.length; index++) {
            const element = items[index];

            if (this.hasStatus(element, FileStatus.ModifiedInIndex)) {
                unStagedItems.push({ status: element, description: this.ModifiedInIndex });
            } else if (this.hasStatus(element, FileStatus.DeletedFromIndex)) {
                unStagedItems.push({ status: element, description: this.DeletedFromIndex });
            } else if (this.hasStatus(element, FileStatus.NewInIndex)) {
                unStagedItems.push({ status: element, description: this.NewInIndex });
            } else if (this.hasStatus(element, FileStatus.RenamedInIndex)) {
                unStagedItems.push({ status: element, description: this.RenamedInIndex });
            } else if (this.hasStatus(element, FileStatus.TypeChangeInIndex)) {
                unStagedItems.push({ status: element, description: this.TypeChangeInIndex });
            }
        }
        return unStagedItems;
    }
}

export class StatusTypeDescription {
    status: FileStatus;
    name: string;
    icon: string;
    color: string;
}

export class StatusListItem {
    status: StatusItem;
    description: StatusTypeDescription;
}
