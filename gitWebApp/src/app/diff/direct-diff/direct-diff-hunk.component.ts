import { Component, OnInit, Input } from '@angular/core';
import { DirectDiffHunk } from '../../services/diff.service';

@Component({
    selector: 'direct-diff-hunk',
    templateUrl: 'direct-diff-hunk.component.html',
    styleUrls: ['direct-diff-hunk.component.scss']
})
export class DirectDiffHunkComponent implements OnInit {

    @Input() hunk: DirectDiffHunk;

    constructor() {
    }

    ngOnInit() {
    }
}
