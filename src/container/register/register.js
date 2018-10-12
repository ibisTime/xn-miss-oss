import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import { showSucMsg } from 'common/js/util';
import fetch from 'common/js/fetch';
import '../login/login.css';

const FormItem = Form.Item;
let time = 0;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: '',
      fetching: false,
      captText: '获取验证码',
      disabled: false,
      captFetching: false
    };
  }
  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
  // 获取验证码
  getSmsCode = (e) => {
    e.preventDefault();
    this.props.form.validateFields(['mobile'], (err, values) => {
      if (!err) {
        this.setState({ captFetching: true, disabled: true });
        values.bizType = 630060;
        fetch(630090, values).then(() => {
          this.setState({ captFetching: false });
          this.sendSmsSuc();
        }).catch(() => this.setState({ captFetching: false, disabled: false }));
      }
    });
  }
  // 验证码发送成功，进入60s倒计时
  sendSmsSuc() {
    time++;
    if (time === 60) {
      time = 0;
      clearTimeout(this.timer);
      this.setState({ disabled: false, captText: '获取验证码' });
    } else {
      this.setState({ captText: `${60 - time}s` });
      this.timer = setTimeout(() => {
        this.sendSmsSuc();
      }, 1000);
    }
  }
  // 注册
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ fetching: true });
        fetch(630060, values).then(() => {
          this.setState({ fetching: false });
          showSucMsg('注册成功');
          setTimeout(() => {
            this.setState({ redirectTo: '/login' });
          }, 1500);
        }).catch(() => this.setState({ fetching: false }));
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { captFetching, disabled, captText } = this.state;
    return (
      <div className="login-body">
        {this.state.redirectTo ? <Redirect to={this.state.redirectTo}/> : null}
        <div className="login-wrap register-wrap">
          <div className="login-img"></div>
          <div className="login-form">
            <div className="login-logo"></div>
            <Form onSubmit={this.handleSubmit} className="login-form-wrapper">
              <FormItem className="form-item">
                {getFieldDecorator('mobile', {
                  rules: [{
                    required: true,
                    message: '请输入手机号!'
                  }, {
                    pattern: /^1[3|4|5|6|7|8|9]\d{9}$/,
                    message: '手机格式不对'
                  }]
                })(<Input placeholder="手机号"/>)}
              </FormItem>
              <FormItem className="form-item">
                <Row gutter={8}>
                  <Col span={12}>
                    {getFieldDecorator('smsCaptcha', {
                      rules: [{ required: true, message: '请输入验证码' }]
                    })(<Input placeholder="验证码" />)}
                  </Col>
                  <Col span={12}>
                    <Button
                      className="smsCapt"
                      onClick={this.getSmsCode}
                      loading={captFetching}
                      disabled={disabled} >{captText}</Button>
                  </Col>
                </Row>
              </FormItem>
              <FormItem className="form-item">
                {getFieldDecorator('loginPwd', {
                  rules: [{
                    required: true,
                    message: '请输入密码!'
                  }]
                })(<Input type="password" placeholder="密码"/>)}
              </FormItem>
              <FormItem className="button-wrap">
                <Button type="primary" htmlType="submit" loading={this.state.fetching}
                        className="login-form-button">注册</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(Register);
