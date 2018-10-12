import asyncComponent from './component/async-component/async-component';

const ROUTES = [
  {
    path: '/system/role',
    component: asyncComponent(() => import('container/security/role/role'))
  },
  {
    path: '/system/role/addedit',
    component: asyncComponent(() => import('container/security/role-addedit/role-addedit'))
  },
  {
    path: '/system/role/menu',
    component: asyncComponent(() => import('container/security/role-menu/role-menu'))
  },
  {
    path: '/system/menu',
    component: asyncComponent(() => import('container/security/menu/menu'))
  },
  {
    path: '/system/menu/addedit',
    component: asyncComponent(() => import('container/security/menu-addedit/menu-addedit'))
  },
  {
    path: '/system/user',
    component: asyncComponent(() => import('container/security/user/user'))
  },
  {
    path: '/system/user/role',
    component: asyncComponent(() => import('container/security/user/assign'))
  },
  {
    path: '/system/user/pwd_reset',
    component: asyncComponent(() => import('container/security/user/pwdReset'))
  },
  //  系统参数
  {
    path: '/system/sysPara',
    component: asyncComponent(() => import('container/security/sysParam/sysParam'))
  },
  //  系统参数修改
  {
    path: '/system/sysPara/addedit',
    component: asyncComponent(() => import('container/security/sysParam-addedit/sysParam-addedit'))
  },
  {
    path: '/system/dataDict',
    component: asyncComponent(() => import('container/security/dataDict/dataDict'))
  },
  {
    path: '/system/dataDict/addedit',
    component: asyncComponent(() => import('container/security/dataDict-addedit/dataDict-addedit'))
  },
  {
    path: '/system/user/addedit',
    component: asyncComponent(() => import('container/security/user-addedit/user-addedit'))
  },
  // 系统管理 -- 文章管理 -- 注册协议
  {
    path: '/public/registrationAgreement',
    component: asyncComponent(() => import('container/public/registrationAgreement/registrationAgreement'))
  },
  // 系统管理 -- 广告位管理 -- banner管理
  {
    path: '/public/banner',
    component: asyncComponent(() => import('container/public/banner/banner'))
  },
  // 系统管理 -- 广告位管理 -- banner管理 -- 详情
  {
    path: '/public/banner/addedit',
    component: asyncComponent(() => import('container/public/banner-addedit/banner-addedit'))
  },
  // 财务管理 -- 平台账户 -- 账户查询
  {
    path: '/platform/account',
    component: asyncComponent(() => import('container/finance/platform/account/account'))
  },
  // 财务管理 -- 平台账户 -- 账户查询 -- 流水查询
  {
    path: '/platform/account/flows',
    component: asyncComponent(() => import('container/finance/platform/account/account-flows'))
  },
  // 财务管理 -- 平台账户 -- 账户查询 -- 提现回录
  {
    path: '/platform/account/enter',
    component: asyncComponent(() => import('container/finance/platform/account/account-enter'))
  },
  // 财务管理 -- 平台账户 -- 账户查询 -- 资金分布
  {
    path: '/platform/account/accounts',
    component: asyncComponent(() => import('container/finance/platform/account/account-list'))
  },
  // 财务管理 -- 平台账户 -- 流水查询
  {
    path: '/platform/flows',
    component: asyncComponent(() => import('container/finance/platform/flows/flows'))
  },
  // 财务管理 -- 充值管理 -- 线下充值
  {
    path: '/recharge/recharges',
    component: asyncComponent(() => import('container/finance/recharge/recharges/recharges'))
  },
  // 财务管理 -- 充值管理 -- 线下充值 -- 详情
  {
    path: '/recharge/recharges/addedit',
    component: asyncComponent(() => import('container/finance/recharge/recharges/recharges-addedit'))
  },
  // 财务管理 -- 充值管理 -- 充值查询
  {
    path: '/recharge/records',
    component: asyncComponent(() => import('container/finance/recharge/records/records'))
  },
  // 财务管理 -- 充值管理 -- 充值查询 -- 详情
  {
    path: '/recharge/records/addedit',
    component: asyncComponent(() => import('container/finance/recharge/recharges/recharges-addedit'))
  },
  // 财务管理 -- 取现管理 -- 取现规则
  {
    path: '/withdraw/rules',
    component: asyncComponent(() => import('container/finance/withdraw/rules/rules'))
  },
  // 财务管理 -- 取现管理 -- 取现规则 -- 详情
  {
    path: '/withdraw/rules/addedit',
    component: asyncComponent(() => import('container/security/sysParam-addedit/sysParam-addedit'))
  },
  // 财务管理 -- 取现管理 -- 线下取现
  {
    path: '/withdraw/withdraw',
    component: asyncComponent(() => import('container/finance/withdraw/withdraw/withdraw'))
  },
  // 财务管理 -- 取现管理 -- 线下取现 -- 详情
  {
    path: '/withdraw/withdraw/addedit',
    component: asyncComponent(() => import('container/finance/withdraw/withdraw/withdraw-addedit'))
  },
  // 财务管理 -- 取现管理 -- 线下取现
  {
    path: '/withdraw/records',
    component: asyncComponent(() => import('container/finance/withdraw/records/records'))
  },
  // 财务管理 -- 取现管理 -- 线下取现
  {
    path: '/withdraw/records/addedit',
    component: asyncComponent(() => import('container/finance/withdraw/withdraw/withdraw-addedit'))
  },
  // 业务管理 -- 用户管理 -- 会员查询
  {
    path: '/user/users',
    component: asyncComponent(() => import('container/biz/user/users/users'))
  },
  // 业务管理 -- 用户管理 -- 会员查询 -- 详情
  {
    path: '/user/users/addedit',
    component: asyncComponent(() => import('container/biz/user/users/users-addedit'))
  },
  // 业务管理 -- 用户管理 -- 会员查询 -- 账户查询
  {
    path: '/user/users/accounts',
    component: asyncComponent(() => import('container/biz/user/users/user-accounts'))
  },
  // 业务管理 -- 用户管理 -- 账户查询
  {
    path: '/user/accounts',
    component: asyncComponent(() => import('container/biz/user/accounts/accounts'))
  },
  // 业务管理 -- 用户管理 -- 账户查询 -- 流水查询
  {
    path: '/user/accounts/flows',
    component: asyncComponent(() => import('container/biz/user/accounts/account-flows'))
  },
  // 业务管理 -- 用户管理 -- 账户查询 -- 流水查询 -- 详情
  {
    path: '/user/accounts/flows/addedit',
    component: asyncComponent(() => import('container/finance/flows-addedit/flows-addedit'))
  },
  // 业务管理 -- 用户管理 -- 流水查询
  {
    path: '/user/flows',
    component: asyncComponent(() => import('container/biz/user/flows/flows'))
  },
  // 业务管理 -- 用户管理 -- 流水查询 -- 详情
  {
    path: '/user/flows/addedit',
    component: asyncComponent(() => import('container/finance/flows-addedit/flows-addedit'))
  },
  // 业务管理 -- 赛事管理 -- 赛事信息管理
  {
    path: '/game/infos',
    component: asyncComponent(() => import('container/biz/game/infos/infos'))
  },
  // 业务管理 -- 赛事管理 -- 赛事信息管理 -- 详情
  {
    path: '/game/infos/addedit',
    component: asyncComponent(() => import('container/biz/game/infos/infos-addedit'))
  },
  // 业务管理 -- 赛事管理 -- 赛事信息管理
  {
    path: '/game/players',
    component: asyncComponent(() => import('container/biz/game/players/players'))
  },
  // 业务管理 -- 赛事管理 -- 赛事信息管理 -- 详情
  {
    path: '/game/players/addedit',
    component: asyncComponent(() => import('container/biz/game/players/players-addedit'))
  },
  // 业务管理 -- 业务规则 -- 好友排行权重设置
  {
    path: '/rules/weight',
    component: asyncComponent(() => import('container/biz/rules/weight/weight'))
  },
  // 业务管理 -- 业务规则 -- 好友排行权重设置 -- 详情
  {
    path: '/rules/weight/addedit',
    component: asyncComponent(() => import('container/biz/rules/weight/weight-addedit'))
  }
];

export default ROUTES;
