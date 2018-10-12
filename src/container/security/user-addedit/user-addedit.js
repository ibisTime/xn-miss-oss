import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class UserAddEdit extends DetailUtil {
  render() {
    const fields = [{
      field: 'kind',
      value: 'P',
      hidden: true
    }, {
      title: '用户名',
      field: 'loginName',
      required: true,
      maxlength: 30
    }, {
      title: '真实姓名',
      field: 'realName',
      required: true,
      maxlength: 30
    }, {
      title: '手机号',
      field: 'mobile',
      required: true,
      mobile: true
    }, {
      title: '密码',
      field: 'loginPwd',
      required: true,
      type: 'password'
    }, {
      title: '角色编号',
      field: 'roleCode',
      type: 'select',
      listCode: '630007',
      keyName: 'code',
      valueName: 'name',
      required: true
    }];
    return this.buildDetail({
      fields,
      addCode: 630050
    });
  }
}

export default UserAddEdit;
