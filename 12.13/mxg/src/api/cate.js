import http from "../../untils/httpRequest"

// 获取商品分类
function GoodsCate(params = {}) {
  return http({
    url: http.addorUrl("/categories"),
    method: "get",
    params: {
      type: params.type,
      pagenum: params.pagenum,
      pagesize: params.pagesize
    }
  })
}
// 商品分类添加
function cateAdd(data) {
  return http({
    url: http.addorUrl("/categories"),
    method: "post",
    data: {
      cat_level: data.cat_level,
      cat_name: data.cat_name,
      cat_pid: data.cat_pid
    }
  })
}

// 商品分类删除
function cateDel(data) {
  return http({
    url: http.addorUrl(`/categories/${data.id}`),
    method: "delete"
  })
}
// 商品分类修改
function cateEdit(data) {
  return http({
    url: http.addorUrl(`/categories/${data.id}`),
    method: "put",
    data: { cat_name: data.cat_name }
  })
}

// 导出
export { GoodsCate, cateAdd, cateDel, cateEdit }
