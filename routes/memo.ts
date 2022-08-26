var express = require('express');//expressを呼び出すアクション(require('express'))をexpressでまとめる
var router = express.Router();  //expressのrouterにあるget post 等を使用できるようにする

const memoController = require("./memo_controller")//Mongodb側　いわゆるmodule.exports（export classされたやつ)を読み込む
const controller = new memoController();　//newでインスタンス化している

//MongoDB上からデータを受け取る
//　.get('/', function (req, res)の形
router.get('/memo/list/:query',//serviceからurlの形式でエンコードされたデータが送られてくる :query=query_string_encoded
  (req: any, res: any) => { //request 受ける側　response返す側
    const encoded_query_string: string = req.params.query; //reqには多くの情報が入っているその中のparams /:queryとqueryは同じ
    const query_string: string = decodeURIComponent(encoded_query_string); 　//デコード：エンコードしたものを元に戻す
    const query: any = JSON.parse(query_string); //デコードしたものをパースする　パースはデコードしたものを元に戻す
    controller.find(query, (error: any, result: any) => { //memo_controller.tsのfindから値が渡ってくる
      res.json(result);　//MongoDBでクエリしたものをjson形式にしてserviceへ渡す
    })
  });

//MongoDB上に新しいmemoデータを作成する
//.post('/', function (req, res)の形
router.post('/memo/create', (request: any, res: any, next: any) => {//serviceからbodyデータが送られてくる
  const body = request.body; //serviceから渡ってきたデータのbodyの部分を使用する
  controller.create(body, (error: any, result: any) => {//memo_controller.tsのcreateから値が渡ってくる
    res.json(result); //json形式でデータをserviceに渡す
  });
});

//MongoDB上からデータを取得して変更してMongoDBにデータを戻す
//.put('/user', function (req, res)の形
router.put('/memo/update/:id', 　//
  (request: any, res: any, next: any) => {
    const id = request.params.id;
    const body = request.body;
    controller.update(id, body, (err: any, result: any) => {
      res.json(result);
    });
  });

//MongoDB上のmemoのデータを削除する
//app.delete('/user', function (req, res)の形
router.delete('/memo/delete/:id',
  (request: any, res: any, next: any) => {
    const id = request.params.id;
    controller.delete(id, (err: any, result: any) => {
      res.json(result);
    });
  });

//サーバー側はCommon.jsの形を用いる場合が多い
module.exports = router;  //Common.js　特徴はexportsのsがついている

