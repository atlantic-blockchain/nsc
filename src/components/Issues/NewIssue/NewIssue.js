import React, { Component } from 'react';
import { Input, Button, Row, Col } from 'antd';

class NewIssue extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      address: ''
    };

    this.changeTitle = this.changeTitle.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.submit = this.submit.bind(this);
  }

  changeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  changeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  changeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  submit() {
    ;
    const { contract, account } = this.props;
    const { title, description, address } = this.state;

    contract && contract.newIssue(title, description, address, { from: account }, (err, res) => {
    })
  }

  render() {
    return (
      <Row className='newIssueForm'>
        <Col span={24}>
          <h2 className='formTitle'>Create a new issue</h2>
          <Input value={this.state.title} onChange={this.changeTitle} className='newIssueTitle' placeholder='Issue title' />
          <Input.TextArea
            placeholder='Information about the issue'
            autosize={{ minRows: 2, maxRows: 6 }}
            value={this.state.description}
            onChange={this.changeDescription}
          />
          <Input value={this.state.address} onChange={this.changeAddress} className='newIssueAddress' placeholder='Issue address' />
          <Button onClick={this.submit} type='primary'>Submit</Button>
        </Col>
        {
          this.state.issueCreationSuccess && 
          <Col span={24}><h1>Issue Creation Success</h1></Col> 
        }
      </Row>
    );
  }
}

export default NewIssue;