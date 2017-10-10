import { Component, OnInit, ViewChild } from '@angular/core';
import { CommitService } from './commit.service';
import 'rxjs/add/operator/finally';
import { CommitBusService } from '../services/commit.bus.service';

@Component({
    selector: 'commit-form',
    templateUrl: 'commit-form.component.html',
    styleUrls: ['commit-form.component.scss']
})

export class CommitFormComponent implements OnInit {

    private isCommiting: boolean;
    private commitMessage: string;

    @ViewChild('commitMessageInput') child: any;

    constructor(private commitService: CommitService, private commitBus: CommitBusService) { }

    ngOnInit() { }

    private createCommit(): void {
        this.isCommiting = true;
        this.commitService.Create({ message: this.commitMessage })
            .finally(() => {
                this.isCommiting = false;
                this.commitMessage = '';
            })
            .subscribe((s) => {
                console.log(s);
                this.commitBus.commitCompleted();
            }, (error) => {
                console.log(error);
            });
    }
}
