/**
 * @function  判断会员是否过期
 * @param vipEndDate 过期时间（格式为YYYY-MM-DD的字符串）
 * @return true / false
 * @author  Guangxin(2023-10-16)
 */
export const isVipExpired = (vipEndDate) => {
  const endDate = new Date(vipEndDate)
  const endTime = endDate.getTime()
  const currentTime = new Date().getTime()

  return currentTime - endTime > 0
}

/**
 * @function  获取最近七日的日期
 * @param 无
 * @return 含有七项的数组，例如：['2023-10-26', '2023-10-27', ...]
 * @author  Guangxin(2023-11-01)
 */
export const nearest7days = () => {
  let dates = []
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const timestamp = today.getTime()
    const timestampPerDay = 24 * 60 * 60 * 1000 // 一天的毫秒数
    const iDayAgoTimeStamp = timestamp - i * timestampPerDay
    const iDayDate = new Date(iDayAgoTimeStamp)
    const year = iDayDate.getFullYear()
    const month = ('0' + (iDayDate.getMonth() + 1)).slice(-2)
    const day = ('0' + iDayDate.getDate()).slice(-2)
    dates.unshift(year + '-' + month + '-' + day)
  }
  return dates
}
