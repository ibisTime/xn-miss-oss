import React from 'react';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/biz/service/template';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
  state => ({
    ...state.serviceTemplate,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Template extends React.Component {
  render() {
    let that = this;
    const fields = [{
      field: 'question',
      title: '针对问题',
      search: true
    }, {
      field: 'answer',
      title: '内容'
    }, {
      field: 'updater',
      title: '更新人'
    }, {
      field: 'updateDatetime',
      title: '更新时间',
      type: 'datetime'
    }, {
      field: 'remark',
      title: '备注'
    }];
    return this.props.buildList({
      fields,
      pageCode: 640125,
      deleteCode: 640111
    });
  }
}

export default Template;
