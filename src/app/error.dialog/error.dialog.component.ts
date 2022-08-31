import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'error-dialog',
  templateUrl: 'error.dialog.component.html',
})
export class ErrorDialogComponent { //export classの書き方はESmoduleの書き方　//export classに書いたものは外から見える

  public message: string = "";

  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { success: boolean, db: any, server: any, net: any, client: any } //最終的にここにエラーが渡ってきて型チェックをする
  ) {
  }

  ngOnInit() {　//クライアントを起動したら起動するもの　//messageのエラーはそれぞれ違う　たまたま名前一緒なだけ
    if (this.data.db) {
      this.message = "DB Error : " + this.data.db.message;
    }
    if (this.data.server) {
      this.message = "Server Error : " + this.data.server.message;
    }
    if (this.data.net) {
      this.message = "Network Error : " + this.data.net.message;
    }
    if (this.data.client) {
      this.message = "Client Error : " + this.data.client.message;
    }
  }

  onNoClick(): void {　//ダイアログを閉じる処理
    this.dialogRef.close();
  }
}



