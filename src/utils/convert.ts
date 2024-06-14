/**
 * 根据以下规则将字符串改为复合东方财富股票规则的字符串：
 * - 过滤字符串长度小于6的字符串，取前六位数字
 * - 对于以 '6' 开头的字符串，在前面加上 '1.'
 * - 对于其他字符串，在前面加上 '0.'
 * @param symbols 字符串数组
 * @returns 处理后的字符串数组
 */
function formatStockStrings(symbols: string[]): string[] {
  return symbols
    .filter((str) => str.length >= 6)
    .map((str) => str.slice(0, 6))
    .map((str) => {
      if (str.startsWith('6')) {
        return `1.${str}`
      } else {
        return `0.${str}`
      }
    })
}
export { formatStockStrings }
