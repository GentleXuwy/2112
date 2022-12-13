/** 用户列表 */
import http from "../../untils/httpRequest"

// 获取数据
function users(params) {
  return http({ url: http.addorUrl("/users"), method: "get", params }).then((res) => res)
}
// 获取添加数据
function addUsers(data) {
  return http({ url: http.addorUrl("/users"), method: "post", data }).then((res) => res)
}
// 获取修改的数据
function editUser(data) {
  return http({
    url: http.addorUrl(`/users/${data.id}`),
    method: "put",
    data: { email: data.email, mobile: data.mobile }
  }).then((res) => res)
}
// 获取删除数据
function deleteUser(id) {
  return http({
    url: http.addorUrl(`/users/${id}`),
    method: "delete"
  }).then((res) => res)
}
// 修改用户的状态
function typeUser(data) {
  return http({
    url: http.addorUrl(`/users/${data.cid}/state/${data.type}`),
    method: "put"
  }).then((res) => res)
}

function roleList() {
  return http({
    url: http.addorUrl("/roles"),
    method: "get"
  }).then((res) => res)
}

function role(data) {
  return http({
    url: http.addorUrl(`users/${data.id}/role`),
    method: "put",
    data: { rid: data.rid }
  }).then((res) => res)
}

export { users, addUsers, editUser, deleteUser, typeUser, roleList, role }
