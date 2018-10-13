import fetch from 'common/js/fetch';
import { getUserId } from 'common/js/util';

/**
 * 根据用户编号查询账户列表
 * @param userId  用户编号
 * @param currency 币种
 */
export function getAccountsByUserId(userId, currency) {
  return fetch(803503, { userId, currency });
}
/**
 * 根据当前登录用户编号查询账户列表
 * @param currency 币种
 */
export function getAccountsByCurUserId(currency) {
  return getAccountsByUserId(getUserId(), currency);
}
/**
 * 列表查询各端账户总余额
 */
export function getClientAccounts() {
  return fetch(803302);
}
