import {Component, OnInit} from '@angular/core';
import {MemoService} from "./memo.service";　//memo.service.tsとESmoduleとして繋がっている
import {MatDialog} from '@angular/material/dialog';
import {DialogPageComponent} from "./dialogpage/dialogpage.component";
import {ErrorDialogComponent} from "./error.dialog/error.dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public memo_list: any[] = [];　//any[]は配列の型　number[]は数値の型　// = []は配列の初期化
  public showFiller: boolean = false;
  public title: string = "";
  private query: any = {};

  //constructorとngOnInitの違い constructorはtypescriptの言語でngOnInitは画面

  constructor(public memo: MemoService, public dialog: MatDialog) { //typescriptの言語 Newした時実行されるもの
  }

  private draw(): void {
    this.memo.get(this.query, (result) => {
      if (result.status.success) {
        this.memo_list = result.data;//結果がserviceから渡ってくる上を見るとmemo_listは配列型になってるので数分表示される
      } else {
        this.onError(result.status);
      }
    })
  }

  public ngOnInit() {　//ページが表示される時に動作する。今回はdrawを実行するから　8割型リストの初期化に用いられる　リスト型はdrawが多く使われる　//画面
    this.draw();　//Angularを新規作成した時作成される。動作としてはクライアントとサーバーが同時に動く
  }

  public onError(error: any): void {

    const dialogRef = this.dialog.open(ErrorDialogComponent, {　//ダイアログがひらく
      width: '250px',
      data: error　//初期値
    });

    dialogRef.afterClosed().subscribe((result) => {　//ダイアログを閉じて以下を実行する
    });
  }

  public onCreate(): void {

    const dialogRef = this.dialog.open(DialogPageComponent, {　//ダイアログがひらく
      width: '250px',
      data: {type: "1", title: "", desc: "", url: ""}　//初期値
    });

    dialogRef.afterClosed().subscribe((result) => {　//ダイアログを閉じて以下を実行する
      this.memo.create(result, (result) => {
        if (result.status.success) {
          this.draw();//リストにデータを追加する
        } else {
          this.onError(result.status);
        }
      })
    });
  }

  public onUpdate(memo: any): void {
    this.memo.get({_id: memo._id}, (result) => {
      if (result.status.success) {
        if (result.data.length === 1) {
          const dialogRef = this.dialog.open(DialogPageComponent, {　//dialogがひらくdialog.htmlを確認する
            width: '250px',
            data: result.data[0]
          });

          dialogRef.afterClosed().subscribe((result) => {　//ダイアログを閉じて以下を実行する
            this.memo.update(memo._id, result, (result) => {　//リストを取ってきてserviceにデータを渡す
              this.draw();//データをgetしている
            })
          });
        } else {
          // todo: error dialog
          this.draw();//データをgetしている
        }
      } else {
        this.onError(result.status);
      }
    })
  }

  public onDelete(memo: any): void {
    this.memo.delete(memo._id, (result) => { //リストを取ってきてserviceにデータを渡す
      if (result.status.success) {
        this.draw();　//データをgetしている
      } else {
        this.onError(result.status);
      }
    })
  }

  public onFind() {
    this.draw();　//サーバーから最新のデータを取ってくる
  }
}
