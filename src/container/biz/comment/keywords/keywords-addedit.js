import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class KeywordsAddEdit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    let fields = [{
      field: 'level',
      value: '0',
      hidden: true
    }, {
      field: 'reaction',
      value: '3',
      hidden: true
    }, {
      title: '关键字',
      field: 'word',
      maxlength: 50,
      required: true
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.buildDetail({
      fields,
      key: 'id',
      code: this.code,
      view: this.view,
      detailCode: 628006,
      addCode: 628000,
      editCode: 628002
    });
  }
}

export default KeywordsAddEdit;
