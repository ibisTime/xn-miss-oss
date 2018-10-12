import React from 'react';
import { Form } from 'antd';
import { getQueryString, getUserId, showSucMsg } from 'common/js/util';
import fetch from 'common/js/fetch';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class WithdrawAddedit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.check = !!getQueryString('check', this.props.location.search);
    this.enter = !!getQueryString('enter', this.props.location.search);
    this.state = {
      ...this.state,
      paySuc: false
    };
  }
  render() {
    let fields = [{
      title: '编号',
      field: 'code'
    }, {
      title: '账号',
      field: 'accountNumber',
      required: true
    }, {
      title: '户名',
      field: 'realName',
      required: true
    }, {
      field: 'accountType',
      title: '账户类型',
      type: 'select',
      key: 'account_type',
      required: true
    }, {
      field: 'amount1',
      title: '金额',
      _keys: ['amount'],
      amount: true
    }, {
      field: 'fee',
      title: '手续费',
      amount: true
    }, {
      field: 'channelType',
      title: '支付渠道',
      type: 'select',
      key: 'channel_type'
    }, {
      field: 'payCardInfo',
      title: '银行类型'
    }, {
      field: 'payCardNo',
      title: '银行卡号'
    }, {
      field: 'status',
      title: '状态',
      type: 'select',
      key: 'jour_status'
    }, {
      field: 'applyDatetime',
      title: '申请时间',
      type: 'datetime'
    }, {
      field: 'applyNote',
      title: '申请说明',
      type: 'textarea',
      normalArea: true,
      required: true
    }];
    let config = {
      code: this.code,
      view: this.view,
      detailCode: 802356,
      editCode: 802354
    };
    if (this.check) {
      fields.push({
        title: '审核意见',
        field: 'approveNote',
        maxlength: 250,
        required: true,
        readonly: false
      });
      config.buttons = [{
        title: '通过',
        handler: (param) => {
          param.approveResult = '1';
          param.approveUser = getUserId();
          param.codeList = [param.code];
          this.doFetching();
          fetch(802352, param).then(() => {
            showSucMsg('操作成功');
            this.cancelFetching();
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1000);
          }).catch(this.cancelFetching);
        },
        check: true,
        type: 'primary'
      }, {
        title: '不通过',
        handler: (param) => {
          param.approveResult = '0';
          param.approveUser = getUserId();
          param.codeList = [param.code];
          this.doFetching();
          fetch(802352, param).then(() => {
            showSucMsg('操作成功');
            this.cancelFetching();
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1000);
          }).catch(this.cancelFetching);
        },
        check: true,
        type: 'primary'
      }, {
        title: '返回',
        handler: (param) => {
          this.props.history.go(-1);
        }
      }];
    } else if (this.enter) {
      fields = fields.concat([{
        field: 'approveUser',
        title: '审核人'
      }, {
        field: 'approveDatetime',
        title: '审核时间',
        type: 'datetime'
      }, {
        field: 'approveNote',
        title: '审核意见'
      }, {
        field: 'payResult',
        title: '支付结果',
        type: 'select',
        data: [{
          dkey: '0',
          dvalue: '否'
        }, {
          dkey: '1',
          dvalue: '是'
        }],
        keyName: 'dkey',
        valueName: 'dvalue',
        required: true,
        readonly: false,
        onChange: (v) => {
          this.setState({ paySuc: v === '1' });
        }
      }, {
        field: 'payUser',
        title: '打款人',
        required: true,
        readonly: false
      }, {
        field: 'channelOrder',
        title: '打款水单编号',
        hidden: !this.state.paySuc,
        required: this.state.paySuc,
        readonly: false
      }, {
        field: 'payFee',
        title: '打款手续费',
        amount: true,
        hidden: !this.state.paySuc,
        required: this.state.paySuc,
        readonly: false
      }, {
        field: 'payNote',
        title: '打款备注',
        required: true,
        readonly: false
      }]);
      config.buttons = [{
        title: '确认',
        handler: (param) => {
          this.doFetching();
          param.codeList = [param.code];
          fetch(802353, param).then(() => {
            showSucMsg('操作成功');
            this.cancelFetching();
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1000);
          }).catch(this.cancelFetching);
        },
        check: true,
        type: 'primary'
      }, {
        title: '返回',
        handler: (param) => {
          this.props.history.go(-1);
        }
      }];
    } else {
      fields = fields.concat([{
        field: 'approveUser',
        title: '审核人'
      }, {
        field: 'approveDatetime',
        title: '审核时间',
        type: 'datetime'
      }, {
        field: 'approveNote',
        title: '审核意见'
      }, {
        field: 'payUser',
        title: '打款人'
      }, {
        field: 'channelOrder',
        title: '打款水单编号'
      }, {
        field: 'payFee',
        title: '打款手续费',
        amount: true
      }, {
        field: 'payNote',
        title: '打款备注'
      }]);
    }
    config.fields = fields;
    return this.buildDetail(config);
  }
}

export default WithdrawAddedit;
