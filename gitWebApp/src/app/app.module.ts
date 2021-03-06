import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';

import { NotificationService } from './services/notification.service';
import { HeaderToolbarComponent } from './toolbar/header-toolbar.component';
import { GravatarService } from './services/external/gravatar.service';
import { SystemOptionsService } from './services/system-options.service';
import { SystemOptionsStore } from './store/system-options.store';
import { SystemBusService } from './services/system-bus.service';
import { RepositoryWatcherService } from './services/repository-watcher';

import { BranchModule } from './branch/branch.module';
import { CommitModule } from './commit/commit.module';
import { NewRepositoryModule } from './repository/new-repository.module';
import { DirectDiffModule } from './diff/direct-diff.module';
import { DialogModule } from './dialogs/dialog.module';
import { StatusModule } from './status/status.module';
import { RepositoryConfigurationModule } from './repository/configuration/repository-configuration.module';
import { RepositoryService } from './services/repository.service';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { IAppState } from './store/IAppState';
import { store } from './store/store';

@NgModule({
  declarations: [
    AppComponent,
    HeaderToolbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    BranchModule,
    CommitModule,
    DirectDiffModule,
    NewRepositoryModule,
    StatusModule,
    DialogModule,
    RepositoryConfigurationModule,
    NgReduxModule,
    HttpModule,
  ],
  providers: [SystemBusService, NotificationService,
    GravatarService, SystemOptionsService, SystemOptionsStore,
    RepositoryWatcherService, RepositoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(store);
  }
}
