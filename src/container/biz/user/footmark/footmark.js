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
} from '@redux/biz/user/footmark';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
  state => ({
    ...state.userFootMark,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class FootMark extends React.Component {
  render() {
    const fields = [{
      title: '足迹人',
      field: 'creater',
      pageCode: 805120,
      type: 'select',
      keyName: 'userId',
      valueName: 'nickname',
      searchName: 'nickname',
      search: true,
      render: (v, d) => d.user ? d.user.nickname : ''
    }, {
      title: '被足迹人',
      field: 'remark'
    }, {
      title: '足迹时间',
      field: 'createDatetime',
      type: 'datetime'
    }];
    return this.props.buildList({
      fields,
      pageCode: 640045,
      searchParams: { type: 3 }
    });
  }
}

export default FootMark;
