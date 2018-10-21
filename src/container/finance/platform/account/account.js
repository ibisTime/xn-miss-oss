import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Button, Spin, Form } from 'antd';
import { initData } from '@redux/finance/platform/account';
import { moneyFormat } from 'common/js/util';

@connect(
  state => state.platformAccount,
  { initData }
)
class Account extends React.Component {
  componentDidMount() {
    this.props.initData();
  }
  // 资金流水
  goFlow(accountNumber, type) {
    this.props.history.push(`/platform/account/flows?code=${accountNumber}&type=${type}`);
  }
  // 资金分布
  goAccounts(type) {
    this.props.history.push(`/platform/account/accounts?type=${type}`);
  }
  // 提现回录
  goWithdraw(accountNumber) {
    this.props.history.push(`/platform/account/enter?code=${accountNumber}`);
  }
  render() {
    const { wxAccount, offAccount, cClientAccount, cnyAccount, ppAccount } = this.props;
    return (
      <div>
        <Spin spinning={this.props.fetching}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={8} style={{marginBottom: '20px'}}>
              <Card title="微信账户" extra={
                <Button onClick={() => this.goFlow(wxAccount.accountNumber)} type="primary">资金流水</Button>
              }>¥{moneyFormat(wxAccount.amount || 0)}
                <Button
                  style={{float: 'right'}}
                  onClick={() => this.goWithdraw(wxAccount.accountNumber)} type="primary">提现回录</Button>
              </Card>
            </Col>
            <Col span={8} style={{marginBottom: '20px'}}>
              <Card title="线下充值额" extra={
                <Button onClick={() => this.goFlow(offAccount.accountNumber)} type="primary">资金流水</Button>
              }>¥{moneyFormat(offAccount.amount || 0)}
                <Button
                  style={{float: 'right'}}
                  onClick={() => this.goWithdraw(offAccount.accountNumber)} type="primary">提现回录</Button>
              </Card>
            </Col>
          </Row>
          <Row gutter={{ xs: 6, sm: 12, md: 24, lg: 32 }}>
            <Col span={8} style={{marginBottom: '20px'}}>
              <Card title="用户总余额" extra={
                <Button onClick={() => this.goAccounts(cClientAccount.type)} type="primary">资金分布</Button>
              }>¥{moneyFormat(cClientAccount.amount || 0)}</Card>
            </Col>
            <Col span={8} style={{marginBottom: '20px'}}>
              <Card title="平台盈亏" extra={
                <Button onClick={() => this.goFlow(cnyAccount.accountNumber)} type="primary">资金流水</Button>
              }>¥{moneyFormat(cnyAccount.amount || 0)}</Card>
            </Col>
            <Col span={8} style={{marginBottom: '20px'}}>
              <Card title="品牌方" extra={
                <Button onClick={() => this.goFlow('', 'B')} type="primary">资金流水</Button>
              }>¥{moneyFormat(ppAccount.amount || 0)}
                <Button
                  style={{float: 'right'}}
                  onClick={() => this.goWithdraw('SYS_ACOUNT_B')} type="primary">提现回录</Button>
              </Card>
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(Account);
