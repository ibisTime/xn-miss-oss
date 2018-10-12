import React from 'react';
import { Modal } from 'antd';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/biz/game/players';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg, getUserId } from 'common/js/util';
import fetch from 'common/js/fetch';
import UpDown from 'component/up-down/up-down';

@listWrapper(
  state => ({
    ...state.gamePlayers,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 上下架窗口是否显示
      updownVisible: false,
      // 上下架产品code
      code: ''
    };
  }
  setModalVisible = (updownVisible) => {
    this.setState({ updownVisible });
  }
  downPlayers(status, code) {
    Modal.confirm({
      okText: '确认',
      cancelText: '取消',
      content: `确认下架该赛事吗？`,
      onOk: () => {
        this.props.doFetching();
        return fetch(640004, { code, updater: getUserId() }).then(() => {
          this.props.getPageData();
          showWarnMsg('操作成功');
        }).catch(() => {
          this.props.cancelFetching();
        });
      }
    });
  }
  render() {
    const fields = [{
      title: '选手编号',
      field: 'matchPlayCode',
      search: true
    }, {
      title: '姓名',
      field: 'cname',
      render: (v, d) => `${d.cname}-${d.ename}`
    }, {
      title: '赛区',
      field: 'match'
    }, {
      title: '籍贯',
      field: 'nativePlace'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'player_status',
      search: true
    }, {
      title: '加油数',
      field: 'none'
    }, {
      title: '关注数',
      field: 'none1'
    }, {
      title: '分享数',
      field: 'none2'
    }, {
      title: '足迹查',
      field: 'none3'
    }];
    return this.props.buildList({
      fields,
      pageCode: 640025,
      btnEvent: {
        // 调节
        adjust: (keys, items) => {
          if (!keys || !keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/game/ranking/addedit?code=${keys[0]}&v=1&adjust=1`);
          }
        }
      }
    });
  }
}

export default Players;
