import React from 'react';
import { Form, Card, Button, Tooltip, Icon } from 'antd';
import { getQiniuToken } from 'api/general';
import { getDictList } from 'api/dict';
import CInput from 'component/cInput/cInput';
import CNormalTextArea from 'component/cNormalTextArea/cNormalTextArea';
import CSelect from 'component/cSelect/cSelect';
import CSearchSelect from 'component/cSearchSelect/cSearchSelect';
import CUpload from 'component/cUpload/cUpload';
import { isUndefined, getQueryString, showSucMsg, getUserId, getRules,
  getRealValue } from 'common/js/util';
import { validateFieldsAndScrollOption, formItemLayout } from 'common/js/config';
import fetch from 'common/js/fetch';

const FormItem = Form.Item;

@Form.create()
class RankingAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.adjust = !!getQueryString('adjust', this.props.location.search);
    this.playerCode = getQueryString('pCode', this.props.location.search);
    this.soaring = !!getQueryString('soaring', this.props.location.search);
    this.options = {
      code: this.code,
      view: this.view
    };
    // 选手字段
    this.playerFields = [{
      title: '选手编号',
      field: 'matchPlayCode',
      required: true
    }, {
      title: '中文名',
      field: 'cname',
      required: true
    }, {
      title: '英文名',
      field: 'ename',
      required: true
    }, {
      title: '赛区',
      field: 'match',
      key: 'match',
      required: true
    }, {
      title: '籍贯',
      field: 'nativePlace',
      required: true
    }, {
      title: '身高',
      field: 'height',
      required: true
    }, {
      title: '体重',
      field: 'weight',
      required: true
    }, {
      title: '胸围',
      field: 'xwei',
      required: true
    }, {
      title: '腰围',
      field: 'ywei',
      required: true
    }, {
      title: '文字简介',
      field: 'description',
      required: true
    }, {
      title: '列表图',
      field: 'listPic',
      type: 'img',
      help: '推荐尺寸：230*230',
      single: true,
      required: true
    }, {
      title: 'banner图',
      field: 'bannerPics',
      type: 'img',
      help: '推荐尺寸：750*550',
      required: true
    }, {
      title: '详情图',
      field: 'pics',
      type: 'img',
      help: '推荐尺寸：689*400',
      required: true
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'player_status'
    }, {
      title: '备注',
      field: 'remark'
    }];
    // 排序字段
    this.rankFields = [{
      title: '排名',
      field: 'rank'
    }, {
      title: '选手编号',
      field: 'playerCode'
    }, {
      title: '姓名',
      field: 'playerCname',
      formatter: (v, d) => `${d.player.cname}-${d.player.ename}`
    }, {
      title: '加油数',
      field: 'ticketSum',
      formatter: (v) => v || 0
    }, {
      title: '虚拟加油数',
      field: 'fakeTicketSum',
      formatter: (v) => v || 0
    }, {
      title: '关注数',
      field: 'attentionSum',
      formatter: (v) => v || 0
    }, {
      title: '分享数',
      field: 'shareSum',
      formatter: (v) => v || 0
    }, {
      title: '足迹查看次数',
      field: 'scanSum',
      formatter: (v) => v || 0
    }];
    this.soaring && this.rankFields.unshift({
      title: '批次',
      field: 'batch'
    });
    this.adjustFields = [{
      title: '虚拟票数',
      field: 'fakeTicket',
      help: '正数表示新增票数，负数表示扣减票数',
      readonly: false
    }, {
      title: '备注',
      field: 'remark',
      readonly: false
    }];
    this.state = {
      token: '',
      player: {},
      rank: {},
      fetching: true,
      selectData: {}
    };
  }
  componentDidMount() {
    Promise.all([
      getQiniuToken(),
      getDictList({ parentKey: 'player_status' }),
      fetch(640016, { code: this.playerCode }),
      fetch(640026, { code: this.code })
    ]).then(([token, playerStatus, player, rank]) => {
      this.setState({
        player,
        rank,
        selectData: { status: playerStatus },
        token: token.uploadToken,
        fetching: false
      });
    }).catch(() => this.setState({ fetching: false }));
  }
  // 获取label
  getLabel(item) {
    return (
      <span className={item.required && ((item.type === 'textarea' && !item.normalArea) || (item.type === 'o2m')) ? 'ant-form-item-required' : ''}>
        {item.title + (item.single ? '(单)' : '')}
          {item.help ? <Tooltip title={item.help}><Icon type="question-circle-o"/></Tooltip> : null}
      </span>
    );
  }
  // 获取输入框类型的控件
  getInputComp(item, initVal, rules, getFieldDecorator) {
    const props = {
      rules,
      initVal,
      getFieldDecorator,
      title: item.title,
      field: item.field,
      label: this.getLabel(item),
      readonly: item.readonly,
      onChange: item.onChange,
      placeholder: item.placeholder,
      getFieldError: this.props.form.getFieldError,
      getFieldValue: this.props.form.getFieldValue
    };
    return <CInput key={item.field} {...props} />;
  }
  // 获取textarea的控件
  getNormalTextArea(item, initVal, rules, getFieldDecorator) {
    const props = {
      initVal,
      rules,
      getFieldDecorator,
      field: item.field,
      label: this.getLabel(item),
      readonly: item.readonly,
      getFieldError: this.props.form.getFieldError,
      getFieldValue: this.props.form.getFieldValue
    };
    return <CNormalTextArea key={item.field} {...props} />;
  }
  // 获取选择框类型的控件
  getSelectComp(item, initVal, rules, getFieldDecorator) {
    const props = {
      initVal,
      rules,
      getFieldDecorator,
      field: item.field,
      label: this.getLabel(item),
      keyName: item.keyName,
      valueName: item.valueName,
      readonly: item.readonly,
      getFieldValue: this.props.form.getFieldValue,
      getFieldError: this.props.form.getFieldError,
      list: this.state.selectData[item.field]
    };
    return <CSelect key={item.field} {...props} />;
  }
  // 获取文件图片上传类型的控件
  getFileComp(item, initVal, rules, getFieldDecorator, isImg) {
    const props = {
      initVal,
      rules,
      getFieldDecorator,
      getFieldValue: this.props.form.getFieldValue,
      isFieldValidating: this.props.form.isFieldValidating,
      multiple: item.multiple,
      field: item.field,
      label: this.getLabel(item),
      single: item.single,
      readonly: item.readonly,
      token: this.state.token,
      isLoaded: this.state.isLoaded,
      getFieldError: this.props.form.getFieldError,
      setFieldsValue: this.props.form.setFieldsValue
    };
    return <CUpload key={item.field} {...props} />;
  }
  // 人工调节
  saveInfo = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(validateFieldsAndScrollOption, (err, values) => {
      if (!err) {
        this.setState({ fetching: true });
        values.code = this.code;
        values.updater = getUserId();
        fetch(640020, values).then(() => {
          this.setState({ fetching: false });
          showSucMsg('操作成功');
          setTimeout(() => {
            this.props.history.go(-1);
          }, 1000);
        }).catch(() => this.setState({ fetching: false }));
      }
    });
  }
  // 选手信息
  buildPlayerDetail() {
    let children = [];
    this.playerFields.forEach(f => {
      this.judgeFieldType(f);
      children.push(this.getItemByType(f.type, f, this.state.player));
    });
    return children;
  }
  // 榜单信息
  buildRankDetail() {
    let children = [];
    this.rankFields.forEach(f => {
      this.judgeFieldType(f);
      children.push(this.getItemByType(f.type, f, this.state.rank));
    });
    return children;
  }
  // 人工调节
  buildAdjustDetail() {
    let children = [];
    this.adjustFields.forEach(f => {
      this.judgeFieldType(f);
      children.push(this.getItemByType(f.type, f));
    });
    return children;
  }
  // 根据field的type做预处理
  judgeFieldType(f) {
    f.readonly = isUndefined(f.readonly) ? !!this.view : !!f.readonly;
    if (f.type === 'select') {
      f.keyName = f.keyName || 'dkey';
      f.valueName = f.valueName || 'dvalue';
    }
  }
  // 根据类型获取控件
  getItemByType(type, item, pageData) {
    const { getFieldDecorator } = this.props.form;
    const { selectData } = this.state;
    let rules = getRules(item);
    let initVal = getRealValue({...item, pageData, selectData});
    switch (type) {
      case 'o2m':
        return this.getTableItem(item, initVal);
      case 'provSelect':
      case 'select':
        return item.pageCode
          ? this.getSearchSelectItem(item, initVal, rules, getFieldDecorator)
          : this.getSelectComp(item, initVal, rules, getFieldDecorator);
      case 'date':
      case 'datetime':
        return item.rangedate
          ? this.getRangeDateItem(item, initVal, rules, getFieldDecorator, type === 'datetime')
          : this.getDateItem(item, initVal, rules, getFieldDecorator, type === 'datetime');
      case 'month':
        return this.getMonthItem(item, initVal, rules, getFieldDecorator);
      case 'img':
        return this.getFileComp(item, initVal, rules, getFieldDecorator, true);
      case 'file':
        return this.getFileComp(item, initVal, rules, getFieldDecorator, false);
      case 'textarea':
        return item.normalArea
          ? this.getNormalTextArea(item, initVal, rules, getFieldDecorator)
          : this.getTextArea(item, initVal, rules, getFieldDecorator);
      case 'citySelect':
        return this.getCitySelect(item, initVal, rules, getFieldDecorator);
      case 'checkbox':
        return this.getCheckboxComp(item, initVal, rules, getFieldDecorator);
      case 'treeSelect':
        return this.getTreeSelectComp(item, initVal, rules, getFieldDecorator);
      default:
        return this.getInputComp(item, initVal, rules, getFieldDecorator);
    }
  }
  onCancel = () => this.props.history.go(-1)
  render() {
    return (
      <div>
        <Form className="detail-form-wrapper" onSubmit={this.saveInfo}>
          <Card title="选手信息" style={{marginBottom: 20}}>
            <div className="detail-form-wrapper">
              {this.buildPlayerDetail()}
            </div>
          </Card>
          <Card title="榜单信息" style={{marginBottom: 20}}>
            <div className="detail-form-wrapper">
              {this.buildRankDetail()}
            </div>
          </Card>
          {
            this.adjust ? (
              <Card title="人工调节" style={{marginBottom: 20}}>
                <div className="detail-form-wrapper">
                  {this.buildAdjustDetail()}
                </div>
              </Card>
            ) : null
          }
          <FormItem className="cform-item-btn" key='btns' {...formItemLayout} label="&nbsp;">
            {!this.adjust
              ? <Button onClick={this.onCancel}>返回</Button>
              : (
                <div>
                  <Button type="primary" htmlType="submit">保存</Button>
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

export default RankingAddEdit;
