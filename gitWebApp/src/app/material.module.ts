import {
  MdButtonModule, MdCheckboxModule, MatExpansionModule,
  MatInputModule, MdListModule, MdIconModule, MatProgressSpinnerModule, MdDialogModule, MatCheckboxModule,
  MatSnackBarModule, MatToolbarModule, MatSelectModule, MatMenuModule, MatTabsModule, MatTooltipModule,
  MdSidenavModule
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
      MatTooltipModule,
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
      MatTooltipModule,
      MdSidenavModule
    ],
})
export class MaterialModule {
}
