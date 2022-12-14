import http from "../../untils/httpRequest"
// 获取
function getAttr(params) {
  return http({
    url: http.addorUrl(`/categories/${params.id}/attributes`),
    method: "get",
    params: {
      sel: params.sel
    }
  })
}
// 添加
function addAttrs(data) {
  return http({
    url: http.addorUrl(`/categories/${data.id}/attributes`),
    method: "post",
    data: {
      arrt_name: data.arrr_name,
      arrt_sel: data.arrt_sel,
      arrt_vals: data.arrt_vals
    }
  })
}
// 修改
function editAttr(data) {
  return http({
    url: http.addorUrl(`/categories/${data.id}/attributes/${data.attrid}`),
    method: "put",
    data: {
      arrt_name: data.arrr_name,
      arrt_sel: data.arrt_sel,
      arrt_vals: data.arrt_vals
    }
  })
}
// 删除
function delAttr(data) {
  return http({
    url: http.addorUrl(`/categories/${data.id}/attributes/${data.attrid}`),
    method: "delete"
  })
}

export { getAttr, addAttrs, editAttr, delAttr }
