
// 封装Promise函数获取数据的js

// 引入
// const fs = require('fs')

// const p = new Promise(function (resolve, reject) {
//     fs.readFile('./1.md', (err, data) => {
//         // 失败
//         if (err) reject(err)
//         // 成功
//         resolve(data)
//     })
// })

// p.then(function (value) {
//     console.log(value.toString());
// }, function (reason) {
//     console.log("读取失败")
// })
// console.log('---------------------------');


// 引入
// const fs = require('fs')

// const p = new Promise(function (resolve, reject) {
//     fs.readFile('./1.md', (err, data) => {
//         // 失败
//         if (err) reject(err)
//         // 成功
//         resolve(data)
//     })
// })

// p.then(function (value) {
//     console.log(value.toString());
// }, function (reason) {
//     console.log("读取失败")
// })
// console.log('---------------------------');


// 引入
const fs = require('fs')

const p = new Promise(function (resolve, reject) {
    fs.readFile('./1.md', (err, data) => {
        // 失败
        if (err) reject(err)
        // 成功
        resolve(data)
    })
})

p.then(function (value) {
    console.log(value.toString());
}, function (reason) {
    console.log("读取失败")
})