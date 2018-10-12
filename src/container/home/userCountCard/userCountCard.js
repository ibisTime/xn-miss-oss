import React from 'react';
import './index.css';

export default class UserCountCard extends React.Component {
  render() {
    return (
      <div className="usercard-wrapper" style={{backgroundImage: `url(${this.props.bgImage})`}}>
        <div className="usercard-title">
          <div className="title-main">{this.props.title}</div>
          <div className="title-sub">{this.props.subTitle}</div>
        </div>
        <div className="normal-content">
          {this.props.count}<label>人</label>
        </div>
      </div>
    );
  }
}
