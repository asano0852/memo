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
  }

  public get(type: any, callback: (error: any, result: any) => void): void {
    const type_string = JSON.stringify(type);   //stringして
    const type_string_encoded = encodeURIComponent(type_string);
    this.http.get("/memo/list/" + type_string_encoded).subscribe((result: any) => {
      callback(null, result);
    })
  }

  public create(body: any, callback: (error: any, result: any) => void): void {
    this.http.post("/memo/create", body).subscribe((result: any) => {
      callback(null, result);
    })
  }

  public update(id: string, body: any, callback: (error: any, result: any) => void): void {
    this.http.put("/memo/update/" + id, body).subscribe((result: any) => {
      callback(null, result);
    })
  }

  public delete(id: string, callback: (error: any, result: any) => void): void {
    this.http.delete("/memo/delete/" + id).subscribe((result: any) => {
      callback(null, result);
    })
  }

}
