let express = require("express") //引入express
let Mock = require("mockjs") //引入mock
let app = express() //实列化 express

// 登录
const loginData = require("./common/login.json")
// 左侧导航
const menusData = require("./common/menus.json")

/**登录接口 */
app.use("/login", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...loginData
    })
  )
})

/**侧边栏 */
app.use("/menus", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...menusData
    })
  )
})

/**--------------用户管理页面--------------*/
// 用户管理数据
const usersData = require("./users/users.json")
// 添加用户管理返回的数据
const addUser = require("./users/addUsers.json")
// 编辑用户管理返回的数据
const editUser = require("./users/editUsers.json")
// 删除用户管理返回的数据
const deleteUser = require("./users/deleteUsers")
// 点击修改用户的状态
const typeUser = require("./users/typeUsers.json")
// 确认分配角色
const role = require("./users/role.json")

/**获取用户列表*/
app.use("/users", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...usersData
    })
  )
})

/**添加用户列表*/
app.use("/users", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...addUser
    })
  )
})

/**编辑用户列表*/
app.use("/users/:id", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...editUser
    })
  )
})

/**删除用户列表*/
app.use("/users/:id", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...deleteUser
    })
  )
})

/** 修改用户状态 */
app.use("/users/:uid/state/:type", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...typeUser
    })
  )
})

/**确认分配角色*/
app.use("/users/:id/role", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...role
    })
  )
})

/**-----------权限管理---角色列表---------*/
/**角色列表数据*/
const roles = require("./roles/roles.json")
/**添加角色*/
const addRoles = require("./roles/addRoles.json")
/**删除角色*/
const deleteRoles = require("./roles/deleteRoles.json")
/**编辑角色*/
const editRoles = require("./roles/editRoles.json")
/**更新权限*/
const rightsRoles = require("./roles/rightsRoles.json")
/**分配权限的树形数据*/
const treeRoles = require("./roles/treeRoles.json")

// 角色列表数据
app.use("/roles", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...roles
    })
  )
})

// 添加角色列表
app.use("/roles", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...addRoles
    })
  )
})

// 删除角色列表
app.use("/roles/:id", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...deleteRoles
    })
  )
})

// 编辑提交角色
app.use("/roles/:id", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...editRoles
    })
  )
})

// 权限树形数据
app.use("/rights/:type", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...treeRoles
    })
  )
})

// 确认更新权限
app.use("/roles/:roleid/rights", function (req, res) {
  res.json(
    Mock.mock({
      ...rightsRoles
    })
  )
})

/**-----------权限管理---权限列表---------*/
const rightsList = require("./rights/rights.json")
// 权限列表数据
app.use("/rights/list", function (req, res) {
  res.json(
    Mock.mock({
      ...rightsList
    })
  )
})

/**-----------商品管理---商品列表----------*/
// 获取商品列表
const goodsData = require("./goods/goods.json")
// 商品列表添加的数据
const addGoods = require("./goods/addgoods.json")
// 商品列表的删除
const delGoods = require("./goods/delGoods.json")
// 参数分类列表
const sorting = require("./goods/sorting.json")
// 获取商品列表
app.use("/goods", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...goodsData
    })
  )
})

// 获取商品列表添加的数据
app.use("/goods", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...addGoods
    })
  )
})

// 获取商品列表删除
app.use("/goods/:id", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...delGoods
    })
  )
})
// 获取分类参数
app.use("/categories", function (req, res) {
  res.json(
    Mock.mock({
      ...sorting
    })
  )
})

/**-----------商品管理---商品分类----------*/
// 商品分类的数据
const goodsCate = require("./cate/goodsCate.json")
// 添加商品分类
const addCate = require("./cate/addCate.json")
// 删除商品分类
const delCate = require("./cate/delCate.json")
// 编辑商品分类
const editCate = require("./cate/editCate.json")

// 获取商品分类的数据
app.use("/categories", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...goodsCate
    })
  )
})
// 添加商品分类
app.use("/categories", function (req, res) {
  res.send(
    Mock.mock({
      ...addCate
    })
  )
})

// 编辑商品分类
app.use("/categories/:id", function (req, res) {
  res.send(
    Mock.mock({
      ...editCate
    })
  )
})

// 删除商品分类
app.use("/categories/:id", function (req, res) {
  res.send(
    Mock.mock({
      ...delCate
    })
  )
})

// 静态参数动态参数列表
let attributes = require("./params/attributes.json")
// 添加静态参数或动态参数属性
let addAttributes = require("./params/addAttributes.json")
// 编辑提交参数
let deleteAttributes = require("./params/deleteAttributes.json")
// 删除参数
let editAttributes = require("./params/editAttributes.json")

app.get("/categories/:id/attributes", function (req, res) {
  res.send(
    Mock.mock({
      ...attributes
    })
  )
})
// 静态参数或动态参数列表

app.post("/categories/:id/attributes", function (req, res) {
  res.send(
    Mock.mock({
      ...addAttributes
    })
  )
})
// 添加静态参数或动态参数属性

app.put("/categories/:id/attributes/:attrid", function (req, res) {
  res.send(
    Mock.mock({
      ...editAttributes
    })
  )
})
// 编辑提交参数

app.delete("/categories/:id/attributes/:attrid", function (req, res) {
  res.send(
    Mock.mock({
      ...deleteAttributes
    })
  )
})
// 删除参数

// 订单列表
const orderLedger = require("./order/order.json")
// 修改订单列表
const ordersUpdate = require("./order/ordersUpdate.json")
// 订单详情
const ordersDetails = require("./order/ordersDetails.json")
// 地址信息
const ordersSite = require("./order/ordersSite.json")

// 获取订单分类
app.use("/orders", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...orderLedger
    })
  )
})

// 修改订单分类
app.use("/orders/:id", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...ordersUpdate
    })
  )
})

// 订单信息
app.use("/orders/:id", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...ordersDetails
    })
  )
})

// 地址信息
app.use("/kuaidi/:id", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...ordersSite
    })
  )
})

app.listen("8090", () => {
  console.log("监听端口 8090")
})
