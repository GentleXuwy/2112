let express = require("express") //引入express
let Mock = require("mockjs") //引入mock
let app = express() //实列化 express

const loginData = require("./common/login.json")
const menusData = require("./common/menus.json")
const usersData = require("./common/users.json")
const rolesData = require("./common/roles.json")

/**登录接口 */
app.use("/login", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...loginData
    })
  )
})

// 侧边栏
app.use("/menus", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...menusData
    })
  )
})

// 获取用户列表
app.use("/users", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...usersData
    })
  )
})

// 获取角色列表
app.use("/roles", function (req, res) {
  console.log(req, "req")
  res.json(
    Mock.mock({
      ...rolesData
    })
  )
})

app.listen("8090", () => {
  console.log("监听端口 8090")
})
