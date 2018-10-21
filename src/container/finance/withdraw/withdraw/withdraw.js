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
} from '@redux/finance/withdraw/withdraw';
import { listWrapper } from 'common/js/build-list';
import { dateTimeFormat, showWarnMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.withdrawWithdraw,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Withdraw extends React.Component {
  render() {
    const fields = [{
      field: 'code',
      title: '编号'
    }, {
      field: 'type',
      title: '角色类型',
      type: 'select',
      key: 'account_type',
      search: true
    }, {
      field: 'payCardInfo',
      title: '银行类型'
    }, {
      field: 'payCardNo',
      title: '银行卡号'
    }, {
      field: 'accountName',
      title: '户名',
      search: true
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
      field: 'applyDatetime',
      title: '申请时间',
      type: 'date',
      rangedate: ['applyDateStart', 'applyDateEnd'],
      render: dateTimeFormat,
      search: true
    }, {
      field: 'approveUser',
      title: '审核人'
    }, {
      field: 'approveDatetime',
      title: '审核时间',
      type: 'date',
      rangedate: ['approveDateStart', 'approveDateEnd'],
      render: dateTimeFormat,
      search: true
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
      render: dateTimeFormat,
      search: true
    }];
    const btnEvent = {
      apply: (keys, items) => {
        this.props.history.push('/withdraw/withdraw/apply');
      },
      check: (keys, items) => {
        if (!keys.length) {
          showWarnMsg('请选择记录');
        } else if (keys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else if (items[0].status !== '1') {
          showWarnMsg('该记录不是待审核状态!');
        } else {
          this.props.history.push(`/withdraw/withdraw/addedit?code=${keys[0]}&check=1&v=1`);
        }
      },
      enter: (keys, items) => {
        if (!keys.length) {
          showWarnMsg('请选择记录');
        } else if (keys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else if (items[0].status !== '3') {
          showWarnMsg('该记录不是待回录状态!');
        } else {
          this.props.history.push(`/withdraw/withdraw/addedit?code=${keys[0]}&enter=1&v=1`);
        }
      }
    };
    return this.props.buildList({
      fields,
      btnEvent,
      pageCode: 803755,
      searchParams: {
        channelType: 90
      }
    });
  }
}

export default Withdraw;
