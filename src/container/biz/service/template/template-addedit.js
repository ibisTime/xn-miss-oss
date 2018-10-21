import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@Form.create()
class TemplateAddEdit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
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
      detailCode: 640126,
      addCode: 640110,
      editCode: 640112
    };
    if (this.code && this.view) {
      fields = fields.concat([{
        title: '更新人',
        field: 'updater'
      }, {
        title: '更新时间',
        field: 'updateDatetime',
        type: 'datetime'
      }]);
    }
    fields.push({
      title: '备注',
      field: 'remark'
    });
    config.fields = fields;
    return this.buildDetail(config);
  }
}

export default TemplateAddEdit;
