//交叉类型 &
interface use{
    name:string,
    age:number
}

interface per{
    sex:number
}

type allInfo =use &per
let person :use & per ={name:'张三',age:1,sex:1}


// interface
// l类似对象:{} 代码块
// 接口的高阶用法
interface Person{
    name:string,
    age:number,
    sex:number,
    isJob:boolean,
    hobby:string[],
    former:number,
    formerNmae:[string,string,string]
}

let person1 :Person={
    name:'张三',
    age:18,
    sex:1,
    isJob:false,
    hobby:['睡觉','学习','吃饭'],
    former:0,
    formerNmae:['a','b','c']
}