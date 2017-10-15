import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'new-repository',
    templateUrl: 'new-repository.component.html'
})

export class NewRepositoryComponent implements OnInit {


    constructor(public dialogRef: MdDialogRef<NewRepositoryComponent>) {
    }

    ngOnInit() {
    }
}
