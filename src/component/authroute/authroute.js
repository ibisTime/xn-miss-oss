import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserInfo } from '@redux/user';
import { isIllegalUser } from 'api/user';
import { getUserId } from 'common/js/util';
import fetch from 'common/js/fetch';

@withRouter
@connect(
  state => state.user,
  { setUserInfo }
)
class AuthRoute extends React.Component {
  componentDidMount() {
    if (getUserId()) {
      isIllegalUser().then((data) => {
        this.props.setUserInfo(data);
        if (data.url) {
          this.props.history.replace(data.url);
        }
      }).catch(() => {});
    } else if (this.props.location.pathname !== '/register') {
      this.props.history.push('/login');
    }
  }
  render() {
    return null;
  }
}

export default AuthRoute;
