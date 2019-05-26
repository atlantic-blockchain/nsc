import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';

class Admin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      distributionSuccess: false
    };

    this.distribute = this.distribute.bind(this);
    this.reset = this.reset.bind(this);
  }

  distribute() {
    const { contract } = this.props;
    contract && contract.distribute((err, res) => {
      if (!err) {
        this.setState({
          distributionSuccess: true
        });
      }
    })
  }

  reset() {
    const { contract, account } = this.props;
    contract && contract.reset({from: account}, (err, res) => {})
  }

  render() {
    return (
      <Row>
        <Col span={24}>
          <h1>Admin</h1>
        </Col>
        <Col span={24}>
          <Button onClick={this.distribute} className='btn' type='primary'>Distribute</Button>
          <Button onClick={this.reset} className='btn' type='primary'>Reset</Button>
        </Col>
        { this.state.distributionSuccess && 
          <Col span={24}>
            <h1 stlye={{"font-size": "50px", "color": "green"}}>Distribution Success</h1>
          </Col>
        }
      </Row>
    );
  }
}




export default Admin;