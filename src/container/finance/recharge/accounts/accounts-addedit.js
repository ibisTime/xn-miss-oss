import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class AccountsAddEdit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.state = {
      ...this.state,
      isBank: false
    };
  }
  render() {
    const fields = [{
      field: 'userId',
      value: 'SYS_USER',
      hidden: true
    }, {
      title: '帐号名称',
      field: 'realName',
      required: true
    }, {
      title: '银行名称',
      field: 'bankCode',
      required: true,
      type: 'select',
      listCode: 802116,
      params: { status: '1' },
      keyName: 'bankCode',
      valueName: 'bankName',
      onChange: (v) => {
        if (v === 'WeChat' || v === 'alipay') {
          this.setState({ isBank: false });
        } else {
          this.setState({ isBank: true });
        }
      }
    }, {
      title: '支行',
      field: 'subbranch',
      hidden: !this.state.isBank,
      required: this.state.isBank
    }, {
      title: '卡号',
      field: 'bankcardNumber',
      placeholder: '卡号/支付宝账号/微信账号',
      required: true
    }, {
      title: '初始金额',
      field: 'amount',
      required: true,
      amount: true
    }, {
      field: 'remark',
      title: '备注',
      maxlength: 255
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 802027,
      addCode: 802020,
      beforeSubmit: (params) => {
        params.type = params.bankCode === 'WeChat'
          ? 2 : params.bankCode === 'alipay' ? 3 : 1;
        params.bankName = this.state.selectData.bankCode
          .find(v => v.bankCode === params.bankCode).bankName;
        return params;
      }
    });
  }
}

export default AccountsAddEdit;
