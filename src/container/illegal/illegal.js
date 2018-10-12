import React from 'react';
import { Alert } from 'antd';
import { clearUser } from 'common/js/util';

export default class Illegal extends React.Component {
  componentDidMount() {
    clearUser();
    setTimeout(() => {
      this.props.history.push('/login');
    }, 3000);
  }
  render() {
    return (
      <div style={{ padding: 40 }}>
        <Alert
          message="提示"
          description="抱歉，您已被管理员限制登录平台。\n页面将在三秒后自动跳转到登录页"
          type="error"
        />
      </div>
    );
  }
}
