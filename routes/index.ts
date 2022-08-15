var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// スキーマ

var MemoScheme = new Schema({
  title: String,
  desc: String,
  url: String
});

mongoose.connect('mongodb://localhost/memo');

let Memo = mongoose.model('memo', MemoScheme);

/* GET home page. */
router.get('/memo/list/:type', function (request: any, res: any, next: any) {
    const type = request.params.type;
    Memo.find({type: type}, (err: any, result: any) => {
      res.json(result);
    });
  });

router.post('/memo/create', function (request: any, res: any, next: any) {
    const type = request.body;
    Memo.find({type: type}, (err: any, result: any) => {
      const body = request.body;
      const newmemo = new Memo(body);
      newmemo.save();
      res.json(result);
    });
  });


router.put('/memo/update/:id', function (request: any, res: any, next: any) {
  const id = request.params.id;
  const body = request.body;
  Memo.updateOne({_id: id}, body,(err: any, result: any) => {
    res.json(result);
  });
});

/* GET home page. */
router.delete('/memo/delete/:id',
  function (request: any, res: any, next: any) {
    const id = request.params.id;
    Memo.deleteOne({_id: id}, (err: any, result: any) => {
      res.json(result);
    });
  });

module.exports = router;
