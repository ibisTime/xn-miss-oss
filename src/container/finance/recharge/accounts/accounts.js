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
} from '@redux/finance/recharge/accounts';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
  state => ({
    ...state.rechargeAccounts,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Accounts extends React.Component {
  upOrDown(code, status) {
    Modal.confirm({
      okText: '确认',
      cancelText: '取消',
      content: `确认${status === '0' ? '启用' : '未启用'}该账号吗？`,
      onOk: () => {
        this.props.doFetching();
        return fetch(802024, { code }).then(() => {
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
      field: 'realName',
      title: '账号名称'
    }, {
      field: 'subbranch',
      title: '类型/支行',
      render: (v, d) => {
        if (d.bankCode === 'WeChat' || d.bankCode === 'alipay') {
          return d.bankName;
        }
        return v;
      }
    }, {
      field: 'bankcardNumber',
      title: '卡号'
    }, {
      field: 'amount',
      title: '余额',
      amount: true
    }, {
      field: 'status',
      title: '状态',
      type: 'select',
      data: [{
        dkey: '0',
        dvalue: '未启用'
      }, {
        dkey: '1',
        dvalue: '启用'
      }],
      keyName: 'dkey',
      valueName: 'dvalue'
    }, {
      field: 'remark',
      title: '备注'
    }];
    return this.props.buildList({
      fields,
      pageCode: 802025,
      btnEvent: {
        up: (keys, items) => {
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (items[0].status !== '0') {
            showWarnMsg('当前状态已启用');
          } else {
            this.upOrDown(keys[0], items[0].status);
          }
        },
        down: (keys, items) => {
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (items[0].status !== '1') {
            showWarnMsg('当前状态未启用');
          } else {
            this.upOrDown(keys[0], items[0].status);
          }
        }
      }
    });
  }
}

export default Accounts;
