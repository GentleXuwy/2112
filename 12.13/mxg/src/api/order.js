import http from "../../untils/httpRequest"

function orders(params) {
  return http({
    url: http.addorUrl("/orders"),
    method: "get",
    params: {
      query: params.query,
      pagenum: params.pagenum,
      pagesize: params.pagesize,
      user_id: params.user_id,
      pay_status: params.pay_status,
      is_send: params.is_send,
      order_fapiao_title: params.order_fapiao_title,
      order_fapiao_company: params.order_fapiao_company,
      order_fapiao_content: params.order_fapiao_content,
      consignee_addr: params.consignee_addr
    }
  })
}

function kdOrders(params) {
  return http({
    url: http.addorUrl(`/kuaidi/${params.id}`),
    method: "get"
  })
}

export { orders, kdOrders }
