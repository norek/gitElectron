import { NgModule } from '@angular/core';

import { BranchListComponent } from './branch-list.component';
import { NewBranchComponent } from './new-branch.component';
import { SharedModule } from '../shared/shared.module';
import { BranchService } from '../services/branch.service';
import { RemoteBranchAssignmentComponent } from './remote/remote-branch-assignment.component';

@NgModule({
    imports: [SharedModule],
    exports: [BranchListComponent, RemoteBranchAssignmentComponent],
    declarations: [BranchListComponent, NewBranchComponent, RemoteBranchAssignmentComponent],
    providers: [BranchService],
    entryComponents: [NewBranchComponent, RemoteBranchAssignmentComponent]
})
export class BranchModule { }
