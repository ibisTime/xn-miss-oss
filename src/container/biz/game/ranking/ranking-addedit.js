import React from 'react';
import { Form, Card } from 'antd';
import { getQiniuToken } from 'api/general';
import CInput from 'component/cInput/cInput';
import CNormalTextArea from 'component/cNormalTextArea/cNormalTextArea';
import CTextArea from 'component/cTextArea/cTextArea';
import CSelect from 'component/cSelect/cSelect';
import CSearchSelect from 'component/cSearchSelect/cSearchSelect';
import CUpload from 'component/cUpload/cUpload';
import { getQueryString, showSucMsg, getUserId, getRules, getRealValue } from 'common/js/util';
import { validateFieldsAndScrollOption } from 'common/js/config';
import fetch from 'common/js/fetch';

@Form.create()
class RankingAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.adjust = !!getQueryString('adjust', this.props.location.search);
    this.options = {
      code: this.code,
      view: this.view
    };
    this.playerFields = [{
      title: '选手编号',
      field: 'matchPlayCode',
      required: true
    }, {
      title: '中文名',
      field: 'match',
      required: true
    }, {
      title: '英文名',
      field: 'matchPlayCode',
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
      fetch(640016, { code: this.pCode }),
      fetch(640026, { code: this.code })
    ]).then(([token, player, rank]) => {
      this.setState({
        player,
        rank,
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
  saveInfo() {
    this.props.form.validateFieldsAndScroll(validateFieldsAndScrollOption, (err, values) => {
      if (!err) {
        this.doFetching();
        values.code = this.code;
        values.updater = getUserId();
        fetch(640020, values).then(() => {
          this.cancelFetching();
          showSucMsg('操作成功');
          setTimeout(() => {
            this.props.history.go(-1);
          }, 1000);
        }).catch(this.cancelFetching);
      }
    });
  }
  // 选手信息
  buildPlayerDetail() {
    let children = [];
    this.playerFields.forEach(f => {
      this.judgeFieldType(f);
      children.push(this.getItemByType(f.type, f));
    });
    return children;
  }
  // 榜单信息
  buildRankDetail() {}
  // 人工调节
  buildAdjustDetail() {}
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
  render() {
    /*buttons: this.adjust ? [{
      title: '保存',
      type: 'primary',
      check: true,
      handler: (params) => this.saveInfo()
    }, {
      title: '返回',
      handler: () => this.props.history.go(-1)
    }] : [{
      title: '返回',
      handler: () => this.props.history.go(-1)
    }]*/
    return (
      <div>
        <Form>
          <Card title="选手信息">
            {this.buildPlayerDetail()}
          </Card>
          <Card title="榜单信息">
            {this.buildRankDetail()}
          </Card>
          <Card title="人工调节">
            {this.buildAdjustDetail()}
          </Card>
        </Form>
      </div>
    );
  }
}

export default RankingAddEdit;
