import {
  MdButtonModule, MdCheckboxModule, MatExpansionModule,
  MatInputModule, MdListModule, MdIconModule, MatProgressSpinnerModule, MdDialogModule, MatCheckboxModule,
  MatSnackBarModule, MatToolbarModule, MatSelectModule, MatMenuModule, MatTabsModule, MatTooltipModule
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
      MatTooltipModule
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
      MatTooltipModule
    ],
})
export class MaterialModule {
}
