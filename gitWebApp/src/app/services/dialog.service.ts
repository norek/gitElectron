import { Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NewRepositoryComponent } from '../repository/new-repository.component';

@Injectable()
export class DialogService {

    constructor(public dialog: MdDialog) {

    }

    public showNewRepositoryDialog(): MdDialogRef<NewRepositoryComponent> {
        return this.dialog.open(NewRepositoryComponent, { width: '600px' });
    }
}
