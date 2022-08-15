import {Component, OnInit} from '@angular/core';
import {MemoService} from "./memo.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'sample6';
  public list: string[] = [];
  public loggedIn = false;
  public memo_list: any[] = [];
  showFiller = false;

  constructor(public memo: MemoService) {
  }


  public onClick(hello: string) {
    this.title = hello;

    this.list.push("a");

    this.loggedIn = !this.loggedIn;
  }

  public ngOnInit() {

    this.memo.get('魔王2', (error, result) => {
      this.memo_list = result;
    })

  }

  public onDelete(id: string):void {
    this.memo.delete(id, (error, result) => {
      this.memo.get('魔王2', (error, result) => {
        this.memo_list = result;
      })
    })
  }

  public onCreate(): void {
    const new_record = {
      title: '魔王',
      desc: '魔王2',
      url: '魔王3'
    }

    this.memo.create(new_record, (error, result) => {
      this.memo.get('魔王2', (error, result) => {
        this.memo_list = result;
      })
    })
  }

  public onUpdate(id: string):void {
    this.memo.update(id, {title:"勇者"},(error, result) => {
      this.memo.get('魔王2', (error, result) => {
        this.memo_list = result;
      })
    })
  }

}
