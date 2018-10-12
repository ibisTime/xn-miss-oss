import React from 'react';
import { Form } from 'antd';
import { getQueryString, showSucMsg, getUserId } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@Form.create()
class InfosAddEdit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.check = !!getQueryString('check', this.props.location.search);
  }
  // 保存、发布赛事
  saveOrSend(bizType, params) {
    this.doFetching();
    let bizCode = this.code ? 805301 : 805300;
    params.bizType = bizType;
    fetch(bizCode, params).then(() => {
      this.cancelFetching();
      showSucMsg('操作成功');
      setTimeout(() => {
        this.props.history.go(-1);
      }, 1000);
    }).catch(this.cancelFetching);
  }
  // 审核
  checkGame(approveResult, params) {
    this.doFetching();
    params.approveResult = approveResult;
    params.approver = getUserId();
    fetch(805302, params).then(() => {
      this.cancelFetching();
      showSucMsg('操作成功');
      setTimeout(() => {
        this.props.history.go(-1);
      }, 1000);
    }).catch(this.cancelFetching);
  }
  render() {
    let fields = [{
      title: '标题',
      field: 'title',
      maxlength: 50,
      required: true
    }, {
      title: '内容',
      field: 'content',
      type: 'textarea',
      required: true
    }];
    let config = {
      code: this.code,
      view: this.view,
      detailCode: 805307
    };
    if (this.code && this.view) {
      fields = fields.push([{
        title: '状态',
        field: 'status',
        type: 'select',
        key: 'event_status'
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
    if (!this.code || (this.view && !this.check)) {
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
        handler: (params) => this.checkGame(1, params)
      }, {
        title: '不通过',
        type: 'primary',
        check: true,
        handler: (params) => this.checkGame(0, params)
      }, {
        title: '返回',
        handler: () => this.props.history.go(-1)
      }];
    }
    return this.buildDetail(config);
  }
}

export default InfosAddEdit;
