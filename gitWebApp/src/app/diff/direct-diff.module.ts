import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DirectDiffComponent } from './direct-diff.component';
import { DirectDiffHunkListComponent } from './direct-diff/direct-diff-hunk-list.component';
import { DirectDiffHunkComponent } from './direct-diff/direct-diff-hunk.component';
import { DiffService } from '../services/diff.service';

@NgModule({
    imports: [SharedModule],
    exports: [],
    declarations: [DirectDiffComponent, DirectDiffHunkComponent, DirectDiffHunkListComponent],
    providers: [DiffService],
    entryComponents: [DirectDiffComponent]
})
export class DirectDiffModule { }
