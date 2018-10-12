import React from 'react';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/finance/withdraw/rules';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
  state => ({
    ...state.withdrawRules,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Rules extends React.Component {
  render() {
    const fields = [{
      field: 'remark',
      title: '参数名'
    }, {
      field: 'cvalue',
      title: '参数值'
    }];
    return this.props.buildList({
      fields,
      pageCode: 630045,
      rowKey: 'id',
      searchParams: {
        type: 'WITH'
      }
    });
  }
}

export default Rules;
