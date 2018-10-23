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
} from '@redux/security/sysParam';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.securitySysParam,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class SysParam extends React.Component {
    render() {
        const fields = [{
            field: 'remark',
            title: '参数名'
        }, {
            field: 'cvalue',
            title: '参数值',
            render: (v, data) => {
                if (v) {
                    v = v.substring(0, 50);
                }
                return <div>{v}</div>;
            }
        }, {
            field: 'updateDatetime',
            title: '最近修改时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 630045,
            rowKey: 'id',
            btnEvent: {
                edit: (keys, rows) => {
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else if (keys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/system/sysPara/addedit?code=${keys[0]}&ckey=${rows[0].ckey}`);
                    }
                }
            }
        });
    }
}

export default SysParam;
