import { NgModule } from '@angular/core';

import { BranchListComponent } from './branch-list.component';
import { NewBranchComponent } from './new-branch.component';
import { SharedModule } from '../shared/shared.module';
import { BranchService } from '../services/branch.service';

@NgModule({
    imports: [SharedModule],
    exports: [BranchListComponent],
    declarations: [BranchListComponent, NewBranchComponent],
    providers: [BranchService],
    entryComponents: [NewBranchComponent]
})
export class BranchModule { }
