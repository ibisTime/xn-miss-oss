import React from 'react';
import { Form } from 'antd';
import { getQueryString, showSucMsg, getUserId } from 'common/js/util';
// import DetailUtil from 'common/js/build-detail';
import { detailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';

// @Form.create()
// class TemplateAddEdit extends DetailUtil {
@detailWrapper
class TemplateAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.check = !!getQueryString('check', this.props.location.search);
  }
  // 保存、发布模版
  saveOrSend(bizType, params) {
    this.props.doFetching();
    let bizCode = this.code ? 640112 : 640110;
    params.bizType = bizType;
    fetch(bizCode, params).then(() => {
      this.props.cancelFetching();
      showSucMsg('操作成功');
      setTimeout(() => {
        this.props.history.go(-1);
      }, 1000);
    }).catch(this.props.cancelFetching);
  }
  // 审核
  checkTmpl(approveResult, params) {
    this.props.doFetching();
    params.approveResult = approveResult;
    fetch(640111, params).then(() => {
      this.props.cancelFetching();
      showSucMsg('操作成功');
      setTimeout(() => {
        this.props.history.go(-1);
      }, 1000);
    }).catch(this.props.cancelFetching);
  }
  render() {
    let fields = [{
      field: 'question',
      title: '针对问题',
      required: true
    }, {
      field: 'answer',
      title: '内容',
      type: 'textarea',
      normalArea: true,
      required: true
    }];
    let config = {
      code: this.code,
      view: this.view,
      detailCode: 640126
    };
    if (this.code && this.view) {
      fields = fields.concat([{
        title: '状态',
        field: 'status',
        type: 'select',
        key: 'comment_template_status'
      }, {
        title: '更新人',
        field: 'updater'
      }, {
        title: '更新时间',
        field: 'updateDatetime',
        type: 'datetime'
      }, {
        title: '备注',
        field: 'remark',
        readonly: !this.check
      }]);
    }
    config.fields = fields;
    // 新增、修改
    if (!this.code || (!this.check && !this.view)) {
      config.buttons = [{
        title: '保存',
        type: 'primary',
        check: true,
        handler: (params) => this.saveOrSend(0, params)
      }, {
        title: '发送',
        type: 'primary',
        check: true,
        handler: (params) => this.saveOrSend(1, params)
      }, {
        title: '返回',
        handler: () => this.props.history.go(-1)
      }];
      // 审核
    } else if (this.check) {
      config.buttons = [{
        title: '通过',
        type: 'primary',
        check: true,
        handler: (params) => this.checkTmpl(1, params)
      }, {
        title: '不通过',
        type: 'primary',
        check: true,
        handler: (params) => this.checkTmpl(0, params)
      }, {
        title: '返回',
        handler: () => this.props.history.go(-1)
      }];
    }
    return this.props.buildDetail(config);
  }
}

export default TemplateAddEdit;
