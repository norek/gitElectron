import { Injectable } from '@angular/core';
import { CommitChangeType } from '../details/commit-change-type.enum';


@Injectable()
export class ChangeTypeConverter {

    private changeTypesDescriptonCollection: ChangeTypeDescriber[] = [
        { color: 'green', icon: 'add', name: 'Add', type: CommitChangeType.Added },
        { color: 'red', icon: 'warning', name: 'Conflicted', type: CommitChangeType.Conflicted },
        { color: 'gray', icon: 'content_copy', name: 'Copied', type: CommitChangeType.Copied },
        { color: 'red', icon: 'remove', name: 'Deleted', type: CommitChangeType.Deleted },
        { color: 'dark_gray', icon: 'pan_tool', name: 'Ignored', type: CommitChangeType.Ignored },
        { color: 'yellow', icon: 'create', name: 'Modified', type: CommitChangeType.Modified },
        { color: 'yellow', icon: 'text_format', name: 'Renamed', type: CommitChangeType.Renamed },
        { color: 'red', icon: '', name: 'Type changed', type: CommitChangeType.TypeChanged },
        { color: 'red', icon: '', name: 'Unmodified', type: CommitChangeType.Unmodified },
        { color: 'red', icon: '', name: 'Unreadable', type: CommitChangeType.Unreadable },
        { color: 'red', icon: '', name: 'Untracked', type: CommitChangeType.Untracked },
    ];

    convert(changeType: number): ChangeTypeDescriber {
        const changeTypeDescriptor = this.changeTypesDescriptonCollection.filter((type) => type.type === changeType);

        if (changeTypeDescriptor === undefined || changeTypeDescriptor.length < 1) {
            return { color: 'blue', icon: 'x', name: 'not existing!', type: CommitChangeType.Undefined };
        }

        return changeTypeDescriptor[0];
    }
}

export class ChangeTypeDescriber {

    constructor() {

    }

    type: CommitChangeType;
    name: string;
    color: string;
    icon: string;
}
