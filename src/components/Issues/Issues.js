import React, { Component } from 'react';

import { Row, Col } from 'antd';

import Issue from './Issue';
import NewIssue from './NewIssue';

class Issues extends Component {

  constructor(props) {
    super(props);
    this.state = {
      issues: []
    };
    this.pushIssue = this.pushIssue.bind(this);
  }

  componentWillMount = () => {
    const { contract } = this.props;
    contract && contract.issueCount((err, res) => {
      const count = res.toNumber();
      for (let i = 0; i < count; i++) {
        this.props.contract.issues(i, (err, res) => {
          this.pushIssue(res);
        });
      }
    });
  }

  pushIssue(issue) {
    let issues = this.state.issues.slice();
    issues.push(issue);
    this.setState({
      issues
    });
  }

  render() {
    return (
      <div>
        <Row>
          {
            this.state.issues.map((item, i) => {
              return (
                <Col key={i} span={8}>
                  <Issue 
                    id={i}
                    title={item[0]}
                    desc={item[1]}
                    img="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    count={item[2].toNumber()}
                    contract={this.props.contract}
                    web3={this.props.web3}
                    account={this.props.account}
                    accountBalance={this.props.accountBalance}
                  />
                </Col>
              )
            })
          }
        </Row>

          <hr />

        <Row>
          <Col span={8}></Col>
          <Col span={8}><NewIssue {...this.props}></NewIssue></Col>
        </Row>
      </div>
    );
  }
}

export default Issues;