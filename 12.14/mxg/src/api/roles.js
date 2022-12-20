import http from "../../untils/httpRequest"

function roles() {
  return http({
    url: http.addorUrl("/roles"),
    method: "get"
  })
}
// 添加
function addRoles(data) {
  return http({
    url: http.addorUrl("/roles"),
    method: "post",
    data: { roleName: data.roleName, roleDesc: data.roleDesc }
  })
}
// 修改的
function editRoles(data) {
  return http({
    url: http.addorUrl(`/roles/${data.id}`),
    method: "put",
    data: { roleName: data.roleName, roleDesc: data.roleDesc }
  })
}
// 删除
function deleteRoles(data) {
  return http({
    url: http.addorUrl(`/roles/${data.id}`),
    method: "delete"
  })
}
// 角色授权
function rightRoles(data) {
  return http({
    url: http.addorUrl(`/roles/${data.roleid}/rights`),
    method: "post",
    data: { rids: data.rids }
  })
}
// 分配权限的
function treeRoles(data) {
  return http({
    url: http.addorUrl(`/rights/${data.type}`),
    method: "get"
  })
}

export { roles, addRoles, editRoles, deleteRoles, rightRoles, treeRoles }
