# SmpAngular3

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

```ts

import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {stringifyTask} from "@angular/compiler-cli/ngcc/src/execution/tasks/utils";

let a:number         =   1.0;
let b:string         =   "1";

let c:boolean        =   true;
let f:()=>void       =   () => {}

console.log(a);


const x:(callback:() => void)=>void = () => {};

const small = (n:any) => {
  console.log(n.a);
  n.a =9;
}

let x :any ={a:1};
small(x);
small(x);

primityve
format
boolean
string

object
array


let dimantion:{x:number,y:number} = {x:20,y:10};


const a number[] = [];


a.push(10)
a.push(10)
a.push(10)
a.push(10)
a.push(10)
a.push(10)
console.log(a)


a[5] = 100;
console.log(a)

let dim:{x:number,y:number} = {x:1,y:2};

console.log(dim.x);
console.log(dim["x"]);


let array:number[] = [1000,20000]

console.log(array[0]);

392894857438952789475283745928745

48が100番地
100番地から
100+0  48


オブジェクト　クラス

スコープ　見える範囲
ポータブル　持ち運び可能


class Hoge {
  private x :number; //privateなのでHogeの外からは見えない

  constructor(n:number) {
    this.x = n;  //Hogeの本体？みたいなもの
  }

  public getX():number{
    return this.x;　
  }

  public putX(X:number):void{
    this.x = X;
  }

}

const XX = new Hoge(1); //Hogeは設計図(定義)でnewってすると実体化する

XX.putX(10);
console.log(XX.getX());


/*
class Inu {
  private nakigoe :string;

  constructor() {
    this.nakigoe = "wan"
  }

  public Naku():string{
    return this.nakigoe;　
  }

  public setNakigoe(koe:string):void{
    this.nakigoe = koe;
  }

}

const pochi = new Inu();

pochi.setNakigoe("kyan");
console.log(pochi.Naku());
*/


class Uma {
  private speed: string;
  private weight: number;
  private rank: number;

  constructor() {
    this.speed = "row"
    this.weight = 100
    this.rank = 10
  }

  public speedResult(): string {
    return this.speed;
  }

  public weightResult(): number {
    return this.weight;
  }

  public rankResult(): number {
    return this.rank;
  }

  public setSpeed(speedConversion: string): void {
    this.speed = speedConversion;
  }

  public setWeight(weightConversion:number): void {
    this.weight = weightConversion;
  }

  public setRank(rankConversion:number): void {
    this.rank = rankConversion;
  }


}

const makibaou = new Uma();
const airforia = new Uma();
const deeppond = new Uma();
const aristteres = new Uma();
const titileholder = new Uma();

makibaou.setSpeed("fast");
makibaou.setWeight(400);
makibaou.setRank(1);

airforia.setSpeed("middle");
airforia.setWeight(400);
airforia.setRank(3);

deeppond.setSpeed("row");
deeppond.setWeight(500);
deeppond.setRank(4);

aristteres.setSpeed("fast");
aristteres.setWeight(500);
aristteres.setRank(2);

titileholder.setSpeed("row");
titileholder.setWeight(600);
titileholder.setRank(5);

console.log(makibaou);
console.log(airforia);
console.log(deeppond);
console.log(aristteres);
console.log(titileholder);

```
