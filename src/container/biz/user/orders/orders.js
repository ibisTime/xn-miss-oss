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
} from '@redux/biz/user/orders';
import {listWrapper} from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.userOrders,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Orders extends React.Component {
    render() {
        const fields = [{
            title: '订单编号',
            field: 'code',
            search: true
        }, {
            title: '选手编号',
            field: 'playerCode',
            search: true
        }, {
            title: '姓名',
            field: 'playerCname',
            render: (v, d) => `${d.playerInfo.cname}-${d.playerInfo.ename}`
        }, {
            title: '票数',
            field: 'ticket'
        }, {
            title: '下单金额',
            field: 'amount',
            amount: true
        }, {
            title: '下单人',
            field: 'applyUser',
            render: (v, d) => `${d.applyUserInfo.nickname}-${d.applyUserInfo.mobile}`
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'ticket_order_status',
            search: true
        }, {
            title: '下单时间',
            field: 'createDatetime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 640035
        });
    }
}

export default Orders;
