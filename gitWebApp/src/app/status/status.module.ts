import { NgModule } from '@angular/core';
import { StatusListComponent } from './status-list.component';
import { StatusService } from './status.service';
import { SharedModule } from '../shared/shared.module';
import { CommitModule } from '../commit/commit.module';
import { StatusTypeDescriptorService } from './service/status-type-descriptor.service';

@NgModule({
    imports: [SharedModule, CommitModule],
    exports: [StatusListComponent],
    declarations: [StatusListComponent],
    providers: [StatusService, StatusTypeDescriptorService],
})
export class StatusModule { }
