import {Component,Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'dialogpage', //cssを使う時のセレクター名
  templateUrl: 'dialogpage.component.html',　//参照するhtml名
})
export class DialogPageComponent { //export classの書き方はESmoduleの書き方　// export以下の書き方はangular material のダイアログの書き方

  constructor(public dialogRef: MatDialogRef<DialogPageComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  public onClose(): void {　//ダイアログを閉じる処理 close
    this.dialogRef.close(null);
  }

  public onSuccess(): void {　//ダイアログok
    const price: number = Number(this.data.price); //Number() 関数、数値を返す　数値じゃない場合はNaNになる
    if (!isNaN(price)) {//数字が入った場合isNaNじゃない場合
        this.data.price = price;
        this.dialogRef.close(this.data);
    }
  }

}



