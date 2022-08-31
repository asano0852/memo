import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {AppComponent} from './app.component';
import {MemoService} from "./memo.service";
import {HttpClientModule} from "@angular/common/http"; //HTTPサービスの有効化 httpをどこでも使用できるようにする
import {FormsModule} from "@angular/forms"; //ngModelを使用するためのもの
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {DialogPageComponent} from './dialogpage/dialogpage.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ErrorDialogComponent} from "./error.dialog/error.dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    DialogPageComponent,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,//HTTPサービスの有効化 httpをどこでも使用できるようにする
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [MemoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
