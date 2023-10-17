/**
 * @function  判断会员是否过期
 * @param vipEndDate 过期时间（格式为YYYY-MM-DD的字符串）
 * @author  Guangxin(2023-10-16)
 */
export const isVipExpired = (vipEndDate) => {
  const endDate = new Date(vipEndDate)
  const endTime = endDate.getTime()
  const currentTime = new Date().getTime()

  return currentTime - endTime > 0
}
