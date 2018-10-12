import React from 'react';
import { connect } from 'react-redux';
import PlatformComp from './platformComp/platformComp';

@connect(
  state => state.user
)
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cnyAccount: {}
    };
  }
  render() {
    const { cnyAccount } = this.state;
    return (
      <div className="home-wrapper">
        <PlatformComp cnyAccount={cnyAccount} />
      </div>
    );
  }
}
