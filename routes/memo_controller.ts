const mongoose = require('mongoose'); //mongooseを呼び出すアクション(require('mongoose'))をmongooseでまとめる
const Schema = mongoose.Schema;    //Schemaはどのようなデータを格納するのかの定義const a = new mongoose.Schema({ name: String, age: Number });　で定義する
//mongooseのschemaを呼び出すアクション(mongoose.Schema)をSchemaでまとめる

// スキーマ

const MemoScheme = new Schema({  //SchemaからMemoSchemeのインスタンスを作成する
  create: Date,
  update: Date,
  type: Number,
  title: String, //各項目に入る型を指定する
  price: Number, //StringのSが大文字なのはmongooseの型定義の仕方　typescriptではない
  url: String
});

mongoose.connect('mongodb://localhost/memo');  //mongooseのライブラリーを使用してmongodbのmemoに接続する
let Memo = mongoose.model('memo', MemoScheme);  //Mongodb上のmemoの中にmemosのコレクションとしてMemoSchemaを作成する。それをMemoとして定義する。
                                                //ここのmemoはMongodb上のmemos(コレクション)

//memo_controller.tsはMongodbの機能をまとめたもの
class MemoController {　//exportは不要　理由はcommon.jsの型だから

  public error(error_type: number, error: any): any {
    let _result:any = {status: {success: false, db: null, server: null, net: null, client: null}};
    switch (error_type) {
      case 1:
        _result.success.db = error;
        break;
      case 2:
        _result.success.server = error;
        break;
      case 3:
        _result.success.net = error;
        break;
      case 4:
        _result.success.client = error;
        break;
      default:
    }
    return _result;
  }

  public count(query: any, callback: (result: any) => void): void {//memo.tsのfindから飛んでくる
    Memo.count(query).then((result: any) => { //Mongodb上のmemosからリストデータを取る
      callback({status: {success: true}, data: result});
    }).catch((error: any) => {　//mongodb上でエラーが起こっていたらこちらにくる
      callback(this.error(1, error));
    })
  }

  public find(query: any, option: { skip: number, limit: number, sort: any }, callback: (result: any) => void): void {//memo.tsのfindから飛んでくる
    Memo.find(query).skip(option.skip).limit(option.limit).sort(option.sort).then((result: any) => { //Mongodb上のmemosからリストデータを取る
      callback({status: {success: true}, data: result});
    }).catch((error: any) => {　//mongodb上でエラーが起こっていたらこちらにくる
      callback(this.error(1,error));
    })
  }

  public create(body: any, callback: (result: any) => void): void {//新しいフィールドを作るからcreateする
    const newMemo = new Memo(body); //Memo(MongoDBのmemosの所)のクラスをnewMemoでインスタンス化する
    newMemo.create = new Date();
    newMemo.update = newMemo.create;
    newMemo.save((error: any, result: any) => {
      if (!error) {
        callback({status: {success: true}, data: result});
      } else {
        callback(this.error(1,error));
      }
    });
  }

  public update(id: any, body: any, callback: (result: any) => void): void {
    body.update = new Date();
    Memo.updateOne({_id: id}, body).then((result: any) => {
      callback({status: {success: true}, data: result});
    }).catch((error: any) => {
      callback(this.error(1,error));
    })
  }

  public delete(id: any, callback: (result: any) => void): void {
    Memo.deleteOne({_id: id}).then((result: any) => {
      callback({status: {success: true}, data: result});
    }).catch((error: any) => {
      callback(this.error(1,error));
    })
  }

}


module.exports = MemoController; //Common.js　外からはclass MemoControllerの部分だけ見えている
