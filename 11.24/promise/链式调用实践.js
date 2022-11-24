const fs =require('fs')

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
    return new Promise(function(resolve,reject){
        fs.readFile('./出师表.md',(err,data)=>{
            if(err) reject(err)
            resolve(data)
        })
    })
}
// 出居庸关
function getAgent(){
    return new Promise(function(resolve,reject){
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
    let result=getTroops().then(res=>res.toString())
    return result+data
}).then((data1)=>{
    console.log(data1);
    // 出居庸关
    getAgent().then((res=>{
        console.log(res.toString());
    }))
})