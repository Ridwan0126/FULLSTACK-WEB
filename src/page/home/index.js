import React, { Component } from "react";
import { connect } from "react-redux";
import "./home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="konten">
        <p className="title">Selamat Datang di PsychoTech.com</p>
      </div>
    );
  }
}

export default connect()(Home);
