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
} from '@redux/biz/user/users';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';
import { activateUser } from 'api/user';

const typeDict = {
  'P': '平台',
  'O': '产权',
  'M': '养护',
  'A': '代理商',
  'S': '业务员'
};

@listWrapper(
  state => ({
    ...state.userUsers,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Users extends React.Component {
  rockOrActive(status, code) {
    Modal.confirm({
      okText: '确认',
      cancelText: '取消',
      content: `确认${status === '0' ? '注销' : '激活'}用户？`,
      onOk: () => {
        this.props.doFetching();
        return activateUser(code).then(() => {
          this.props.getPageData();
          showWarnMsg('操作成功');
        }).catch(() => {
          this.props.cancelFetching();
        });
      }
    });
  }
  render() {
    const fields = [{
      title: '手机号',
      field: 'mobile'
    }, {
      title: '推荐人',
      field: 'userReferee',
      render: (v, d) => {
        if (d.refereeUser) {
          return `${d.refereeUser.mobile}(${typeDict[d.userRefereeType]})`;
        }
        return '';
      }
    }, {
      title: '昵称',
      field: 'nickname'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'user_status',
      search: true
    }, {
      title: '注册时间',
      field: 'createDatetime',
      type: 'datetime'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildList({
      fields,
      rowKey: 'userId',
      pageCode: 805120,
      btnEvent: {
        // 账户查询
        accounts: (keys, items) => {
          if (!keys || !keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/user/users/accounts?code=${keys[0]}`);
          }
        },
        // 激活
        active: (keys, items) => {
          if (!keys || !keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (items[0].status === '0') {
            showWarnMsg('该用户已被激活');
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
            showWarnMsg('该用户已被注销');
          } else {
            this.rockOrActive(items[0].status, keys[0]);
          }
        },
        // 签到记录
        signIn: (keys, items) => {
          if (!keys || !keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/user/users/signIn?code=${keys[0]}`);
          }
        }
      }
    });
  }
}

export default Users;
