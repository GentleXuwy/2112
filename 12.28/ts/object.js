// declare function create(o:object | null) : void
// create ({props :0})
// create (null)
var obj;
obj = { name: '张三', age: 123 };
console.log(obj);
var CODE3;
(function (CODE3) {
    CODE3[CODE3["SUCCESS"] = 200] = "SUCCESS";
    CODE3[CODE3["ERROR"] = 400] = "ERROR";
    CODE3[CODE3["WARING"] = 401] = "WARING";
})(CODE3 || (CODE3 = {}));
console.log(CODE3['SUCCESS']);
console.log(CODE3.ERROR);
console.log(CODE3, ['WARING']);
var CODE1;
(function (CODE1) {
    CODE1[CODE1["SUCCESS"] = 0] = "SUCCESS";
    CODE1[CODE1["ERROR"] = 400] = "ERROR";
    CODE1[CODE1["WARING"] = 401] = "WARING";
})(CODE1 || (CODE1 = {}));
console.log(CODE1['SUCCESS']);
console.log(CODE1.ERROR);
console.log(CODE1, ['WARING']);
