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
} from '@redux/biz/game/ranking';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.gameRanking,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Ranking extends React.Component {
  render() {
    const fields = [{
      title: '排名',
      field: 'rank'
    }, {
      title: '选手编号',
      field: 'matchPlayCode',
      render: (v, d) => `${d.player.matchPlayCode}`,
      search: true
    }, {
      title: '姓名',
      field: 'playerCname',
      render: (v, d) => `${d.player.cname}-${d.player.ename}`
    }, {
      title: '加油数',
      field: 'ticketSum',
      render: (v) => v || 0
    }, {
      title: '虚拟加油数',
      field: 'fakeTicketSum',
      render: (v) => v || 0
    }, {
      title: '关注数',
      field: 'attentionSum',
      render: (v) => v || 0
    }, {
      title: '分享数',
      field: 'shareSum',
      render: (v) => v || 0
    }, {
      title: '足迹查看次数',
      field: 'scanSum',
      render: (v) => v || 0
    }];
    return this.props.buildList({
      fields,
      pageCode: 640025,
      searchParams: { type: 1 },
      btnEvent: {
        // 调节
        adjust: (keys, items) => {
          if (!keys || !keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/game/ranking/addedit?code=${keys[0]}&v=1&adjust=1&pCode=${items[0].playerCode}`);
          }
        },
        // 详情
        detail: (keys, items) => {
          if (!keys || !keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/game/ranking/addedit?code=${keys[0]}&v=1&pCode=${items[0].playerCode}`);
          }
        }
      }
    });
  }
}

export default Ranking;
