import {Component, Inject} from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
	selector: 'alert-dialog',
	templateUrl: 'alert.dialog.html',
	styleUrls: ['alert.dialog.component.css']
})
export class AlertDialog {
	constructor(public dialogRef: MdDialogRef<any>, @Inject(MD_DIALOG_DATA) public data: any) {
	}
}