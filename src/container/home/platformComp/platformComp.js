import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Avatar } from 'antd';
import UserCountCard from '../userCountCard/userCountCard';
import Notice from '../notice/notice';
import AvatarImg from './avatar.png';
import AddImg from './add.png';
import TotalImg from './total.png';
import './index.css';

export default class PlatformComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addCount: 0,
      totalCount: 0,
      data: [{
        title: '氧林1.0.0正式上线了',
        createDatetime: '2018-09-05'
      }]
    };
  }
  render() {
    const { addCount, totalCount } = this.state;
    return (
      <div className="platform-wrapper">
        <div className="avatar-wrapper">
          <Avatar size={80} src={AvatarImg} />
          <div className="user-name">ADMIN</div>
          <div className="user-role">超级管理员</div>
        </div>
        <div className="platform-content">
          <Row gutter={{ xs: 6, sm: 12, md: 24, lg: 32 }}>
            <Col span={6} style={{marginBottom: '20px'}}>
              <UserCountCard bgImage={AddImg} title='新增用户' subTitle="NEW USERS" count={addCount} />
            </Col>
            <Col span={6} style={{marginBottom: '20px'}}>
              <UserCountCard bgImage={TotalImg} title='总用户数' subTitle="TOTAL USERS" count={addCount} />
            </Col>
          </Row>
          <Row style={{marginTop: 20}} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24} style={{marginBottom: '20px'}}>
              <Notice data={this.state.data}/>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
