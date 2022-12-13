import http from "../../untils/httpRequest"

function roles() {
  return http({
    url: http.addorUrl("/roles"),
    method: "get"
  })
}

function addRoles(data) {
  return http({
    url: http.addorUrl("/roles"),
    method: "post",
    data: { roleName: data.roleName, roleDesc: data.roleDesc }
  })
}

function editRoles(data) {
  return http({
    url: http.addorUrl(`/roles/${data.id}`),
    method: "put",
    data: { roleName: data.roleName, roleDesc: data.roleDesc }
  })
}

function deleteRoles(data) {
  return http({
    url: http.addorUrl(`/roles/${data.id}`),
    method: "delete"
  })
}

function rightRoles(data) {
  return http({
    url: http.addorUrl(`/roles/${data.roleid}/rights`),
    method: "post",
    data: { rids: data.rids }
  })
}

function treeRoles(data) {
  return http({
    url: http.addorUrl(`/rights/${data.type}`),
    method: "get"
  })
}

export { roles, addRoles, editRoles, deleteRoles, rightRoles, treeRoles }
