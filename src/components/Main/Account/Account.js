import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';


class Account extends Component {
  constructor(props) {
    super(props);

    this.give = this.give.bind(this);
  }

  give() {
    const { contract, account, accountBalance, address } = this.props;
    contract && contract.transfer(address, accountBalance, { from: account }, (err, res) => {

    });
  }

  render() {
    return (
      <Row className="head hd1">
        <Col className='index' span={4}>{this.props.id}</Col>
        <Col className="addr" span={16}>{this.props.address}</Col>
        <Col span={4}><Button onClick={this.give} type='primary'>Give</Button> </Col>
      </Row>
    );
  }
}

export default Account;