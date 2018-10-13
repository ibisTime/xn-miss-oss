import React from 'react';
import { Form } from 'antd';
import { getQueryString, getUserId, showSucMsg } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@Form.create()
class CheckAddEdit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.check = !!getQueryString('check', this.props.location.search);
  }
  checkComment(approveResult, params) {
    this.doFetching();
    params.approveResult = approveResult;
    params.approver = getUserId();
    fetch(628270, params).then(() => {
      this.cancelFetching();
      showSucMsg('操作成功');
      setTimeout(() => {
        this.props.history.go(-1);
      }, 1000);
    }).catch(this.cancelFetching);
  }
  render() {
    let fields = [{
      field: 'content',
      title: '内容'
    }, {
      field: 'status',
      title: '状态',
      type: 'select',
      key: 'comment_status',
      search: true
    }, {
      field: 'nickname',
      title: '评论人'
    }, {
      field: 'entityName',
      title: '评论对象'
    }, {
      field: 'commentDatetime',
      title: '评论时间',
      type: 'datetime'
    }, {
      field: 'approveNote',
      title: '审核说明',
      readonly: !this.check
    }];
    const config = {
      fields,
      code: this.code,
      view: this.view,
      detailCode: 628276
    };
    if (this.check) {
      config.buttons = [{
        title: '通过',
        type: 'primary',
        check: true,
        handler: (params) => this.checkComment(1, params)
      }, {
        title: '不通过',
        type: 'primary',
        check: true,
        handler: (params) => this.checkComment(0, params)
      }, {
        title: '返回',
        handler: () => this.props.history.go(-1)
      }];
    }
    return this.buildDetail(config);
  }
}

export default CheckAddEdit;
