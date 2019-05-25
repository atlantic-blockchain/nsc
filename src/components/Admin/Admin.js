import React, { Component } from 'react';
import { Button } from 'antd';

class Admin extends Component {
  render() {
    return (
      <div>
      <h1>Admin</h1>
      <Button className="btn" type="primary" block>Collect</Button>
      <Button className="btn" type="primary" block>Distribute</Button>
      </div>
      );
    }
  }
      
      
      

export default Admin;