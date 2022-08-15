import {HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MemoService {

  constructor(public http:HttpClient) {

  }

  public get(list:string, callback:(error: any,result:any) => void): void {
     this.http.get("/memo/list/" + list).subscribe((result: any) => {
      callback(null, result);
    })
  }

  public create(body:any, callback:(error: any,result:any) => void): void {
     this.http.post("/memo/create" , body).subscribe((result: any) => {
      callback(null, result);
    })
  }

  public update(id:string ,body: any, callback: (error: any, result: any) => void): void {
    this.http.put("/memo/update/" + id,body).subscribe((result: any) => {
      callback(null, result);
    })
  }

    public delete(id:string, callback:(error: any,result:any) => void): void {
     this.http.delete("/memo/delete/" + id).subscribe((result: any) => {
      callback(null, result);
    })
  }

}
