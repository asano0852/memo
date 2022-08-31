const mongoose = require('mongoose'); //mongooseを呼び出すアクション(require('mongoose'))をmongooseでまとめる
const Schema = mongoose.Schema;    //Schemaはどのようなデータを格納するのかの定義const a = new mongoose.Schema({ name: String, age: Number });　で定義する
//mongooseのschemaを呼び出すアクション(mongoose.Schema)をSchemaでまとめる

// スキーマ

const MemoScheme = new Schema({  //SchemaからMemoSchemeのインスタンスを作成する
  title: String, //各項目に入る型を指定する
  desc: String, //StringのSが大文字なのはmongooseの型定義の仕方　typescriptではない
  url: String
});

mongoose.connect('mongodb://localhost/memo');  //mongooseのライブラリーを使用してmongodbのmemoに接続する
let Memo = mongoose.model('memo', MemoScheme);  //Mongodb上のmemoの中にmemosのコレクションとしてMemoSchemaを作成する。それをMemoとして定義する。
                                                //ここのmemoはMongodb上のmemos(コレクション)


//memo_controller.tsはMongodbの機能をまとめたもの
class MemoController {　//exportは不要　理由はcommon.jsの型だから

  public find(query: any, callback: (result: any) => void): void {//memo.tsのfindから飛んでくる
    Memo.find(query).then((result: any) => { //Mongodb上のmemosからリストデータを取る
      callback({status: {success: true}, data: result});
    }).catch((error: any) => {　//mongodb上でエラーが起こっていたらこちらにくる
      callback({status: {success: false, db: error, server: null, net: null, client: null}/*ここまでstatusの型　この塊で移動する*/, data: null});
    })
  }

  public create(body: any, callback: (result: any) => void): void {//新しいフィールドを作るからcreateする
    const newMemo = new Memo(body); //Memo(MongoDBのmemosの所)のクラスをnewMemoでインスタンス化する
    newMemo.save((error: any, result: any) => {
      if (!error) {
        callback({status: {success: true}, data: result});
      } else {
        callback({status: {success: false, db: error, server: null, net: null, client: null}, data: null});
      }
    });
  }

  public update(id: any, body: any, callback: (result: any) => void): void {
    Memo.updateOne({_id: id}, body).then((result: any) => {
      callback({status: {success: true}, data: result});
    }).catch((error: any) => {
      callback({status: {success: false, db: error, server: null, net: null, client: null}, data: null});
    })
  }

  public delete(id: any, callback: (result: any) => void): void {
    Memo.deleteOne({_id: id}).then( (result: any) => {
      callback({status: {success: true}, data: result});
    }).catch((error: any) => {
      callback({status: {success: false, db: error, server: null, net: null, client: null}, data: null});
    })
  }

}


module.exports = MemoController; //Common.js　外からはclass MemoControllerの部分だけ見えている
