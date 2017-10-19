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
import { CommitBusService } from './services/commit.bus.service';
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

@NgModule({
  declarations: [
    AppComponent, BranchListComponent, StatusListComponent, CommitFormComponent,
    NewBranchComponent, HeaderToolbarComponent, NewRepositoryComponent, DirectoryListComponent
  ],
  imports: [
    BrowserModule, FormsModule, BrowserAnimationsModule,
    HttpModule, MaterialModule,
  ],
  providers: [BranchService, StatusService, CommitService, CommitBusService, NotificationService,
    GravatarService, DirectoryService, SystemOptionsService, SystemOptionsStore,
    DialogService
  ],
  bootstrap: [AppComponent],
  entryComponents: [NewBranchComponent, NewRepositoryComponent]
})
export class AppModule { }
