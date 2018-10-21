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
} from '@redux/biz/user/shares';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
  state => ({
    ...state.userShares,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Shares extends React.Component {
  render() {
    const fields = [{
      title: '分享人',
      field: 'creater',
      pageCode: 805120,
      type: 'select',
      keyName: 'userId',
      valueName: 'nickname',
      searchName: 'nickname',
      search: true,
      render: (v, d) => d.user ? d.user.nickname : ''
    }, {
      title: '分享内容',
      field: 'remark'
    }, {
      title: '分享时间',
      field: 'createDatetime',
      type: 'datetime'
    }];
    return this.props.buildList({
      fields,
      pageCode: 640045,
      searchParams: { type: 1 }
    });
  }
}

export default Shares;
