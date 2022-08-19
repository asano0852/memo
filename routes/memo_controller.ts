
var mongoose = require('mongoose'); //mongooseを呼び出すアクション(require('mongoose'))をmongooseでまとめる
var Schema = mongoose.Schema; //mongooseのschemaを呼び出すアクション(mongoose.Schema)をSchemaでまとめる

// スキーマ

var MemoScheme = new Schema({     //SchemaからMemoSchemeのインスタンスを作成する
  title: String, //StringのSが大文字なのはmongooseの方定義の仕方　typescriptではない
  desc: String,
  url: String
});

mongoose.connect('mongodb://localhost/memo');  //mongooseのライブラリーを使用してmongodbのmemoに接続する
let Memo = mongoose.model('memo', MemoScheme);  //Mongodb上のmemoの中にmemosのコレクションとしてMemoSchemaを作成するそれを
                                                //Memoとして定義する。



//ここのmemoはMongodb上のmemos(コレクション)
class MemoController {

  public find(query: any, callback: (error: any, result: any) => void): void {
    Memo.find(query, (err: any, result: any) => { //Mongodb上のmemosから
      callback(err, result)
    });
  }

  public create(body: any, callback: () => void): void {
    const newmemo = new Memo(body);
    newmemo.save();
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
