import { Component,Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'dialogpage', //cssを使う時のセレクター名
  templateUrl: 'dialogpage.component.html',　//参照するhtml名
})
export class DialogPageComponent { //export classの書き方はESmoduleの書き方　// export以下の書き方はangular material のダイアログの書き方
  constructor(
    public dialogRef: MatDialogRef<DialogPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}



