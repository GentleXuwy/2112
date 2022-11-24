const fs = require('fs')

// 桃花源记
function getPeach() {
    return new Promise(function (resolve, reject) {
        fs.readFile('./桃花源记.md', (err, data) => {
            // if(err) reject(err)
            // resolve(data)
            reject('桃花源记的错误')
        })
    })
}
// 出师表
function getTroops() {
    return new Promise(function (resolve, reject) {
        fs.readFile('./出师表.md', (err, data) => {
            // if(err) reject(err)
            // resolve(data)
            reject('出师表的错误')
        })
    })
}
// 出居庸关
function getAgent() {
    return new Promise(function (resolve, reject) {
        fs.readFile('./出居庸关.md', (err, data) => {
            // if(err) reject(err)
            // resolve(data)
            reject('出居庸关的错误')
        })
    })
}

// 桃花源记
getPeach().then(res => {
    console.log(res, '30');
}).catch(err => {
    console.log(err, '32');
})

    .then((data) => {
        // 出师表
        let result = getTroops().then(res => res.toString())
        console.log(result, '38');
    }).catch(err => {
        console.log(err, '40');
    })

    .then((data1) => {
        console.log(data1);
        // 出居庸关
        getAgent().then(res => {
            console.log(res.toString(), '48');
        })
    }).catch(err => {
        console.log(err, '51');
    })
