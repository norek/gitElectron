import { MdButtonModule, MdCheckboxModule, MatExpansionModule, MatInputModule, MatListModule, MdIconModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports:
    [MdButtonModule,
        MatInputModule,
        MdCheckboxModule,
        MatExpansionModule,
        MatListModule,
        MdIconModule,
    ],
    exports:
    [MdButtonModule,
        MatInputModule,
        MdCheckboxModule,
        MatExpansionModule,
        MatListModule,
        MdIconModule,
    ],
})
export class MaterialModule { }
