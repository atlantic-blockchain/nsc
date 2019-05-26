import React, { Component } from 'react';
import Account from './Account';
import { Button, Row, Col, Input } from 'antd';


class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      citizenAddress: '',
      citizens: []
    };

    this.register = this.register.bind(this);
    this.changeCitizenAddress = this.changeCitizenAddress.bind(this);
    this.pushCitizen = this.pushCitizen.bind(this);
  }

  componentWillMount = () => {
    const { contract } = this.props;
    contract && contract.citizenCount((err, res) => {
      const count = res.toNumber();
      for (let i = 0; i < count; i++) {
        this.props.contract.citizens(i, (err, res) => {
          this.pushCitizen(res);
        });
      }
    })
  }

  pushCitizen(citizen) {
    let citizens = this.state.citizens.slice();
    citizens.push(citizen);
    this.setState({
      citizens
    });
  }

  changeCitizenAddress(e) {
    this.setState({
      citizenAddress: e.target.value
    });
  }

  register() {
    const { web3, contract, account } = this.props;
    const { citizenAddress } = this.state;

    contract.register(citizenAddress, {from: account}, (err, res) => {});
  }

  render() {
    return (
      <Row>

        <Col span={24}>
          <Row>
            { this.state.citizens.map((citizen, index) => {
              return (
                <Col span={24} key={index}>
                  <Account id={index} address={citizen} { ...this.props } />
                </Col>
              )
            })}
          </Row>
        </Col>

        <Col span={24}>
          <Input value={this.state.citizenAddress} onChange={this.changeCitizenAddress} type='text' placeholder='Citizen Address' />
          <Button onClick={this.register} type='primary'>Submit</Button>
        </Col>
      </Row>
    );
  }
}

export default Main;