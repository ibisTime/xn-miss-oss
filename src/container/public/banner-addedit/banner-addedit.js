import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class BannerAddEdit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'status',
      hidden: true,
      value: 1
    }, {
      field: 'type',
      value: 2,
      hidden: true
    }, {
      field: 'parentCode',
      value: 0,
      hidden: true
    }, {
      title: 'banner名称',
      field: 'name',
      required: true
    }, {
      title: '位置',
      field: 'location',
      type: 'select',
      data: [{
        dkey: 'index_banner',
        dvalue: '首页'
      }],
      keyName: 'dkey',
      valueName: 'dvalue',
      value: 'index_banner',
      required: true
    }, {
      title: '顺序',
      field: 'orderNo',
      help: '数字越小，排序越靠前',
      required: true
    }, {
      title: 'banner图片',
      field: 'pic',
      type: 'img',
      help: '推荐尺寸：750*450',
      required: true,
      single: true
    }, {
      title: 'url地址',
      field: 'url'
    }, {
      title: '备注',
      field: 'remark',
      maxlength: 250
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: 630500,
      editCode: 630502,
      detailCode: 630507
    });
  }
}

export default BannerAddEdit;
