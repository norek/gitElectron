import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CommitDetailsComponent } from './details/commit-details.component';
import { CommitFormComponent } from './commit-form.component';
import { CommitListComponent } from './commit-list.component';
import { CommitChangeTypeToIconPipe } from './details/commit-changetype-to-icon.pipe';
import { CommitService } from './commit.service';
import { CommitStoreService } from '../store/commit.store';

@NgModule({
    imports: [SharedModule],
    exports: [CommitListComponent, CommitDetailsComponent, CommitFormComponent],
    declarations: [CommitListComponent, CommitFormComponent, CommitDetailsComponent, CommitChangeTypeToIconPipe],
    providers: [CommitService, CommitStoreService],
})
export class CommitModule { }
