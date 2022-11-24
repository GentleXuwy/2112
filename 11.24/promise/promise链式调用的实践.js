/**
* 链式调用:
* 语法结构: promise().then().then().then().catch()
* 特点：在上一个then里面，return 一个返回值，在下一个then里面可以获取到返回的值
* 可以一直then下去，每个then不会相互阻碍
* 在其中一个then里面return 一个值，下一个then是可以获取到当前值的
**/

const fs = require('fs')

// 桃花源记
function getPeach(){
   return new Promise(function(resolve,reject){
    fs.readFile('./桃花源记.md',(err,data)=>{
        if(err) reject(err)
        resolve(data)
    })
   })
}

// 出师表
function getTroops(){
    return new Promise(function(resolve, reject) {
        fs.readFile('./出师表.md',(err,data)=>{
            if(err) reject(err)
            resolve(data)
        })
    })
}

// 出居庸关
function getAgent(){
    return new Promise(function(resolve, reject) {
        fs.readFile('./出居庸关.md',(err,data)=>{
            if(err) reject(err)
            resolve(data)
        })
    })
}

// 桃花源记
getPeach().then(res=>{
    console.log(res.toString());
}).then((data)=>{
    // 出师表
    let result= getTroops().then(res=>res.toString())
    return result+data
}).then((data1)=>{
    console.log(data1);
    // 出居庸关
    getAgent().then(res=>{
        console.log(res.toString());
    })
})


