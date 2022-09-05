import {Component, OnChanges, OnInit} from '@angular/core';
import {MemoService} from "./memo.service";　//memo.service.tsとESmoduleとして繋がっている
import {MatDialog} from '@angular/material/dialog';
import {DialogPageComponent} from "./dialogpage/dialogpage.component";
import {ErrorDialogComponent} from "./error.dialog/error.dialog.component";

//@◯◯◯◯◯◯◯◯とexportの間にはプログラムを書いてはいけない　二つでセットになっている
@Component({//@Componentはconstructorでnewされたとき複数生成することが可能である
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {// implementsは免許(jis規格)みたいなもの。implements OnInit　と書くことでこの中でOnInitを使うことを宣言している
  public memo_list: any[] = [];　//any[]は配列の型　number[]は数値の型　// = []は配列の初期化
  public showFiller: boolean = false; //angular materialのsidenavの仕組み
  public title: string = "";
  public count: number = 0;
  public query: any = { title: { $regex: "" } };

  //public search:string = "";

  private option: { skip: number, limit: number, sort: any } = {skip: 0, limit: 10, sort: {}}; //skipは初めの表示数、limitは何ページずつ送っていくか

  //constructorとngOnInitの違い constructorはTypescriptの言語である。ngOnInitは画面でありクライアントの画面が表示されたときに最初に実行するもの
  //constructorの中に入れたらangularが自動的にnewしてくれるconstructor(public memo: MemoService) { const a = new memo}になっているのと同義
  constructor(public memo: MemoService, public dialog: MatDialog) { //typescriptの言語 Newした時実行されるもの
  }

  private draw(): void {
    try {
      this.memo.count(this.query, (result) => {//if文は条件式がtrueであれば処理が実行され、falseであれば実行されない
        if (result.status.success) {//successを見たときにtrueならこちらの値が返る console.logで見るとresult.status.success=trueになっている
          this.count = result.data;
          this.memo.get(this.query, this.option, (result) => {
            if (result.status.success) {//successを見たときにtrueならこちらの値が返る
              this.memo_list = result.data;//結果がserviceから渡ってくる上を見るとmemo_listは配列型になってるので数分表示される
            } else {
              this.onError(result);//todo:successがfalseの時はこちらの値が返る
            }
          })
        } else {
          this.onError(result);//todo:successがfalseの時はこちらの値が返る
        }
      })
    } catch (error) {
      this.onError(this.memo.error(4, error));
    }
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
    try {
      const dialogRef = this.dialog.open(DialogPageComponent, {　//ダイアログがひらく
        width: '250px',
        data: {type: "", title: "", price: "", url: ""}　//初期値
      });
      dialogRef.afterClosed().subscribe((result) => {　//ダイアログを閉じて以下を実行する
        if (result) {
          this.memo.create(result, (result) => {
            if (result.status.success) {
              this.draw();//リストにデータを追加する
            } else {
              this.onError(result);
            }
          })
        }
      });
    } catch (error) {
      this.onError(this.memo.error(4, error));
    }
  }

  public onUpdate(memo: any): void {
    try {
      this.memo.get({_id: memo._id}, {skip: 0, limit: 1, sort: {}}, (result: any) => {
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
          }
        } else {
          this.onError(result);
        }
      })
    } catch (error) {
      this.onError(this.memo.error(4, error));
    }
  }

  public onDelete(memo: any): void {
    try {
      this.memo.delete(memo._id, (result) => { //リストを取ってきてserviceにデータを渡す
        if (result.status.success) {
          this.draw();　//データをgetしている
        } else {
          this.onError(result);
        }
      })
    } catch (error) {
      this.onError(this.memo.error(4, error));
    }
  }

  public onFindByTitle(/*serch:string*/) {
   // this.query.title.$regex = this.search;
    this.draw();　//サーバーから最新のデータを取ってくる
  }

  onNext() {
    if ((this.option.skip + this.option.limit) < this.count) {
      this.option.skip += this.option.limit;
      this.draw();
    }
  }

  onPrev() {
    if ((this.option.skip - this.option.limit) >= 0) {
      this.option.skip -= this.option.limit;
      this.draw();
    }
  }
}
