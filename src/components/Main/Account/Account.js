import React, { Component } from 'react';
import { Button, Table, Row, Col } from 'antd';


class Account extends Component {
  render() {
    return (
      <div>
        <h1 className='AccountId'>id_testData</h1>
        <Row className="head hd1">
          <Col className="tknID" span={8}>TokenID</Col>
          <Col className="addr" span={16}>Address</Col>
        </Row>

        <Row classNAme="hd1_data">
          <Col className="tknID" span={8}>id_testData</Col>
          <Col className="addr" span={16}>Addr_testData</Col>
        </Row>

        <Row className="head hd2">
          <Col className="bal" span={8}></Col>
          <Col className="hd2_data" span={16}>bal_testData</Col>
        </Row>
      </div>
    );
  }
}

export default Account;