import {
    MdButtonModule, MdCheckboxModule, MatExpansionModule,
    MatInputModule, MatListModule, MdIconModule, MatProgressSpinnerModule, MdDialogModule, MatCheckboxModule, MatSnackBarModule, MatToolbarModule
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
        MatToolbarModule
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
        MatToolbarModule
    ],
})
export class MaterialModule { }
