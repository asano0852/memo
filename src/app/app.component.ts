import {Component, OnInit} from '@angular/core';
import {MemoService} from "./memo.service";
import {MatDialog} from '@angular/material/dialog';
import {DialogPageComponent} from "./dialogpage/dialogpage.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public memo_list: any[] = [];

  constructor(public memo: MemoService, public dialog: MatDialog) {
  }

  public ngOnInit() {
    this.draw();
  }

  private draw() {
    this.memo.get('1', (error, result) => {
      this.memo_list = result;
    })
  }

  public onCreate(): void {

    const dialogRef = this.dialog.open(DialogPageComponent, {
      width: '250px',
      data: {type: "1", title: "", desc: "", url: ""}
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.memo.create(result, (error, result) => {
        this.draw();
      })
    });
  }

  public onUpdate(memo: any): void {

    const dialogRef = this.dialog.open(DialogPageComponent, {
      width: '250px',
      data: memo
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.memo.update(memo._id, result, (error, result) => {
        this.draw();
      })
    });
  }

  public onDelete(memo: any): void {
    this.memo.delete(memo._id, (error, result) => {
      this.draw();
    })
  }
}



