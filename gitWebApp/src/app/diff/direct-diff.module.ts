import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DirectDiffComponent } from './direct-diff.component';
import { DirectDiffHunkListComponent, DirectDiffHunkComponent, DirectDiffHunkLinesComponent } from './direct-diff/direct-diff-components';
import { DiffService } from '../services/diff.service';

@NgModule({
    imports: [SharedModule],
    exports: [],
    declarations: [DirectDiffComponent, DirectDiffHunkComponent, 
                    DirectDiffHunkListComponent, DirectDiffHunkLinesComponent],
    providers: [DiffService],
    entryComponents: [DirectDiffComponent]
})
export class DirectDiffModule { }
