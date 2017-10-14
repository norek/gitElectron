import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class NotificationService {

    private duration = 1500;

    constructor(public snackBar: MdSnackBar) { }

    error(error: any, title: string) {
        this.snackBar.open(error.json().error, title);
    }

    success(message: string, title: string) {
        this.snackBar.open(message, title, { duration: this.duration });
    }
}
