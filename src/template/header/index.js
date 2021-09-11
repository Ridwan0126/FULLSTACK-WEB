import React, { Component } from "react";
import { Menu } from "../../components";
import logo from "../../assets/images/logo.png";
import "./header.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  logout = () => {
    this.props.doLogout();
  };
  checkLogin = () => {
    const { currentPage } = this.props;
    const isLogedIn = this.props.isLogedIn.statusLogin;
    if (isLogedIn)
      return (
        <>
          <Link to="/about">
            <div className={`menu ${currentPage === "about" ? "active" : ""}`}>
              About
            </div>
          </Link>
        </>
      );
  };
  checkLogout = () => {
    const { currentPage } = this.props;
    const isLogedIn = this.props.isLogedIn.statusLogin;
    if (isLogedIn)
      return (
        <>
          <Menu redirect={() => this.props.doLogout()}>Logout</Menu>
        </>
      );
    return (
      <>
        <Link to="./login">
          <div className={`menu ${currentPage === "login" ? "active" : ""}`}>
            Account
          </div>
        </Link>
      </>
    );
  };
  redirectPage = () => {
    this.props.goToPage("Home");
  };
  render() {
    console.log("CEK STATUS LOGIN ====> ", this.login);
    let currentPage = "about";
    return (
      <>
        <div className="topnav">
          <Link to="/home" className="logo">
            <span>
              <img src={logo} alt="logo" />
            </span>
          </Link>
          <div></div>
          <div className="topnav-right">
            <Link to="/home">
              <div className={`menu ${currentPage === "home" ? "active" : ""}`}>
                Home
              </div>
            </Link>
            {this.checkLogin()}
            {this.checkLogout()}
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  isLogedIn: state.Auth,
});
const mapDispatchToProps = (dispatch) => ({
  doLogout: () => dispatch({ type: "LOGOUT" }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
