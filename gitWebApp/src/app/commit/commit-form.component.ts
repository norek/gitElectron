import { Component, OnInit, ViewChild } from '@angular/core';
import { CommitService } from './commit.service';
import 'rxjs/add/operator/finally';

@Component({
    selector: 'commit-form',
    templateUrl: 'commit-form.component.html',
    styleUrls: ['commit-form.component.scss']
})

export class CommitFormComponent implements OnInit {

    private isCommiting: boolean;
    private commitMessage: string;

    constructor(private commitService: CommitService) { }

    ngOnInit() { }

    private createCommit(): void {
        this.isCommiting = true;
        this.commitService.Create({ message: this.commitMessage })
        .finally(() => this.isCommiting = false)
        .subscribe((s) => console.log(s));
    }
}
