import {
  MdButtonModule, MdCheckboxModule, MatExpansionModule,
  MatInputModule, MdListModule, MdIconModule, MatProgressSpinnerModule, MdDialogModule, MatCheckboxModule,
  MatSnackBarModule, MatToolbarModule, MatSelectModule, MatMenuModule, MatTabsModule,
  MdSidenavModule,
  MdTooltipModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports:
    [MdButtonModule,
      MatInputModule,
      MdCheckboxModule,
      MatExpansionModule,
      MdListModule,
      MdIconModule,
      MatProgressSpinnerModule,
      MdDialogModule,
      MatCheckboxModule,
      MatSnackBarModule,
      MatToolbarModule,
      MatSelectModule,
      MatMenuModule,
      MatTabsModule,
      MdTooltipModule,
      MdSidenavModule
    ],
  exports:
    [MdButtonModule,
      MatInputModule,
      MdCheckboxModule,
      MatExpansionModule,
      MdListModule,
      MdIconModule,
      MatProgressSpinnerModule,
      MdDialogModule,
      MatCheckboxModule,
      MatSnackBarModule,
      MatToolbarModule,
      MatSelectModule,
      MatMenuModule,
      MatTabsModule,
      MdTooltipModule,
      MdSidenavModule
    ],
})
export class MaterialModule {
}
