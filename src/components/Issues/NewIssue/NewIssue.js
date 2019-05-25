import React, { Component } from 'react';
import {Input, Button} from 'antd';

class NewIssue extends Component {
    render() {
      return (
        <div className='newIssueForm'>
          <h2 className = 'formTitle'>Create a new issue</h2>
          <Input className = 'newIssueTitle' placeholder='Issue title'/>
          <Input.TextArea
          placeholder="Information about the issue"
          autosize={{ minRows: 2, maxRows: 6 }}
          />
          <Input className = 'newIssueAddress' placeholder='Issue address'/>
          <Button type='primary'>Submit</Button>
        </div>
        );
    }
  }
  
  export default NewIssue;