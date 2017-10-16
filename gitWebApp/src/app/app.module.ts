import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { RepositoryOptionsService } from './services/repository-options.service';
import { GravatarService } from './services/external/gravatar.service';
import { NewRepositoryComponent } from './repository/new-repository.component';
import { DirectoryService } from './services/directory.service';
import { DirectoryListComponent } from './repository/directory-list.component';
import { SystemOptionsService } from './services/system-options.service';

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
    RepositoryOptionsService, GravatarService, DirectoryService, SystemOptionsService],
  bootstrap: [AppComponent],
  entryComponents: [NewBranchComponent, NewRepositoryComponent]
})
export class AppModule { }
