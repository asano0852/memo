//フロントでデータをダウンロード、アップロードをするためには通信しなくてはいけない
import {HttpClient} from "@angular/common/http"; //hpptプロトコルを使用するために読み込むもの
import {Injectable} from '@angular/core';

//serviceはシステムに一つあればいい@InjectableはAngularのこと
@Injectable({//@Injectableはangular内で一つしか存在しない　service(ネットワーク)について書く constractorでnewされたとき一つしか生成されない
  providedIn: 'root'//serviceの中身。providedIn:'root'はおまじないみたいなもの(デフォルトで書かれている)
})
export class MemoService {//exportすると他のファイルから見えるようになる
//todo:constructorはnewしたときに作動する？
  constructor(public http: HttpClient) {//HttpClientはクラス(設計図)でhttp:HttpClientとすることでインスタンスにして
    //使用できるようにする
    //constructorはnewしたときに初めに読み取られるもの
    //中に何もなければ読み取るものがない
    //HttpClientはconstructorのパラメータ部分に入れれば自動的に使えるようになる
  }


  public count(query: any, callback: (result: any) => void): void {
    const query_string: string = JSON.stringify(query);   //ストリングファイ：JavaScript のオブジェクトや値を JSON 文字列に変換する。
    const query_string_encoded: string = encodeURIComponent(query_string); //エンコード：URLに変換できない文字（例：/）等を含まないようにする

    this.http.get(" /memo/count/" + query_string_encoded).subscribe({//URLと、リクエストの設定をするためのオブジェクトの二つの引数を取れる
        next: (result: any) => {//nextに実行したい処理を書く　//query_string_encodedにエンコードされたものが入る→サーバーに渡す
          callback(result); //serviceのresからjson形式のファイルが渡ってきたら結果をcomponent.tsへ渡す
        },
        error: (error: any) => {//errorにエラー時の処理を書く
          callback({status: {success: false, db: null, server: null, net: error, client: null}, data: null});　//serverでerrorになっている
        },
        complete: () => {
        },
      }
    );
  }

  // {skip:number, limit:number, sort:any}
//serviceはネットワーク（http）　ネットワークはサーバーとクライアントを繋ぐもの
  public get(query: any, option: { skip: number, limit: number, sort: any }, callback: (result: any) => void): void {
    const query_string: string = JSON.stringify(query);   //ストリングファイ：JavaScript のオブジェクトや値を JSON 文字列に変換する。
    const query_string_encoded: string = encodeURIComponent(query_string); //エンコード：URLに変換できない文字（例：/）等を含まないようにする

    const option_string: string = JSON.stringify(option);   //ストリングファイ：JavaScript のオブジェクトや値を JSON 文字列に変換する。
    const option_string_encoded: string = encodeURIComponent(option_string); //エンコード：URLに変換できない文字（例：/）等を含まないようにする

    this.http.get("/memo/list/" + query_string_encoded + "/" + option_string_encoded).subscribe({//URLと、リクエストの設定をするためのオブジェクトの二つの引数を取れる
        next: (result: any) => {//nextに実行したい処理を書く　//query_string_encodedにエンコードされたものが入る→サーバーに渡す
          callback(result); //serviceのresからjson形式のファイルが渡ってきたら結果をcomponent.tsへ渡す
        },
        error: (error: any) => {//errorにエラー時の処理を書く
          callback({status: {success: false, db: null, server: null, net: error, client: null}, data: null});　//serverでerrorになっている
        },
        complete: () => {
        },
      }
    );
  }

  public create(body: any, callback: (result: any) => void): void {
    this.http.post("/memo/create", body).subscribe({//bodyの形でサーバーに値を渡す //subscribeを用いてデータを渡す
        next: (result: any) => { //nextに実行したい処理を書く
          callback(result); //memo.tsからの結果をcomponent.tsに渡す
        },
        error: (error: any) => {//errorにエラー時の処理を書く
          callback({status: {success: false, db: null, server: null, net: error, client: null}, data: null}); //serverでerrorになっている
        },
        complete: () => {
        },
      }
    );
  }

  public update(id: string, body: any, callback: (result: any) => void): void {
    this.http.put("/memo/update/" + id, body).subscribe({//id、bodyの形でサーバーに値を渡す
        next: (result: any) => {//nextに実行したい処理を書く
          callback(result);
        },
        error: (error: any) => {//errorにエラー時の処理を書く
          callback({status: {success: false, db: null, server: null, net: error, client: null}, data: null});　//serverでerrorになっている
        },
        complete: () => {
        },
      }
    );

  }

  public delete(id: string, callback: (result: any) => void): void {
    this.http.delete("/memo/delete/" + id).subscribe({//idの形でサーバーに値を渡す
      next: (result: any) => {//nextに実行したい処理を書く
        callback(result);
      },
      error: (error: any) => {//errorにエラー時の処理を書く
        callback({status: {success: false, db: null, server: null, net: error, client: null}, data: null});//serverでerrorになっている
      },
      complete: () => {
      },
    })
  }

}
