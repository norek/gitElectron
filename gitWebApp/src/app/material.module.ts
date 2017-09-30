import { MdButtonModule, MdCheckboxModule, MatExpansionModule, MatInputModule, MatListModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports:
    [MdButtonModule,
        MatInputModule,
        MdCheckboxModule,
        MatExpansionModule,
        MatListModule,
    ],
    exports:
    [MdButtonModule,
        MatInputModule,
        MdCheckboxModule,
        MatExpansionModule,
        MatListModule,
    ],
})
export class MaterialModule { }
