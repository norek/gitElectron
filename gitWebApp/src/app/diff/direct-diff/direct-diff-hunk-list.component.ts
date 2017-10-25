import { Component, OnInit, Input } from '@angular/core';
import { DirectDiffHunk } from '../../services/diff.service';

@Component({
    selector: 'direct-diff-hunk-list',
    templateUrl: 'direct-diff-hunk-list.component.html',
    styleUrls: ['direct-diff-hunk-list.component.scss']
})
export class DirectDiffHunkListComponent implements OnInit {

    @Input() hunks: DirectDiffHunk[];

    constructor() {
    }

    ngOnInit() {
    }
}
