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
} from '@redux/biz/game/infos';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg, getUserId } from 'common/js/util';
import fetch from 'common/js/fetch';
import UpDown from 'component/up-down/up-down';

@listWrapper(
  state => ({
    ...state.gameInfos,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Infos extends React.Component {
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
  downGame(code) {
    Modal.confirm({
      okText: '确认',
      cancelText: '取消',
      content: `确认下架该赛事吗？`,
      onOk: () => {
        this.props.doFetching();
        return fetch(805304, { code, updater: getUserId() }).then(() => {
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
      title: '标题',
      field: 'title',
      search: true
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'event_status',
      search: true
    }, {
      title: 'UI次序',
      field: 'orderNo'
    }, {
      title: '更新人',
      field: 'updater'
    }, {
      title: '更新时间',
      field: 'createDatetime',
      type: 'datetime'
    }, {
      title: '备注',
      field: 'remark'
    }];
    let that = this;
    return (
      <div>
        {this.props.buildList({
          fields,
          pageCode: 805305,
          btnEvent: {
            edit: (keys, items) => {
              if (!keys || !keys.length) {
                showWarnMsg('请选择记录');
              } else if (keys.length > 1) {
                showWarnMsg('请选择一条记录');
              } else if (items[0].status !== '0' && items[0].status !== '2' && items[0].status !== '5') {
                showWarnMsg('该记录不是可修改状态');
              } else {
                this.props.history.push(`/game/infos/addedit?code=${keys[0]}`);
              }
            },
            // 审核
            check: (keys, items) => {
              if (!keys || !keys.length) {
                showWarnMsg('请选择记录');
              } else if (keys.length > 1) {
                showWarnMsg('请选择一条记录');
              } else if (items[0].status !== '1') {
                showWarnMsg('该记录不是待审核状态');
              } else {
                this.props.history.push(`/game/infos/addedit?code=${keys[0]}&v=1&check=1`);
              }
            },
            // 上架
            up: (keys, items) => {
              if (!keys || !keys.length) {
                showWarnMsg('请选择记录');
              } else if (keys.length > 1) {
                showWarnMsg('请选择一条记录');
              } else if (items[0].status !== '3') {
                showWarnMsg('该记录不是待上架状态');
              } else {
                this.setState({
                  updownVisible: true,
                  code: keys[0]
                });
              }
            },
            // 下架
            down: (keys, items) => {
              if (!keys || !keys.length) {
                showWarnMsg('请选择记录');
              } else if (keys.length > 1) {
                showWarnMsg('请选择一条记录');
              } else if (items[0].status !== '4') {
                showWarnMsg('该记录不是可下架状态');
              } else {
                this.downGame(keys[0]);
              }
            }
          }
        })}
        <UpDown
          updownVisible={this.state.updownVisible}
          setModalVisible={this.setModalVisible}
          biz='805303'
          code={this.state.code}
          hideLoc={true}
          onOk={() => {
            that.setModalVisible(false);
            that.props.getPageData();
          }} />
      </div>
    );
  }
}

export default Infos;
