import http from "../../untils/httpRequest"

// 获取权限列表数据
function rightsList(params) {
  return http({
    url: http.addorUrl("/rights/" + params.type),
    method: "get"
  }).then((res) => res)
}

export { rightsList }
