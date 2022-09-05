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
    @Inject(MAT_DIALOG_DATA) public data: {status:{ success: boolean, db: any, server: any, net: any, client: any }} //最終的にここにエラーが渡ってきて型チェックをする
  ) {
  }

  ngOnInit() {　//クライアントを起動したら起動するもの　//messageのエラーはそれぞれ違う　たまたま名前一緒なだけ
    const status: any = this.data.status;
    if (status.db) {
      this.message = "DB Error : " + status.db.message;
    }
    if (status.server) {
      this.message = "Server Error : " + status.server.message;
    }
    if (status.net) {
      this.message = "Network Error : " + status.net.message;
    }
    if (status.client) {
      this.message = "Client Error : " + status.client.message;
    }
  }

  public onNoClick(): void {　//ダイアログを閉じる処理
    this.dialogRef.close();
  }
}



