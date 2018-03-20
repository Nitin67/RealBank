import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions,userActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { resetIdCounter } from 'react-tabs';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { FileUpload } from 'redux-file-upload';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class FindUserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tabIndex: 0 ,
          fetched:false,
          accountID:'',
          imageURL: '',
          loanAmt:'',
          loanDuration:''
        };

        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleFileUpload=this.handleFileUpload.bind(this);
        this.lousubmit=this.lousubmit.bind(this);
        this.handleSubmitLoan=this.handleSubmitLoan.bind(this);
    }
    componentDidMount(){
      debugger;

    }
    handleSubmitLoan(){

    }
    handleUploadImage(ev) {
      debugger;
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('name', this.fileName.value);

    fetch('http://localhost:8080/v1/bank-lou/uploadFile', {
      method: 'POST',
      body: data
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `http://localhost:8080/${body.file}` });
      });
    });


        this.props.dispatch(alertActions.success('LOU update passed'));
  }
    lousubmit(){

    }

    handleFileUpload( file ) {

  debugger;
}
    handleSubmit(){
      debugger;
      this.props.dispatch(userActions.transaction(this.state.accountID));
    }

    handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });

  }

    render() {
      debugger;
      var products=[];
      if(this.props.transaction!=null){
            products=this.props.transaction.transactions;
      }
      const {transaction} =this.props;
        const {submitted,accountID,loanAmt,loanDuration} =this.state;
        return (
            <div>
            <HomePage/>
              <label> Please enter userId </label>
                   <div className={'form-group' + (submitted && !accountID ? ' has-error' : '')}>
                       <input type="text" className="form-control" name="accountID" value={accountID} onChange={this.handleChange} />
                       {submitted && !accountID &&
                           <div className="help-block">accountID is required</div>
                       }
                   </div>
                   <div className="form-group">
                       <button className="btn btn-danger" onClick={this.handleSubmit}>Submit</button>
                       {false &&
                       <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                       }
                   </div>
          {this.props.transaction!=null && <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
            <TabList>
              <Tab>User Details</Tab>
              <Tab>Upload LOU</Tab>
              <Tab>User Transactions</Tab>
              <Tab>Apply Loan</Tab>
            </TabList>
            <TabPanel>
            Name: ABC Kumar<br/>
            total Amount :50000<br/>
            Address :ABC ABC ABC<br/>
            IIFC CODE BANK: 100000000<br/>
            </TabPanel>
            <TabPanel>
              Upload  pdf format of LETTER OF UNDERTAKING
            <form onSubmit={this.handleUploadImage}>
              <div>
                <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
              </div>
              <div>
                <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
              </div>
              <br />
              <div>
                <button>Upload</button>
              </div>
            </form>

          </TabPanel>
            <TabPanel>
              Your Transactions
              <BootstrapTable data={products} style={{width:1200}} pagination>
                <TableHeaderColumn isKey dataField='transactionId' width='200'>id</TableHeaderColumn>
                  <TableHeaderColumn  dataField='from' width='200'>From</TableHeaderColumn>
                  <TableHeaderColumn dataField='amount' width='200'>Amount</TableHeaderColumn>
                  <TableHeaderColumn dataField='transactionType' width='200'>Debit/Credit</TableHeaderColumn>
              </BootstrapTable>
            </TabPanel>
            <TabPanel>
              <label>Enter Loan Amount</label>
              <div className={'form-group' + (submitted && !accountID ? ' has-error' : '')}>
                  <input type="loanAmt" className="form-control" name="loanAmt" value={loanAmt} onChange={this.handleChange} />
                  {submitted && !loanAmt &&
                      <div className="help-block">Loan Amount is required</div>
                  }
              </div>
              <label>Enter Loan Duration</label>
              <div className={'form-group' + (submitted && !accountID ? ' has-error' : '')}>
                  <input type="loanDuration" className="form-control" name="loanDuration" value={loanDuration} onChange={this.handleChange} />
                  {submitted && !loanDuration &&
                      <div className="help-block">Loan Duration is required</div>
                  }
              </div>
              <button className="btn btn-danger" onClick={this.handleSubmitLoan}>Submit</button>
            </TabPanel>
          </Tabs>}
            </div>
        );
    }
}

function mapStateToProps(state) {
      debugger;
    const {transaction} =state.transaction;
    return {transaction};
}

const connectedFindUserProfile = connect(mapStateToProps)(FindUserProfile);
export { connectedFindUserProfile as FindUserProfile };
