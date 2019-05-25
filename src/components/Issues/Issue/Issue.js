import React, { Component } from 'react';
import { Button } from 'antd';
import { Card } from 'antd';
import { Row, Col } from 'antd';


class Issue extends Component {
  render() {
    return (
      <div className = 'issueContainer'>
        <Card title={this.props.title} bordered={true}>
          <img src={this.props.img} alt='Issue image'/>
          <p className = 'issueInfo'>{this.props.desc}</p>
          <div>
          <Row>
          <Col span={18}><Button type='primary' className ='btn'>Vote</Button></Col>
          <Col span={6}><p className = 'issueCount'>Count: <span>{this.props.count}</span></p></Col>
          </Row>
          </div>
        </Card>
      </div>
    );
  }
}

export default Issue;