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
app.get("/roles", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...roles
    })
  )
})

// 添加角色列表
app.post("/roles", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...addRoles
    })
  )
})

// 删除角色列表
app.delete("/roles/:id", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...deleteRoles
    })
  )
})

// 编辑提交角色
app.put("/roles/:id", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...editRoles
    })
  )
})

// 权限树形数据
app.get("/rights/:type", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...treeRoles
    })
  )
})

// 确认更新权限
app.post("/roles/:roleid/rights", function (req, res) {
  res.json(
    Mock.mock({
      ...rightsRoles
    })
  )
})

/**-----------权限管理---权限列表---------*/
const rightsList = require("./rights/rights.json")
// 权限列表数据
app.get("/rights/list", function (req, res) {
  res.json(
    Mock.mock({
      ...rightsList
    })
  )
})

app.listen("8090", () => {
  console.log("监听端口 8090")
})
