import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import UserService from "../../service/users";
import { About, Home, Login, Register } from "../../page";

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  clearEdit = () => this.setState({ userEdit: {} });

  loginStatusCheck = (e) => {
    const { loginStatus } = this.props;
    console.log("VALUE ====>", e.target.value);
    console.log("STATUS ====>", loginStatus);
  };

  renderPage = () => {
    const { loginStatus } = this.props;
    console.log("STATUS LOGIN ====>", loginStatus);
    return (
      <Switch>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login changeStat={this.props.changeStatus} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route
          path="/register/:id"
          children={(props) => <Register {...props} />}
        />
      </Switch>
    );
  };
  render() {
    return (
      <>
        <div>{this.renderPage()}</div>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  registrasi: (newUser) => dispatch({ type: "REGISTER", payload: { newUser } }),
});
export default connect(null, mapDispatchToProps)(Body);
