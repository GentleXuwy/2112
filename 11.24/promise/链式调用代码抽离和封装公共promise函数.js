// 链式调用代码抽离

// const fs =require('fs')

// // 抽离和封装公共promise函数
// function p(url){
//     return new Promise(function(resolve,reject){
//       fs.readFile(url,(err,data)=>{
//         if(err) reject(err)
//         resolve(data)
//       })
//     })
// }

// // 桃花源记
// p('./桃花源记.md').then((res)=>{
//     return res.toString()
// })
// .then((data)=>{
//     console.log(data);
//     // 出师表
//     p('./出师表.md').then((res)=>{
//         console.log(res.toString());
//     })
// })
// .then(()=>{
//     // 出居庸关
//     p('./出居庸关.md').then((res)=>{
//         console.log(res.toString());
//     })
// })
// console.log('----------------------------------');



// const fs =require('fs')

// // 抽离和封装公共promise函数
// function p(url){
//     return new Promise(function(resolve,reject){
//       fs.readFile(url,(err,data)=>{
//         if(err) reject(err)
//         resolve(data)
//       })
//     })
// }

// // 桃花源记
// p('./桃花源记.md').then((res)=>{
//     return res.toString()
// })
// .then((data)=>{
//     console.log(data);
//     // 出师表
//     p('./出师表.md').then((res)=>{
//         console.log(res.toString());
//     })
// })
// .then(()=>{
//     // 出居庸关
//     p('./出居庸关.md').then((res)=>{
//         console.log(res.toString());
//     })
// })
console.log('----------------------------------');



const fs =require('fs')

// 抽离和封装公共promise函数
function p(url){
    return new Promise(function(resolve,reject){
        fs.readFile(url,(err,data)=>{
            if(err) reject(err)
            resolve(data)
        })
    })
}

// 桃花源记
p('./桃花源记.md').then((res)=>{
    return res.toString()
})
.then((data)=>{
    console.log(data);
    // 出师表
    p('./出师表.md').then((res)=>{
        console.log(res.toString());
    })
})
.then(()=>{
    // 出居庸关
    p('./出居庸关.md').then((res)=>{
        console.log(res.toString());
    })
})





