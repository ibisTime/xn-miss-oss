import React from 'react';
import { Form } from 'antd';
import { getQueryString, getUserId, showSucMsg } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@Form.create()
class RechargesApply extends DetailUtil {
  render() {
    const fields = [{
      field: 'applyUser',
      value: getUserId(),
      hidden: true
    }, {
      field: 'accountNumber',
      title: '用户账户',
      required: true,
      type: 'select',
      pageCode: 803500,
      params: {
        status: '0',
        type: 'C'
      },
      dict: [
        ['currency', 'currency'],
        ['type', 'account_type']
      ],
      keyName: 'accountNumber',
      valueName: '{{realName.DATA}}-{{typeName.DATA}}-{{currencyName.DATA}}',
      searchName: 'realName'
    }, {
      title: '取现金额',
      field: 'amount',
      amount: true,
      required: true
    }, {
      title: '开户行信息',
      field: 'payCardInfo',
      required: true
    }, {
      title: '银行卡号',
      field: 'payCardNo',
      bankCard: true,
      required: true
    }, {
      title: '申请说明',
      field: 'applyNote',
      required: true
    }];
    return this.buildDetail({
      fields,
      addCode: 803751
    });
  }
}

export default RechargesApply;
