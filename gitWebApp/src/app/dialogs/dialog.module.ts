import { NgModule } from '@angular/core';
import { QuestionDialogComponent } from './question/question-dialog.component';
import { DialogService } from './dialog.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    exports: [],
    declarations: [QuestionDialogComponent],
    providers: [DialogService],
    entryComponents: [QuestionDialogComponent]
})
export class DialogModule { }
