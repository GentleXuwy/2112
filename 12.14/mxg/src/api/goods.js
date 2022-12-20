import http from "../../untils/httpRequest"

// 获取数据
function getGoods(params) {
  return http({ url: http.addorUrl("/goods"), method: "get", params }).then((res) => res)
}
// 获取添加的数据
function addGoods(data) {
  return http({ url: http.addorUrl("/goods"), method: "post", data }).then((res) => res)
}
// 获取删除的数据
function delGoods(id) {
  return http({ url: http.addorUrl(`/goods/${id}`), method: "delete" }).then((res) => res)
}
// 修改
function editGoods(data) {
  return http({
    url: http.addorUrl(`/goods/${data.id}`),
    method: "put",
    data: {
      goods_name: data.goods_name,
      goods_cat: data.goods_cat,
      goods_price: data.goods_price,
      goods_number: data.goods_number,
      goods_weight: data.goods_weight,
      goods_introduce: data.goods_introduce,
      pics: data.pics,
      attrs: data.attrs
    }
  })
}

// 导出
export { getGoods, addGoods, delGoods, editGoods }
