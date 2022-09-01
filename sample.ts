/*

class  DBError {
  public message:string = "err1";
}

class  ServerError {
  public Message:string = "err2";
}


const callback = (errorObject:any) => {

}

const error1= new ServerError();

callback({dberror:error1})

*/
/*

function x(x:any):void {
  console.log(x.a);
  console.log(x.b);
}

x({a:1,b:4})

const y = (x:any):void => {
  console.log(x.a);
  console.log(x.b);
}

const z = function (x:any):void  {
  console.log(x.a);
  console.log(x.b);
}

*/
/*
class Doubutu implements Dousa {
  public medama:string = "black";
  public ashi:number = 4;
  public shippo:number = 1;
  public taion:number = 36;

  public aruku():void {

  }

  public oyogu():void {

  }

  public naku():void {

  }
}


class Inu extends Doubutu {

  public hoeru() {

  }

}

interface Dousa {
   aruku():void;
   naku():void;
}

const pochi:Dousa = new Inu();
pochi.hoeru();
pochi.naku();
*/

try {
  throw 'Something bad happened';
}
catch(e) {
  console.log(e);
}
throw {message:"hoge"}
