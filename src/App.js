import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import UserService from "./service/users";
import customerService from "./service/customer";
import { Navbar, Body, Footer } from "./template";
import customer from "./service/customer";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: false,
    };
  }
  componentDidMount() {
    UserService.getUsers().then((res) => {
      console.log("CEK API LIST ====>", res);
      for (let i = 0; i < res.data.length; i++) {
        this.props.registrasi(res.data[i]);
      }
    });
    customerService.getAllCustomer().then((res) => {
      console.log("CEK CUSTOMER LIST ===>", res);
      for (let i = 0; i < res.data.length; i++) {
        this.props.customer(res.data[i]);
      }
    });
  }
  changeStatus = (status, page) => {
    this.setState({
      currentPage: page,
      loginStatus: status,
    });
  };
  render() {
    return (
      <>
        <Router>
          <Navbar
            loginStatus={this.state.loginStatus}
            changeStatus={this.changeStatus}
          />
          <Body
            changeStatus={this.changeStatus}
            loginStatus={this.state.loginStatus}
          />
          {/* <Footer /> */}
        </Router>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  registrasi: (newUser) => dispatch({ type: "REGISTER", payload: { newUser } }),
  customer: (customer) => dispatch({ type: "customer", payload: { customer } }),
});
export default connect(null, mapDispatchToProps)(App);
