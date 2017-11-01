import { NgModule } from '@angular/core';
import { VirtualScrollModule } from 'angular2-virtual-scroll';

import { SharedModule } from '../shared/shared.module';
import { CommitDetailsComponent } from './details/commit-details.component';
import { CommitFormComponent } from './commit-form.component';
import { CommitService } from './commit.service';
import { CommitStoreService } from '../store/commit.store';
import { ChangeTypeConverter } from './services/change-type.converter';
import { CommitChangeTypeToIconPipe } from './services/commit-changetype-to-icon.pipe';
import { CommitChangeTypeToTooltip } from './services/commit-changetype-to-tooltip.pipe';
import { CommitListComponent } from './list/commit-list.component';
import { CommitListItemComponent } from './list/commit-list-item.component';

@NgModule({
    imports: [SharedModule, VirtualScrollModule],
    exports: [CommitListComponent, CommitDetailsComponent, CommitFormComponent],
    declarations: [CommitListComponent, CommitFormComponent, CommitDetailsComponent,
        CommitChangeTypeToIconPipe, CommitChangeTypeToTooltip, CommitListItemComponent],
    providers: [CommitService, CommitStoreService, ChangeTypeConverter],
})
export class CommitModule { }
