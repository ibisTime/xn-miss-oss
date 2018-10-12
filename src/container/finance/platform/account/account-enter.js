import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class AccountEnter extends DetailUtil {
  constructor(props) {
    super(props);
    this.accountNumber = getQueryString('code', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'accountNumber',
      value: this.accountNumber,
      hidden: true
    }, {
      field: 'amount',
      title: '提现金额',
      amount: true,
      required: true
    }, {
      field: 'channelOrder',
      title: '三方平台提现单号',
      required: true
    }, {
      title: '提现时间',
      field: 'withDate',
      type: 'datetime',
      required: true
    }, {
      title: '备注',
      field: 'withNote'
    }];
    return this.buildDetail({
      fields,
      addCode: 802354
    });
  }
}

export default AccountEnter;
