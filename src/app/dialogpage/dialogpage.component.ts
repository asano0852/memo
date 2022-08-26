import { Component,Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'dialogpage',
  templateUrl: 'dialogpage.component.html',
})
export class DialogPageComponent { //export classの書き方はESmoduleの書き方　//
  constructor(
    public dialogRef: MatDialogRef<DialogPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}



