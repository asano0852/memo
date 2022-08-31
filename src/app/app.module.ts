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
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";

@NgModule({ //@NgModuleはmodelとmodelの間を繋ぐときに使用する
  declarations: [//会社の大きい組織表　社長室的な　//componentを入れておく
    AppComponent,
    DialogPageComponent,
    ErrorDialogComponent
  ],
  imports: [　//会社の部署　　◯◯部　　//moduleを入れておく
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
    MatDialogModule,
    MatCardModule,
    MatListModule
  ],
  providers: [MemoService],　//組織を繋ぐもの
  bootstrap: [AppComponent] //社長室
})
export class AppModule {}
