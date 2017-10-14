import {
    MdButtonModule, MdCheckboxModule, MatExpansionModule,
    MatInputModule, MatListModule, MdIconModule, MatProgressSpinnerModule, MdDialogModule, MatCheckboxModule,
    MatSnackBarModule, MatToolbarModule, MatSelectModule, MatMenuModule
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports:
    [MdButtonModule,
        MatInputModule,
        MdCheckboxModule,
        MatExpansionModule,
        MatListModule,
        MdIconModule,
        MatProgressSpinnerModule,
        MdDialogModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatSelectModule,
        MatMenuModule
    ],
    exports:
    [MdButtonModule,
        MatInputModule,
        MdCheckboxModule,
        MatExpansionModule,
        MatListModule,
        MdIconModule,
        MatProgressSpinnerModule,
        MdDialogModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatSelectModule,
        MatMenuModule
    ],
})
export class MaterialModule { }
