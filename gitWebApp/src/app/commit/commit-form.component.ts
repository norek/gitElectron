import { Component, OnInit, ViewChild } from '@angular/core';
import { CommitService } from './commit.service';
import 'rxjs/add/operator/finally';
import { SystemBusService } from '../services/system-bus.service';

@Component({
    selector: 'commit-form',
    templateUrl: 'commit-form.component.html',
    styleUrls: ['commit-form.component.scss']
})

export class CommitFormComponent implements OnInit {

    private isCommiting: boolean;
    private commitMessage: string;

    @ViewChild('commitMessageInput') child: any;

    constructor(private commitService: CommitService, private systemBus: SystemBusService) {
        systemBus.repositoryChanged$.subscribe((branchName) => this.commitMessage = '');
    }

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
                this.systemBus.commitCompleted();
            }, (error) => {
                console.log(error);
            });
    }
}
