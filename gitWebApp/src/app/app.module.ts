import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { BranchListComponent } from './branch/branch-list.component';
import { BranchService } from './services/branch.service';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { StatusService } from './status/status.service';
import { StatusListComponent } from './status/status-list.component';
import { CommitFormComponent } from './commit/commit-form.component';
import { CommitService } from './commit/commit.service';
import { FormsModule } from '@angular/forms';
import { NewBranchComponent } from './branch/new-branch.component';
import { NotificationService } from './services/notification.service';
import { HeaderToolbarComponent } from './toolbar/header-toolbar.component';
import { GravatarService } from './services/external/gravatar.service';
import { NewRepositoryComponent } from './repository/new-repository.component';
import { DirectoryService } from './services/directory.service';
import { DirectoryListComponent } from './repository/directory-list.component';
import { SystemOptionsService } from './services/system-options.service';
import { SystemOptionsStore } from './store/system-options.store';
import { DialogService } from './services/dialog.service';
import { SystemBusService } from './services/system-bus.service';
import { DiffService } from './services/diff.service';
import { RepositoryWatcherService } from './services/repository-watcher';
import { CommitListComponent } from './commit/commit-list.component';
import { CommitStoreService } from './store/commit.store';
import { QuestionDialogComponent } from './dialogs/question/question-dialog.component';


import { DirectDiffComponent } from './diff/direct-diff.component';
import { DirectDiffHunkListComponent } from './diff/direct-diff/direct-diff-hunk-list.component';
import { DirectDiffHunkComponent } from './diff/direct-diff/direct-diff-hunk.component';
import { CommitDetailsComponent } from './commit/details/commit-details.component';
import { CommitChangeTypeToIconPipe } from './commit/details/commit-changetype-to-icon.pipe';

@NgModule({
  declarations: [
    AppComponent, BranchListComponent, StatusListComponent, CommitFormComponent,
    NewBranchComponent, HeaderToolbarComponent, NewRepositoryComponent, DirectoryListComponent,
    CommitListComponent, DirectDiffComponent, QuestionDialogComponent, DirectDiffHunkListComponent,
    DirectDiffHunkComponent, CommitDetailsComponent, CommitChangeTypeToIconPipe
  ],
  imports: [
    BrowserModule, FormsModule, BrowserAnimationsModule,
    HttpModule, MaterialModule,
  ],
  providers: [BranchService, StatusService, CommitService, SystemBusService, NotificationService,
    GravatarService, DirectoryService, SystemOptionsService, SystemOptionsStore,
    DialogService, RepositoryWatcherService, CommitStoreService, DiffService
  ],
  bootstrap: [AppComponent],
  entryComponents: [NewBranchComponent, NewRepositoryComponent, DirectDiffComponent, QuestionDialogComponent]
})
export class AppModule { }
