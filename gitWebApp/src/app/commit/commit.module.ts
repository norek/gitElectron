import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CommitDetailsComponent } from './details/commit-details.component';
import { CommitFormComponent } from './commit-form.component';
import { CommitListComponent } from './commit-list.component';
import { CommitService } from './commit.service';
import { CommitStoreService } from '../store/commit.store';
import { ChangeTypeConverter } from './services/change-type.converter';
import { CommitChangeTypeToIconPipe } from './services/commit-changetype-to-icon.pipe';
import { CommitChangeTypeToTooltip } from './services/commit-changetype-to-tooltip.pipe';

@NgModule({
    imports: [SharedModule],
    exports: [CommitListComponent, CommitDetailsComponent, CommitFormComponent],
    declarations: [CommitListComponent, CommitFormComponent, CommitDetailsComponent, CommitChangeTypeToIconPipe, CommitChangeTypeToTooltip],
    providers: [CommitService, CommitStoreService, ChangeTypeConverter],
})
export class CommitModule { }
