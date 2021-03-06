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
} from '@redux/finance/withdraw/records';
import { listWrapper } from 'common/js/build-list';
import { dateTimeFormat, showWarnMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.withdrawRecords,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Records extends React.Component {
  render() {
    const fields = [{
      field: 'code',
      title: '编号',
      search: true
    }, {
      field: 'type',
      title: '角色类型',
      type: 'select',
      key: 'account_type'
      // search: true
    }, {
      field: 'payCardInfo',
      title: '银行类型'
    }, {
      field: 'payCardNo',
      title: '银行卡号'
    }, {
      field: 'accountName',
      title: '户名'
      // search: true
    }, {
      field: 'amount',
      title: '取现金额',
      amount: true
    }, {
      field: 'fee',
      title: '手续费',
      amount: true
    }, {
      field: 'status',
      title: '状态',
      type: 'select',
      key: 'withdraw_status',
      search: true
    }, {
      field: 'applyUser',
      title: '申请人',
      render: (v, d) => `${d.user.loginName}`
    }, {
      field: 'applyDatetime',
      title: '申请时间',
      type: 'date',
      rangedate: ['applyDateStart', 'applyDateEnd'],
      render: dateTimeFormat
      // search: true
    }, {
      field: 'approveUser',
      title: '审核人'
    }, {
      field: 'approveDatetime',
      title: '审核时间',
      type: 'date',
      rangedate: ['approveDateStart', 'approveDateEnd'],
      render: dateTimeFormat
      // search: true
    }, {
      field: 'payUser',
      title: '回录人'
    }, {
      field: 'payFee',
      title: '打款手续费',
      amount: true
    }, {
      field: 'payDatetime',
      title: '回录时间',
      type: 'date',
      rangedate: ['payDateStart', 'payDateEnd'],
      render: dateTimeFormat
      // search: true
    }];
    return this.props.buildList({
      fields,
      pageCode: 803755,
      searchParams: {
        channelType: 90
      }
    });
  }
}

export default Records;
