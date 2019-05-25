import React, { Component } from 'react';
import { Layout, Icon, Menu } from 'antd';
import { BrowserRouter as Router, Route, withRouter, Link } from 'react-router-dom';

import Main from './components/Main';
import Admin from './components/Admin';
import Issues from './components/Issues';

import './App.scss';

import getWeb3 from './utils/getWeb3';

import NST from './contracts/NST.json';

const { Sider, Header, Content } = Layout;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      web3: null,
      contract: null,
      currentSupply: 0
    };
  }

  componentWillMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // // Get the contract instance.
      const deployedNetwork = NST.networks["5777"];

      const instance = web3.eth.contract(
        NST.abi
      );

      const contract = instance.at(deployedNetwork.address);
      // // Set web3, accounts, and contract to the state, and then proceed with an
      // // example of interacting with the contract's methods.
      this.setState({ 
        web3,
        contract
      }, this.init);
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.log(error)
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
    }
  }

  init = () => {
    const { contract } = this.state;
    contract.currentSupply((err, res) => {
      this.setState({
        currentSupply: res.toNumber()
      });
    });

    console.log(contract);

    contract.citizens(0, (err, res) => {

    });
  }


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Router>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className='logo' />
            <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
              <Menu.Item className='menuLink' key='1'>
                <Icon type='user' />
                <span><Link to='/'>Main</Link></span>
              </Menu.Item>
              <Menu.Item className='menuLink' key='2'>
                <Icon type='video-camera' />
                <span><Link to='/admin'>Admin</Link></span>
              </Menu.Item>
              <Menu.Item className='menuLink' key='3'>
                <Icon type='upload' />
                <span><Link to='/issues'>Issues</Link></span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff' }}>
              <Icon
                className='trigger'
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              Max Supply: {this.state.currentSupply}
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >
              <Route exact path='/' component={() => <Main {...this.state} />}/>
              <Route path='/issues' component={Issues}/>
              <Route path='/admin' component={Admin}/>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
