import React from 'react';
import { Table } from 'antd';
import { dateFormat } from 'common/js/util';
import NoticeImg from './notice.png';
import './index.css';

const columns = [{
  title: '标题',
  dataIndex: 'title',
  key: 'title'
}, {
  title: '发表时间',
  dataIndex: 'createDatetime',
  key: 'createDatetime',
  render: (v) => dateFormat(v)
}];

export default class Notice extends React.Component {
  render() {
    return (
      <div className="notice-wrapper">
        <div className="notice-title"><img src={NoticeImg}/>系统公告</div>
        <Table
          className="notice-table-wrapper"
          columns={columns}
          dataSource={this.props.data}
          pagination={false} />
      </div>
    );
  }
}
