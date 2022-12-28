
// declare function create(o:object | null) : void
// create ({props :0})
// create (null)

let obj :{name:String,age:number}
obj={name:'张三',age:123}
console.log(obj);



//enum
enum CODE3{
    SUCCESS=200,
    ERROR=400,
    WARING=401
}
console.log(CODE3['SUCCESS']);
console.log(CODE3.ERROR);
console.log(CODE3,['WARING']);

enum CODE1{
    SUCCESS,
    ERROR=400,
    WARING,
}
console.log(CODE1['SUCCESS']);
console.log(CODE1.ERROR);
console.log(CODE1,['WARING']);



//void
function getName1(name:string,age:number):void{
    console.log();
    
}

function getName2(name:string,age:number):string{
    return name+age
}