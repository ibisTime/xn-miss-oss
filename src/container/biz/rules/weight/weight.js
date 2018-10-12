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
} from '@redux/biz/rules/weight';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
  state => ({
    ...state.rulesWeight,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Weight extends React.Component {
  render() {
    const fields = [{
      title: '权重',
      field: 'cvalue'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildList({
      fields,
      rowKey: 'id',
      pageCode: 630045,
      searchParams: {
        type: 'weight'
      }
    });
  }
}

export default Weight;
