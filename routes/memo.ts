var express = require('express');//expressを呼び出すアクション(require('express'))をexpressでまとめる
var router = express.Router();  //expressのrouterにあるget post 等を使用できるようにする

const memoController = require("./memo_controller")
const controller = new memoController();

//MongoDB上からデータを受け取る
//　.get('/', function (req, res)の形
router.get('/memo/list/:query',//
  (req: any, res: any, next: any) => { //request 受ける側　response返す側
    const encoded_query_string = req.params.query; //req.paramsでqueryの値を取得する
    const query_string = decodeURIComponent(encoded_query_string); //
    const query = JSON.parse(query_string);
    controller.find(query, (error: any, result: any) => {
      res.json(result);
    })
  });

//MongoDB上に新しいmemoデータを作成する
//.post('/', function (req, res)の形
router.post('/memo/create', (request: any, res: any, next: any) => {
    const body = request.body;
    controller.create(body, (error: any, result: any) => {
      res.json(result);
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

module.exports = router;
