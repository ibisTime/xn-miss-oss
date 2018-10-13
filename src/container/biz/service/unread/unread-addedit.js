import React from 'react';
import { Form, List, Avatar, Button, Card } from 'antd';
import fetch from 'common/js/fetch';
import { getQueryString, getUserId, showSucMsg, dateFormat, formatDate,
  formatImg} from 'common/js/util';
import { validateFieldsAndScrollOption, formItemLayout } from 'common/js/config';
import CNormalTextArea from 'component/cNormalTextArea/cNormalTextArea';
import CSelect from 'component/cSelect/cSelect';
import ServiceImg from './service.png';
import UserImg from './user.png';
import './index.css';

const FormItem = Form.Item;

@Form.create()
export default class UnReadAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      btnLoading: false,
      list: [],
      photo: '',
      tmplList: []
    };
    this.code = getQueryString('code', this.props.location.search);
    this.userId = getQueryString('userId', this.props.location.search);
    this.reply = !!getQueryString('reply', this.props.location.search);
  }
  componentDidMount() {
    Promise.all([
      fetch(640106, { code: this.code }),
      fetch(805121, { userId: this.userId }),
      fetch(640127, { status: 4 })
    ]).then(([mes, userInfo, tmplList]) => {
      this.setState({
        list: mes.dataList || [],
        userInfo,
        tmplList,
        photo: userInfo.photo || '',
        fetching: false
      });
    }).catch(() => this.setState({ fetching: false }));
  }
  // 回复消息
  sendMsg = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(validateFieldsAndScrollOption, (err, values) => {
      if (!err) {
        this.setState({ btnLoading: true });
        values.code = this.code;
        fetch(640101, values).then(() => {
          this.setState({ btnLoading: false });
          showSucMsg('操作成功');
          setTimeout(() => {
            this.props.history.go(-1);
          }, 1000);
        }).catch(() => this.setState({ btnLoading: false }));
      }
    });
  }
  // 获取textarea的控件
  getNormalTextArea() {
    const props = {
      field: 'content',
      label: '回复内容',
      rules: [{
        required: true,
        message: '必填字段'
      }],
      getFieldDecorator: this.props.form.getFieldDecorator,
      getFieldError: this.props.form.getFieldError,
      getFieldValue: this.props.form.getFieldValue
    };
    return <CNormalTextArea key='content' {...props} />;
  }
  // 获取选择框类型的控件
  getSelectComp() {
    const props = {
      field: 'tmpl',
      label: '回复模版',
      keyName: 'code',
      valueName: 'question',
      onChange: (v, list) => {
        if (v) {
          this.props.form.setFieldsValue({
            'content': list.find(l => l.code === v).answer
          });
        }
      },
      getFieldDecorator: this.props.form.getFieldDecorator,
      getFieldValue: this.props.form.getFieldValue,
      getFieldError: this.props.form.getFieldError,
      list: this.state.tmplList
    };
    return <CSelect key='tmpl' {...props} />;
  }
  onCancel = () => this.props.history.go(-1)
  render() {
    const { fetching, list, btnLoading, photo } = this.state;
    return (
      <div className="message-detail-wrapper">
        <Card title="聊天历史" style={{marginBottom: 20, maxWidth: 900}}>
          <List
            className="message-list-wrapper"
            loading={fetching}
            itemLayout="horizontal"
            dataSource={list}
            renderItem={item => (
              this.userId === item.userId
              ? <List.Item key={item.id}>
                  <div className="inner-wrapper">
                    <div className="user-avatar">
                      <Avatar src={photo ? formatImg(photo) : UserImg}/>
                      <div className="msg-date">{formatDate(item.createDatetime, 'yy-MM-dd')}</div>
                      <div className="msg-time">{formatDate(item.createDatetime, 'hh:mm')}</div>
                    </div>
                    <div className="inner-content">{item.content}</div>
                  </div>
                </List.Item>
              : <List.Item key={item.id}>
                  <div className="inner-wrapper right-inner">
                    <div className="inner-content">{item.content}</div>
                    <div className="user-avatar">
                      <Avatar src={ServiceImg}/>
                      <div className="msg-date">{formatDate(item.createDatetime, 'yy-MM-dd')}</div>
                      <div className="msg-time">{formatDate(item.createDatetime, 'hh:mm')}</div>
                    </div>
                  </div>
                </List.Item>
            )}
          />
        </Card>
        <Form className="detail-form-wrapper" onSubmit={this.sendMsg}>
          {this.getSelectComp()}
          {this.getNormalTextArea()}
          <FormItem className="cform-item-btn" key='btns' {...formItemLayout} label="&nbsp;">
            {this.view
              ? <Button onClick={this.onCancel}>返回</Button>
              : (
                <div>
                  <Button type="primary" htmlType="submit" loading={btnLoading}>保存</Button>
                  <Button style={{marginLeft: 20}} onClick={this.onCancel}>返回</Button>
                </div>
              )
            }
          </FormItem>
        </Form>
      </div>
    );
  }
}
