import {
    MdButtonModule, MdCheckboxModule, MatExpansionModule,
    MatInputModule, MdListModule, MdIconModule, MatProgressSpinnerModule, MdDialogModule, MatCheckboxModule,
    MatSnackBarModule, MatToolbarModule, MatSelectModule, MatMenuModule, MatTabsModule
} from '@angular/material';
import { NgModule } from '@angular/core';

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
        MatTabsModule
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
        MatTabsModule
    ],
})
export class MaterialModule { }
