import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'error-dialog',
  templateUrl: 'error.dialog.component.html',
})
export class ErrorDialogComponent { //export classの書き方はESmoduleの書き方　//export classに書いたものは外から見える

  public message:string = "";

  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { success: boolean, db: any, server: any, net: any, client: any }
  ) {
  }

  ngOnInit() {
    if (this.data.db) {
      this.message = this.data.db.message;
    }
    if (this.data.server) {

    }
    if (this.data.net) {

    }
    if (this.data.client) {

    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}



