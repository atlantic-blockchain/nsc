import React, { Component } from 'react';
import Account from './Account';
import { Button } from 'antd';
import { Pagination } from 'antd';


function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize);
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'This is a test',
      number: 1000
    };
  }

  render() {
    return (
      <div>
        <div className="acc">
          <Account></Account>
          <Account></Account>
          <Account></Account>
        </div>
        <div>
          <div className="pg">
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              defaultCurrent={3}
              total={500}
            />
            <br />

          </div>
        </div>
      </div>
    );
  }
}











export default Main;