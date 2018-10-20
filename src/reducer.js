import { combineReducers } from 'redux';

import { user } from './redux/user';
import { menu } from './redux/menu';
import { securityRole } from './redux/security/role';
import { securityMenu } from './redux/security/menu';
import { securitySysParam } from './redux/security/sysParam';
import { securityUser } from './redux/security/user';
import { securityDataDict } from './redux/security/dataDict';
import { publicBanner } from './redux/public/banner';
/** ***** 财务管理start ***** **/
// 财务管理--平台账户
import { platformAccount } from './redux/finance/platform/account';
import { platformAccountFlows } from './redux/finance/platform/accountFlows';
import { platformAccountList } from './redux/finance/platform/accountList';
import { platformFlows } from './redux/finance/platform/flows';
// 财务管理--充值管理
import { rechargeAccounts } from './redux/finance/recharge/accounts';
import { rechargeRecharges } from './redux/finance/recharge/recharges';
import { rechargeRecords } from './redux/finance/recharge/records';
// 财务管理--取现管理
import { withdrawRules } from './redux/finance/withdraw/rules';
import { withdrawWithdraw } from './redux/finance/withdraw/withdraw';
import { withdrawRecords } from './redux/finance/withdraw/records';
// 业务管理--用户管理
import { userUsers } from './redux/biz/user/users';
import { userUserAccounts } from './redux/biz/user/user-accounts';
import { userShares } from './redux/biz/user/shares';
import { userFootMark } from './redux/biz/user/footmark';
import { userFollow } from './redux/biz/user/follow';
import { userOrders } from './redux/biz/user/orders';
import { userAccounts } from './redux/biz/user/accounts';
import { userAccountFlows } from './redux/biz/user/account-flows';
import { userFlows } from './redux/biz/user/flows';
// 业务管理--赛事管理
import { gameInfos } from './redux/biz/game/infos';
import { gamePlayers } from './redux/biz/game/players';
import { gameRanking } from './redux/biz/game/ranking';
import { gameSoaring } from './redux/biz/game/soaring';
// 业务管理--客服管理
import { serviceUnRead } from './redux/biz/service/unread';
import { serviceMessages } from './redux/biz/service/messages';
import { serviceTemplate } from './redux/biz/service/template';
// 业务管理--评论管理
import { commentKeywords } from './redux/biz/comment/keywords';
import { commentCheck } from './redux/biz/comment/check';
import { commentList } from './redux/biz/comment/list';

export default combineReducers({
  user,
  menu,
  securityRole,
  securityMenu,
  securityUser,
  securitySysParam,
  securityDataDict,
  publicBanner,
  platformAccount,
  platformAccountFlows,
  platformAccountList,
  platformFlows,
  rechargeAccounts,
  rechargeRecharges,
  rechargeRecords,
  withdrawRules,
  withdrawWithdraw,
  withdrawRecords,
  userUsers,
  userUserAccounts,
  userShares,
  userFootMark,
  userFollow,
  userOrders,
  userAccounts,
  userAccountFlows,
  userFlows,
  gameInfos,
  gamePlayers,
  gameRanking,
  gameSoaring,
  serviceUnRead,
  serviceMessages,
  serviceTemplate,
  commentKeywords,
  commentCheck,
  commentList
});
