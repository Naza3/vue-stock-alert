export interface Candlestick {
  code: string
  name: string
  current: number
  open: number
  high: number
  low: number
  increaseRate: number
  increaseSpeed: number
  volume: number
  amount: number
}
// 东方财富数据字段解析
// f1
// f2 当前价格 * 100
// f3 涨幅*100
// f4 涨跌价 * 100
// f5 成交量
// f6 成交额
// f7 振幅 * 100
// f8 换手 * 100
// f9 动态PE
// f10 量比 * 100
// f11
// f12 股票代码
// f13
// f14 股票名称
// f15 最高价 * 100
// f16 最低价 * 100
// f17 开盘价 * 100
// f18 昨日收盘价* 100
// f19
// f20 AB股总市值
// f21 流通市值
// f22
// f23
// f24
// f25 年初至今涨幅 * 100
// f26 上市日期
