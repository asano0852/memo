var express = require('express');//expressを呼び出すアクション(require('express'))をexpressでまとめる
var router = express.Router();  //expressのrouterにあるget post 等を使用できるようにする

const memoController = require("./memo_controller")//Mongodb側　いわゆるmodule.exports（export classされたやつ)を読み込む
const controller = new memoController();　//newでインスタンス化している


router.get('/memo/count/:query',//serviceからurlの形式でエンコードされたデータが送られてくる :query=query_string_encoded　//パスからパラメータを取得するには:/をつける必要がある
  (req: any, res: any) => { //request 受ける側　response返す側
    try {
      const encoded_query_string: string = req.params.query; //reqには多くの情報が入っているその中のparams /:queryとqueryは同じ
      const query_string: string = decodeURIComponent(encoded_query_string); 　//デコード：エンコードしたものを元に戻す
      const query: any = JSON.parse(query_string); //デコードしたものをパースする　パースはデコードしたものを元に戻す

      controller.count(query,(result: any) => { //memo_controller.tsのfindから値が渡ってくる
        res.json(result);
      })
    } catch (error: any) {
      res.json({status: {success: false, db: null, server: error, net: null, client: null}, data: null});
    }
  });

//MongoDB上からデータを受け取る
//　.get('/', function (req, res)の形
router.get('/memo/list/:query/:option',//serviceからurlの形式でエンコードされたデータが送られてくる :query=query_string_encoded　//パスからパラメータを取得するには:/をつける必要がある
  (req: any, res: any) => { //request 受ける側　response返す側
    try {
      const encoded_query_string: string = req.params.query; //reqには多くの情報が入っているその中のparams /:queryとqueryは同じ
      const query_string: string = decodeURIComponent(encoded_query_string); 　//デコード：エンコードしたものを元に戻す
      const query: any = JSON.parse(query_string); //デコードしたものをパースする　パースはデコードしたものを元に戻す

      const encoded_option_string: string = req.params.option; //reqには多くの情報が入っているその中のparams /:queryとqueryは同じ
      const option_string: string = decodeURIComponent(encoded_option_string); 　//デコード：エンコードしたものを元に戻す
      const option: {skip:number, limit:number, sort:any} = JSON.parse(option_string); //デコードしたものをパースする　パースはデコードしたものを元に戻す

      controller.find(query, option,(result: any) => { //memo_controller.tsのfindから値が渡ってくる
        res.json(result);
      })
    } catch (error: any) {
      res.json({status: {success: false, db: null, server: error, net: null, client: null}, data: null});
    }
  });

//MongoDB上に新しいmemoデータを作成する
//.post('/', function (req, res)の形
router.post('/memo/create',
  (req: any, res: any) => {//serviceからbodyデータが送られてくる
    const body = req.body; //serviceから渡ってきたデータのbodyの部分を使用する
    controller.create(body, (result: any) => {//memo_controller.tsのcreateから値が渡ってくる
      res.json(result);
    });
  });

//MongoDB上からデータを取得して変更してMongoDBにデータを戻す
//.put('/user', function (req, res)の形
router.put('/memo/update/:id',
  (req: any, res: any) => {
    const id = req.params.id;
    const body = req.body;
    controller.update(id, body, (result: any) => {
      res.json(result);
    });
  });

//MongoDB上のmemoのデータを削除する
//app.delete('/user', function (req, res)の形
router.delete('/memo/delete/:id',
  (req: any, res: any) => {
    const id = req.params.id;
    controller.delete(id, (result: any) => {
      res.json(result);
    });
  });

//サーバー側はCommon.jsの形を用いる場合が多い
module.exports = router;  //Common.js　特徴はexportsのsがついている


/*
router.get('/memo/:id',//serviceからurlの形式でエンコードされたデータが送られてくる :query=query_string_encoded
  (request: any, res: any) => { //request 受ける側　response返す側
    const id = request.params.id;
    controller.findOne({_id:id}, (error: any, result: any) => { //memo_controller.tsのfindから値が渡ってくる
      res.json(result);　//MongoDBでクエリしたものをjson形式にしてserviceへ渡す
    })
  });
*/
