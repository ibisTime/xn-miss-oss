import fetch from 'common/js/fetch';
import { setUser, getUserId, setRoleInfo, getRoleCode, getUserName,
  judgeStatus } from 'common/js/util';
import { getUser } from 'api/user';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';
const LOAD_DATA = 'LOAD_DATA';
const SET_USERINFO = 'SET_USERINFO';
const LOADING = 'LOADING';
const CANCEL_LOADING = 'CANCEL_LOADING';

const initState = {
  fetching: false,
  redirectTo: '',
  msg: '',
  userId: getUserId() || '',
  loginName: getUserName() || '',
  roleCode: getRoleCode() || ''
};

export function user (state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {...state, msg: ''};
    case LOAD_DATA:
      return {...state, ...action.payload, redirectTo: action.redirectTo};
    case SET_USERINFO:
      return {...state, ...action.payload};
    case LOGOUT:
      return {...initState, redirectTo: '/login'};
    case LOADING:
      return {...state, fetching: true};
    case CANCEL_LOADING:
      return {...state, fetching: false};
    default:
      return state;
  }
}

// 登录成功
function loginSuccess (data) {
  return { type: LOGIN_SUCCESS, payload: data };
}

function doFetching() {
  return { type: LOADING };
}

export function cancelFetching() {
  return { type: CANCEL_LOADING };
}

// 获取用户信息成功
export function loadData(data, redirectTo = '/') {
  setRoleInfo(data);
  return { type: LOAD_DATA, payload: data, redirectTo };
}

// 设置用户信息
export function setUserInfo(data) {
  setRoleInfo(data);
  return { type: SET_USERINFO, payload: data };
}

// 登录
export function login({ loginName, loginPwd }) {
  return dispatch => {
    dispatch(doFetching());
    fetch(630051, { loginName, loginPwd }).then(data => {
      setUser(data);
      dispatch(loginSuccess());
    }).then(() => {
      return getUser().then(data => {
        dispatch(cancelFetching());
        let url = judgeStatus(data.status) || '/';
        dispatch(loadData(data, url));
      });
    }).catch(msg => {
      dispatch(cancelFetching());
    });
  };
}
