import { getAccountsByUserId, getClientAccounts } from 'api/account';
import { SYS_USER } from 'common/js/config';

const PREFIX = 'PLATFORM_ACCOUNT_';
const SET_WX_ACCOUNT = PREFIX + 'SET_WX_ACCOUNT';
const SET_OFFLINE_ACCOUNT = PREFIX + 'SET_OFFLINE_ACCOUNT';
const SET_CNY_ACCOUNT = PREFIX + 'SET_CNY_ACCOUNT';
const SET_CCLIENT_ACCOUNT = PREFIX + 'SET_CCLIENT_ACCOUNT';
const LOADING = PREFIX + 'LOADING';
const CANCEL_LOADING = PREFIX + 'CANCEL_LOADING';

// ALIPAY、WEIXIN、OFFLINE、CNY、JF、TPP
const initState = {
  wxAccount: {},
  offAccount: {},
  cnyAccount: {},
  cClientAccount: {},
  fetching: true
};

export function platformAccount(state = initState, action) {
  switch(action.type) {
    case SET_WX_ACCOUNT:
      return {...state, wxAccount: action.payload};
    case SET_OFFLINE_ACCOUNT:
      return {...state, offAccount: action.payload};
    case SET_CNY_ACCOUNT:
      return {...state, cnyAccount: action.payload};
    case SET_CCLIENT_ACCOUNT:
      return {...state, cClientAccount: action.payload};
    case LOADING:
      return {...state, fetching: true};
    case CANCEL_LOADING:
      return {...state, fetching: false};
    default:
      return state;
  }
}

// 显示loading
function doFetching() {
  return { type: LOADING };
}

// 隐藏loading
function cancelFetching() {
  return { type: CANCEL_LOADING };
}
// 设置平台微信账户
function setWXAccount(data) {
  return { type: SET_WX_ACCOUNT, payload: data };
}
// 设置平台线下充值账户
function setOffAccount(data) {
  return { type: SET_OFFLINE_ACCOUNT, payload: data };
}
// 设置平台盈亏账户
function setCnyAccount(data) {
  return { type: SET_CNY_ACCOUNT, payload: data };
}
// 设置用户总余额
function setCClientAccount(data) {
  return { type: SET_CCLIENT_ACCOUNT, payload: data };
}
// 初始化页面数据
export function initData() {
  return dispatch => {
    dispatch(doFetching());
    Promise.all([
      getAccountsByUserId(SYS_USER)
      // getClientAccounts()
    ]).then(([accounts, accounts1]) => {
      dispatch(cancelFetching());
      accounts.forEach(account => {
        if (account.accountNumber === 'SYS_ACOUNT_WEIXIN_TG') {
          dispatch(setWXAccount(account));
        } else if (account.accountNumber === 'SYS_ACOUNT_OFFLINE_TG') {
          dispatch(setOffAccount(account));
        } else if (account.accountNumber === 'SYS_ACOUNT_CNY') {
          dispatch(setCnyAccount(account));
        }
      });
      // accounts1.forEach(account => {
      //   // 用户总余额
      //   if (account.type === 'C' && account.currency === 'CNY') {
      //     dispatch(setCClientAccount(account));
      //   }
      // });
    }).catch(() => dispatch(cancelFetching()));
  };
}
