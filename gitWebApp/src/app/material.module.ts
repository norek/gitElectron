import { MdButtonModule, MdCheckboxModule, MatExpansionModule,
    MatInputModule, MatListModule, MdIconModule, MatProgressSpinnerModule } from '@angular/material';
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
    ],
    exports:
    [MdButtonModule,
        MatInputModule,
        MdCheckboxModule,
        MatExpansionModule,
        MatListModule,
        MdIconModule,
        MatProgressSpinnerModule,
    ],
})
export class MaterialModule { }
