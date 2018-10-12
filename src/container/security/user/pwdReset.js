import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class PwdReset extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('userId', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'userId',
      hidden: true,
      value: this.code
    }, {
      field: 'loginName',
      title: '用户名',
      readonly: true
    }, {
      title: '新密码',
      field: 'newLoginPwd',
      type: 'password'
    }];
    return this.buildDetail({
      fields,
      key: 'userId',
      code: this.code,
      view: this.view,
      detailCode: 630067,
      editCode: 630055
    });
  }
}

export default PwdReset;
