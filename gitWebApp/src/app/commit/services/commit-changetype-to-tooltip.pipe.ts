import { PipeTransform, Pipe } from '@angular/core';
import { ChangeTypeConverter } from './change-type.converter';

@Pipe({
    name: 'commitChangeTypeToTooltip'
})
export class CommitChangeTypeToTooltip implements PipeTransform {

    constructor(private changeTypeConferter: ChangeTypeConverter) {

    }

    transform(value: number): string {
        return this.changeTypeConferter.convert(value).name;
    }
}
