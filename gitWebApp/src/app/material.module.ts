import {
    MdButtonModule, MdCheckboxModule, MatExpansionModule,
    MatInputModule, MatListModule, MdIconModule, MatProgressSpinnerModule, MdDialogModule, MatCheckboxModule, MatSnackBarModule
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
        MatSnackBarModule
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
        MatSnackBarModule
    ],
})
export class MaterialModule { }
