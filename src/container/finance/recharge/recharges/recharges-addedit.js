import React from 'react';
import { Form } from 'antd';
import { getQueryString, getUserId, showSucMsg } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@Form.create()
class RechargesAddEdit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.check = !!getQueryString('check', this.props.location.search);
  }
  checkOrder(payResult, params) {
    this.doFetching();
    params.payResult = payResult;
    params.codeList = [this.code];
    params.payUser = getUserId();
    fetch(803701, params).then(data => {
      this.cancelFetching();
      showSucMsg('操作成功');
      setTimeout(() => {
        this.props.history.go(-1);
      }, 1000);
    }).catch(this.cancelFetching);
  }
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
      title: '充值金额',
      field: 'amount',
      required: true,
      amount: true
    }, {
      title: '收款帐号',
      field: 'collectionAccountNumber',
      type: 'select',
      listCode: 802026,
      keyName: 'code',
      valueName: '{{bankName.DATA}}-{{bankcardNumber.DATA}}',
      hidden: !!this.code && (!this.state.pageData || !this.state.pageData.collectionAccountNumber),
      required: true
    }, {
      field: 'applyNote',
      title: '充值说明',
      maxlength: 255
    }];
    let config = {
      fields,
      code: this.code,
      view: this.view,
      detailCode: 803706,
      addCode: 803700,
      beforeSubmit: (params) => {
        return params;
      }
    };
    if (this.view) {
      fields.push({
        field: 'payNote',
        title: '审核意见',
        required: true,
        readonly: !this.check
      });
    }
    if (this.check) {
      config.buttons = [{
        title: '通过',
        check: true,
        type: 'primary',
        handler: (params) => {
          this.checkOrder(1, params);
        }
      }, {
        title: '不通过',
        check: true,
        type: 'primary',
        handler: (params) => {
          this.checkOrder(0, params);
        }
      }, {
        title: '返回',
        handler: (params) => {
          this.props.history.go(-1);
        }
      }];
    }
    return this.buildDetail(config);
  }
}

export default RechargesAddEdit;
