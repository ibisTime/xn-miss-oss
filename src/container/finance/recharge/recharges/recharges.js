import React from 'react';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/finance/recharge/recharges';
import { listWrapper } from 'common/js/build-list';
import { dateTimeFormat, showWarnMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.rechargeRecharges,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Recharges extends React.Component {
  render() {
    const fields = [{
      field: 'code',
      title: '编号'
    }, {
      field: 'realName',
      title: '户名',
      search: true
    }, {
      field: 'amount',
      title: '充值金额',
      amount: true
    }, {
      field: 'currency',
      title: '币种',
      type: 'select',
      key: 'currency',
      search: true
    }, {
      field: 'status',
      title: '状态',
      type: 'select',
      key: 'charge_status',
      search: true
    }, {
      field: 'applyUser',
      title: '申请人'
    }, {
      field: 'applyDatetime',
      title: '申请时间',
      render: dateTimeFormat,
      type: 'date',
      rangedate: ['applyDateStart', 'applyDateEnd'],
      search: true
    }, {
      field: 'payUser',
      title: '审核人'
    }, {
      field: 'payDatetime',
      title: '审核时间',
      render: dateTimeFormat,
      type: 'date',
      rangedate: ['payDateStart', 'payDateEnd'],
      search: true
    }];
    return this.props.buildList({
      fields,
      pageCode: 802345,
      searchParams: {
        channelType: '90'
      },
      btnEvent: {
        check: (keys, items) => {
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (items[0].status !== '1') {
            showWarnMsg('当前状态不能审核');
          } else {
            this.props.history.push(`/recharge/recharges/addedit?code=${keys[0]}&check=1&v=1`);
          }
        }
      }
    });
  }
}

export default Recharges;
