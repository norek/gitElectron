import { NgModule } from '@angular/core';
import { NewRepositoryComponent } from './new-repository.component';
import { SharedModule } from '../shared/shared.module';
import { DirectoryListComponent } from './directory-list.component';
import { DirectoryService } from '../services/directory.service';

@NgModule({
    imports: [SharedModule],
    exports: [],
    declarations: [NewRepositoryComponent, DirectoryListComponent],
    providers: [DirectoryService],
    entryComponents: [NewRepositoryComponent]
})
export class NewRepositoryModule { }
