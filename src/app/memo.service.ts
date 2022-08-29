//@〜はTypescriptにない機能を表現している
import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';

//serviceはシステムに一つあればいい@InjectableはAngularのこと
@Injectable({　　//serviceの中身。providedIn:'root'はおまじないみたいなもの(デフォルトで書かれている)
  providedIn: 'root'
})

export class MemoService {   //exportすると他のファイルから見えるようになる

  constructor(public http: HttpClient) {  //HttpClientはクラス(設計図)でhttp:HttpClientとすることでインスタンスにして
    //使用できるようにする
    //constructorはnewしたときに初めに読み取られるもの
    //中に何もなければ読み取るものがない
    //HttpClientはconstructorのパラメータ部分に入れれば自動的に使えるようになる
  }

//serviceはネットワーク（http）　ネットワークはサーバーとクライアントを繋ぐもの
  public get(query: any, callback: ( result: any) => void): void {
    const query_string: string = JSON.stringify(query);   //ストリングファイ：JavaScript のオブジェクトや値を JSON 文字列に変換する。
    const query_string_encoded: string = encodeURIComponent(query_string); //エンコード：URLに変換できない文字（例：/）等を含まないようにする
    this.http.get("/memo/list/" + query_string_encoded).subscribe(
      (result: any) => {//query_string_encodedにエンコードされたものが入る→サーバーに渡す
        callback(result); //serviceのresからjson形式のファイルが渡ってきたら結果をcomponent.tsへ渡す
      },
      (error: any) => {
        callback({status: {success: false, db: null, server: null, net: error, client: null}, data: null});
      });
  }

  public create(body: any, callback: (result: any) => void): void {
    this.http.post("/memo/create", body).subscribe((result: any) => {//bodyの形でサーバーに値を渡す
      callback(result); //memo.tsからの結果をcomponent.tsに渡す
    }, (error: any) => {
      callback({status: {success: false, db: null, server: null, net: error, client: null}, data: null});
    })
  }

  public update(id: string, body: any, callback: (result: any) => void): void {
    this.http.put("/memo/update/" + id, body).subscribe((result: any) => {//id、bodyの形でサーバーに値を渡す
      callback(result);
    }, (error: any) => {
      callback({status: {success: false, db: null, server: null, net: error, client: null}, data: null});
    })
  }

  public delete(id: string, callback: ( result: any) => void): void {
    this.http.delete("/memo/delete/" + id).subscribe((result: any) => {//idの形でサーバーに値を渡す
      callback( result);
    }, (error: any) => {
      callback({status: {success: false, db: null, server: null, net: error, client: null}, data: null});
    })
  }

}
