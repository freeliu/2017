//1强类型
var myName:string="liu";
var myAge:number=27;
var any:any="1";
// myName=12;

//2 interface 
interface SuperHero{
    realName:String,
    superName:String
}

var superMan:SuperHero={
    realName:"clark",
    superName:"superMan"
}
var superHeros :SuperHero[];
superHeros.push({
    realName:"",
    superName:""
})
//control + space  无需输入也有属性智能提示
superHeros.push({realName:"",superName:""})

// 3 of
var arr=[3,4,5]
for(var i in arr)
{
    //0,1,2 输出下标
    console.log(i);
    
} 
for (let i of arr)
{
    //3,4,5
    console.log(i);
}

//4 方法指定类型
function getSum(num1:number,num2=2,num3?:number):number
{
  let sum=num1+num2;
  if(num3)
  {
      return sum+num3;
  }
  return sum;
}

//5 ...参数
var sumAll=function(...nums:number[]):void
{
    //todo
    var sum =nums.reduce((a,b)=>a+b,0);
    console.log(sum);
}

//6 箭头方法
var addOne=(x)=>x+1;

//7类

class Animal{
    public favFood:String;
    //静态变量、类变量
    static numOfAnimals:number=0;
    //构造函数
    constructor(private name:string,private owner:string)
    {
        Animal.numOfAnimals++;
    }
    static howManyAnimals():number
    {
        return Animal.numOfAnimals;
    }

    private _weight:number;
    get weight():number{
     return this._weight;
    }
    set weight(weight:number){
        this._weight=weight;
    }

}
//8类继承
class Dog extends Animal{
    constructor(name:string,owner:string)
    {
        super(name,owner);
        //todo
        Dog.numOfAnimals++;
    }
}
//9接口继承
interface Vehicle{
    drive():any;
}
class Car implements Vehicle{
    constructor(private wheels:number){

    }
    drive():void{
     console.log(this.wheels);
    }
}
//10 泛型
function GetType<T>(val:T):string{
    return typeof(val);
}
console.log(GetType(1));

class GenericNumber<T>{
    add:(val1:T,val2:T)=>T; 
}
var aNumber=new GenericNumber<number>();
aNumber.add=function(x,y){return x+y};
var aStrnum=new GenericNumber<string>();
aStrnum.add=function(x,y){return String(Number(x)+Number(y)) }

//11 批量赋值
var randVals={x:1,y:2,z:3};
var {x,y,z}=randVals;
console.log(x+y+z);
[x,y,z]=[z,y,x];
console.log(""+x+y+z);

//12 模板字符串
var multStr=`i am 
liurc
`
console.log(`dd${multStr}dd`);

//13 拆分数组
var arr=[4,5,6];
function addArr(a,b,c):void{
    console.log(a+b+c);
};
//todo
// addArr(...arr);

//14 enum