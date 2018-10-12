import fetch from 'common/js/fetch';
import { getUserName, getUserId, judgeStatus } from 'common/js/util';
import { PIC_PREFIX } from 'common/js/config';

export function setRoleMenus(menuCodeList, roleCode) {
  return fetch(630027, {
    menuCodeList,
    roleCode,
    updater: getUserId()
  });
}
// 注销激活平台用户
export function activateSysUser(userId) {
  return fetch(630056, { userId, updater: getUserId() });
}
// 注销激活c端用户
export function activateUser(userId) {
  return fetch(805084, { userId, updater: getUserId() });
}

// 获取用户详情
export function getUser() {
  return getUserById(getUserId());
}

// 获取用户详情
export function getUserById(userId) {
  return fetch(630067, { userId });
}

// 为用户设置岗位
export function setUserPost(params) {
  return fetch(630058, {
    ...params,
    updater: getUserId()
  });
}
// 列表查询平台用户
export function getSysUsers() {
  return fetch(630066, { status: '0' });
}

// 判断用户是否被注销
export function isIllegalUser() {
  return getUser().then(data => {
    let url = judgeStatus(data.status);
    return { url, user: data };
  });
}
