import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { ChangeTypeConverter } from '../services/change-type.converter';

@Pipe({
    name: 'commitChangeTypeToIcon'
})
export class CommitChangeTypeToIconPipe implements PipeTransform {

    constructor(private changeTypeConferter: ChangeTypeConverter) {

    }

    transform(value: number): string {
        return this.changeTypeConferter.convert(value).icon;
    }
}