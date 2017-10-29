import { NgModule } from '@angular/core';
import { StatusListComponent } from './status-list.component';
import { StatusService } from './status.service';
import { SharedModule } from '../shared/shared.module';
import { CommitModule } from '../commit/commit.module';

@NgModule({
    imports: [SharedModule, CommitModule],
    exports: [StatusListComponent],
    declarations: [StatusListComponent],
    providers: [StatusService],
})
export class StatusModule { }
