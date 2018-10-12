import React from 'react';
import { Modal } from 'antd';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/security/user';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import { activateSysUser } from 'api/user';

@listWrapper(
  state => ({
    ...state.securityUser,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class User extends React.Component {
  rockOrActive(status, code) {
    Modal.confirm({
      okText: '确认',
      cancelText: '取消',
      content: `确认${status === '0' ? '注销' : '激活'}用户？`,
      onOk: () => {
        this.props.doFetching();
        return activateSysUser(code).then(() => {
          this.props.getPageData();
          showSucMsg('操作成功');
        }).catch(() => {
          this.props.cancelFetching();
        });
      }
    });
  }
  render() {
    const fields = [{
      title: '用户名',
      field: 'keyword',
      search: true,
      render: (v, data) => {
        return data.loginName;
      }
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'sys_user_status'
    }, {
      title: '角色',
      field: 'roleCode',
      type: 'select',
      listCode: '630007',
      keyName: 'code',
      valueName: 'name',
      search: true
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildList({
      fields,
      pageCode: 630065,
      rowKey: 'userId',
      btnEvent: {
        // 重置密码
        reset: (keys) => {
          if (!keys || !keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/system/user/pwd_reset?userId=${keys[0]}`);
          }
        },
        // 激活
        active: (keys, items) => {
          if (!keys || !keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (items[0].status === '0') {
            showWarnMsg('该用户已激活');
          } else {
            this.rockOrActive(items[0].status, keys[0]);
          }
        },
        // 注销
        rock: (keys, items) => {
          if (!keys || !keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (items[0].status !== '0') {
            showWarnMsg('该用户已注销');
          } else {
            this.rockOrActive(items[0].status, keys[0]);
          }
        },
        // 设置角色
        assign: (keys) => {
          if (!keys || !keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/system/user/role?userId=${keys[0]}`);
          }
        }
      }
    });
  }
}

export default User;
