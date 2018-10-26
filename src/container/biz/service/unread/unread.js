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
} from '@redux/biz/service/unread';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.serviceUnRead,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class UnRead extends React.Component {
  render() {
    const fields = [{
      field: 'user1',
      title: '提问人',
      type: 'select',
      pageCode: 805120,
      keyName: 'userId',
      valueName: 'mobile',
      searchName: 'mobile',
      render: (v, d) => d.mobile || '',
      search: true
    }, {
      field: 'user1Nickname',
      title: '昵称'
    }, {
      field: 'user2UnreadSum',
      title: '未读消息数量',
      render: v => v || 0
    }];
    return this.props.buildList({
      fields,
      pageCode: 640105,
      searchParams: {
        user2: 'SYS_USER'
      },
      btnEvent: {
        reply: (keys, items) => {
          if (!keys || !keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/service/unread/addedit?code=${keys[0]}&userId=${items[0].user1}&reply=1`);
          }
        }
      }
    });
  }
}

export default UnRead;
