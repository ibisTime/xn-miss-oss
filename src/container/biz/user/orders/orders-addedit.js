import React from 'react';
import {Form} from 'antd';
import {getQueryString} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class OrdersAddEdit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '订单编号',
            field: 'code'
        }, {
            title: '选手编号',
            field: 'playerCode'
        }, {
            title: '姓名',
            field: 'playerCname',
            formatter: (v, d) => `${d.playerInfo.cname}-${d.playerInfo.ename}`
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
            formatter: (v, d) => `${d.applyUserInfo.nickname}-${d.applyUserInfo.mobile}`
        }, {
            title: '状态',
            field: 'status',
            key: 'ticket_order_status',
            search: true
        }, {
            title: '下单时间',
            field: 'createDatetime',
            type: 'datetime'
        }, {
            title: '支付时间',
            field: 'payDatetime',
            type: 'datetime',
            hidden: this.state.pageDate && this.state.pageDate.status !== '1'
        }, {
            title: '取消时间',
            field: 'cancelDatetime',
            type: 'datetime',
            hidden: this.state.pageDate && (this.state.pageDate.status !== '2' && this.state.pageDate.status !== '3')
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 640036
        });
    }
}

export default OrdersAddEdit;
