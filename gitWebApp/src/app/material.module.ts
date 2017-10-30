import {
  MdButtonModule, MdCheckboxModule, MatExpansionModule,
  MatInputModule, MdListModule, MdIconModule, MatProgressSpinnerModule, MdDialogModule, MatCheckboxModule,
  MatSnackBarModule, MatToolbarModule, MatSelectModule, MatMenuModule, MatTabsModule,
  MdSidenavModule,
  MdTooltipModule,
  MdChipsModule
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
      MdSidenavModule,
      MdChipsModule
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
      MdSidenavModule,
      MdChipsModule
    ],
})
export class MaterialModule {
}
