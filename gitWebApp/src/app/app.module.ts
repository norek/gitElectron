import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BranchListComponent } from './branch/branch-list.component';
import { BranchService } from './services/branch.service';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MdButtonModule, MdCheckboxModule } from '@angular/material';
import { MaterialModule } from './material.module';
import { StatusService } from './status/status.service';
import { StatusListComponent } from './status/status-list.component';

@NgModule({
  declarations: [
    AppComponent, BranchListComponent, StatusListComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    HttpModule, MaterialModule,
  ],
  providers: [BranchService, StatusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
