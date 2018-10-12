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
} from '@redux/biz/user/signIn';
import { listWrapper } from 'common/js/build-list';
import { getQueryString } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.userSignIn
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class UserSignIn extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '签到人',
      field: 'userId'
    }, {
      title: '签到地点',
      field: 'location'
    }, {
      title: '签到时间',
      field: 'createDatetime',
      type: 'datetime'
    }];
    return this.props.buildList({
      fields,
      rowKey: 'id',
      pageCode: 805145,
      searchParams: {
        userId: this.code
      }
    });
  }
}

export default UserSignIn;
