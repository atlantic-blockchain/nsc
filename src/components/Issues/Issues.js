import React, { Component } from 'react';

import { Row, Col } from 'antd';

import Issue from './Issue';
import NewIssue from './NewIssue';

class Issues extends Component {

  constructor(props) {
    super(props);
    this.state = {
      issues: [{
        title: 'Issue title #1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae felis at est aliquet maximus quis id leo.',
        img: '#',
        count: 0
      },
      {
        title: 'Issue title #2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae felis at est aliquet maximus quis id leo.',
        img: '#',
        count: 2
      },
      {
        title: 'Issue title #3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae felis at est aliquet maximus quis id leo.',
        img: '#',
        count: 400
      }]
    };
  }

  render() {
    return (
      <div>
      <Row>
        {
          this.state.issues.map((item, i) => {
            return <Col span={8}><Issue title={item.title} desc={item.description} img={item.img} count={item.count}></Issue></Col>
          })
        }
      </Row>
      <Row>
        <Col span={8}><NewIssue></NewIssue></Col>
      </Row>
      </div>
    );
  }
}

export default Issues;