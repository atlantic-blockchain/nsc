import React, { Component } from 'react';
import { Row, Col } from 'antd';

class Distro extends Component {

  constructor(props) {
    super(props);

    this.state = {
      accountsBalance: 0,
      issuesBalance: 0,
      issues: [],
      snapshot: [],
      totalTaxAccount: 1000000
    }

    this.pushIssue = this.pushIssue.bind(this);
  }

  componentWillMount() {
    const { contract } = this.props;

    contract && contract.citizenCount((err, res) => {
      const count = res.toNumber();
      for (let i = 0; i < count; i++) {
        this.props.contract.balances(i, (err, res) => {
          let accountsBalance = this.state.accountsBalance + res.toNumber();
          let snapshot = this.state.snapshot.slice();

          snapshot.push({
            type: 'citizen',
            index: i,
            balance: res.toNumber()
          });

          this.setState({
            accountsBalance, snapshot
          });
        });
      }
    });

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
    let issuesBalance = this.state.issuesBalance;

    let snapshot = this.state.snapshot.slice();

    snapshot.push({
      type: 'issue',
      name: issue[0],
      balance: issue[2].toNumber()
    });

    issuesBalance += issue[2].toNumber();

    issues.push(issue);
    this.setState({
      issues, issuesBalance, snapshot
    });
  }


  render() {
    const { issues, accountsBalance, issuesBalance, snapshot, totalTaxAccount } = this.state;
    const { currentSupply } = this.props;

    const totalSupply = currentSupply + accountsBalance + issuesBalance;
    const distributedSupply = totalSupply - currentSupply;

    return (
      <Row>
        <Col span={24}>
          <h1>Distro</h1>
          <h2>Total Supply: {totalSupply}</h2>
          <h2>CurrentSupply: {currentSupply}</h2>
          <h2>Accounts Balance: {accountsBalance}</h2>
          <h2>Issues Balance: {issuesBalance}</h2>
          <h2>Percent Given to Issues: % {((issuesBalance / totalSupply) * 100).toFixed(4)}</h2>
          <h2>Percent Kept By Citizens: % {((accountsBalance / totalSupply) * 100).toFixed(4)}</h2>
          <h2>Percent Unallocated: % {((currentSupply / totalSupply) * 100).toFixed(4)}</h2>
        </Col>

        <Col span={24}>
        <hr />
          <Row>
            <Col span={6}>TYPE</Col>
            <Col span={6}>ID/INFO</Col>
            <Col span={6}>BALANCE</Col>
            <Col span={6}>TAX DIVIDEND</Col>

            {
              snapshot.map((item, index) => {
                return (
                  <div key={index}>
                    <Col span={6}>{item.type.toUpperCase()}</Col>
                    <Col span={6}>
                      {
                        item.type === 'issue' ?
                          item.name : `Citizen ID: ${item.index}`
                      }
                    </Col>
                    <Col span={6}>{item.balance}</Col>
                    <Col span={6}>${(((item.balance / distributedSupply)) * totalTaxAccount).toFixed(2)}</Col>
                  </div>
                )
              })
            }
          </Row>
          <hr />
        </Col>
      </Row>
    );
  }
}

export default Distro;