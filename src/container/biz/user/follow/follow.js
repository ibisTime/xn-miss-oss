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
} from '@redux/biz/user/follow';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
  state => ({
    ...state.userFollow,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Follow extends React.Component {
  render() {
    const fields = [{
      title: '关注人',
      field: 'creater'
    }, {
      title: '被关注人',
      field: 'toCode'
    }, {
      title: '关注时间',
      field: 'createDatetime',
      type: 'datetime'
    }];
    return this.props.buildList({
      fields,
      pageCode: 640045,
      searchParams: { type: 2 }
    });
  }
}

export default Follow;
