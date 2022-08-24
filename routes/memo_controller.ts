
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


class MemoController {

  public find(query: any, callback: (error: any, result: any) => void): void {
    Memo.find(query, (err: any, result: any) => { //Mongodb上のmemosから
      callback(err, result)
    });
  }

  public create(body: any, callback: () => void): void {
    const newMemo = new Memo(body);
    newMemo.save();
    callback()
  }

  public update(id: any, body: any, callback: (error: any, result: any) => void): void {
    Memo.updateOne({_id: id}, body, (err: any, result: any) => {
      callback(err, result);
    });
  }

  public delete(id: any, callback: (err: any, result: any) => void): void {
    Memo.deleteOne({_id: id}, (err: any, result: any) => {
      callback(err, result);
    });
  }

}


module.exports = MemoController;
