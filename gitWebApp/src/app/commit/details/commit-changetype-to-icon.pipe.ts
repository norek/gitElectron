import { Pipe, PipeTransform } from '@angular/core';
import { CommitChangeType } from './commit-change-type.enum';

@Pipe({
    name: 'commitChangeTypeToIcon'
})
export class CommitChangeTypeToIconPipe implements PipeTransform {
    transform(value: number): string {

        switch (value) {
            case CommitChangeType.Added:
                return 'add';
            case CommitChangeType.Conflicted:
                return 'warning';
            case CommitChangeType.Copied:
                return 'content_copy';
            case CommitChangeType.Deleted:
                return 'remove';
            case CommitChangeType.Ignored:
                return 'pan_tool';
            case CommitChangeType.Modified:
                return 'create';
            case CommitChangeType.Renamed:
                return 'text_format';
            case CommitChangeType.TypeChanged:
                return 'awap_horiz';
            case CommitChangeType.Unmodified:
                return '';
            case CommitChangeType.Unreadable:
                return '';
            case CommitChangeType.Untracked:
                return '';
            default:
                return '';
        }
    }
}
